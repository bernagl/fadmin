import { combineReducers } from 'redux'
import documents from './document_reducer'
import model from './collection_reducer'

export default combineReducers({ documents, model })
