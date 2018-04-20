import db from './firebase-config'

export const getCollection = async name => {
  let data = []
  const collection = await db.collection(name).get()
  collection.forEach(doc => { data.push({ id: doc.id, ...doc.data() }) })
  return data
}
