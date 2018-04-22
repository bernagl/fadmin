import db from './firebase-config'
import {
  CREATE_COLLECTION,
  CREATE_DOCUMENT,
  DELETE_COLLECTION,
  DELETE_DOCUMENT,
  GET_COLLECTION,
  GET_DOCUMENT,
  GET_MODEL,
  UPDATE_DOCUMENT
} from '../types'

// Documents and collections
export const createDocument = (collection, doc) => async dispatch => {
  const response = await db.collection(collection).add(doc)
  const docCreated = { key: response.id, ...doc }
  dispatch({
    type: CREATE_DOCUMENT,
    payload: docCreated
  })

  return docCreated
  // .then(() => console.log(snap.key, snap.data()))
  // .catch(error => error)
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
  const data = []
  let collection = await db
    .collection(`model`)
    .doc(model)
    .get()
  collection = collection.data()
  for (let element in collection) {
    data.push({
      dataIndex: collection[element].key,
      ...collection[element]
    })
  }
  dispatch({ type: GET_MODEL, payload: data })
  // return data
}

export const createModel = async (model, name) => {
  db.collection(`model/${name}`).add(model)
}
