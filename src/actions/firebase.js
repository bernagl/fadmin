import firebase from './firebase-config'
import {
  CREATE_COLLECTION,
  CREATE_DOCUMENT,
  CREATE_MODEL,
  DELETE_COLLECTION,
  DELETE_DOCUMENT,
  GET_COLLECTION,
  GET_DOCUMENT,
  GET_MODEL,
  GET_MODELS,
  UPDATE_DOCUMENT
} from '../types'

const db = firebase.firestore()
const store = firebase.storage().ref()

// Documents and collections
export const createDocument = (collection, doc) => async dispatch => {
  const response = await db.collection(collection).add(doc)
  const docCreated = { key: response.id, ...doc }
  dispatch({
    type: CREATE_DOCUMENT,
    payload: docCreated
  })
  return docCreated
}

export const deleteDocument = (collection, id) => async dispatch => {
  return db
    .collection(collection)
    .doc(id)
    .delete()
    .then(() => dispatch({ type: DELETE_DOCUMENT, payload: id }))
    .catch(error => error)
}

export const getCollection = name => async dispatch => {
  let data = []
  const collection = await db.collection(name).get()
  collection.forEach(doc => {
    data.push({ key: doc.id, ...doc.data() })
  })
  dispatch({ type: GET_COLLECTION, payload: data })
  // return data
}

export const updateDocument = (id, doc, collection) => dispatch => {
  return db
    .collection(collection)
    .doc(id)
    .set(doc)
    .then(() =>
      dispatch({ type: UPDATE_DOCUMENT, payload: { key: id, ...doc } })
    )
    .catch(error => error)
}

// Schemas / Models
export const getModel = model => async dispatch => {
  let data = []
  let collection = await db
    .collection(`model`)
    .doc(model)
    .get()
  const formatedTitle = collection.id
  collection = collection.data()
  const name = collection.name || ''
  delete collection.name
  for (let element in collection) {
    data.push({
      dataIndex: collection[element].key,
      ...collection[element]
    })
  }
  data.sort((a, b) => (a.index < b.index ? -1 : a.index > b.index ? 1 : 0))
  dispatch({ type: GET_MODEL, payload: { data, model: name, formatedTitle } })
  // return data
}

export const getModels = () => async dispatch => {
  let data = []
  const collection = await db.collection('model').get()
  collection.forEach(doc => {
    data.push({ key: doc.id, ...doc.data() })
  })
  dispatch({ type: GET_MODELS, payload: data })
  // return data
}

export const createModel = (fields, name) => async dispatch => {
  let model = { name: name.value }
  fields.map(
    (field, index) => (
      delete field.error,
      (field.validations = field.validations.toString()),
      (model = { ...model, [field.title]: { ...field, index } })
    )
  )

  const response = await db
    .collection('model')
    .doc(name.formated)
    .set(model)
  dispatch({ type: CREATE_MODEL, payload: model })
  return response
}

export const uploadImage = async (model, image) => {
  const name =
    Math.random()
      .toString(36)
      .substr(2, 7) + image.name.replace(/' '/g, '_')

  const metadata = { contentType: image.type }
  const response = await store.child(`${model}/${name}`).put(image, metadata)

  console.log(response.downloadURL)
  return response.downloadURL
}
