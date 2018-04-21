import db from './firebase-config'

// Documents and collections
export const createDocument = (collection, doc) => {
  return db
    .collection(collection)
    .add(doc)
    .then(() => true)
    .catch(error => error)
}

export const deleteDocument = (collection, id) => {
  return db
    .collection(collection)
    .doc(id)
    .delete()
    .then(() => true)
    .catch(error => error)
}

export const getCollection = async name => {
  let data = []
  const collection = await db.collection(name).get()
  collection.forEach(doc => {
    data.push({ key: doc.id, ...doc.data() })
  })
  return data
}

export const updateDocument = (id, doc, collection) => dispatch => {
  return db
    .collection(collection)
    .doc(id)
    .set(doc)
    .then(() => true)
    .catch(error => error)
}

// Schemas / Models
export const getModel = async model => {
  const data = []
  let collection = await db
    .collection(`model`)
    .doc(model)
    .get()
  collection = collection.data()
  for (const element in collection) {
    data.push({
      dataIndex: collection[element].key,
      key: collection[element].key,
      title: collection[element].title
    })
  }
  return data
  // return data
}

export const createModel = async (model, name) => {
  db.collection(`model/${name}`).add(model)
}
