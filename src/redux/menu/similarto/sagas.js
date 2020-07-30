import { takeEvery, put } from 'redux-saga/effects'
import { GET_ALL_ITEMS_REQUEST, 
        GET_ALL_ITEMS_REQUEST_SUCCESS,
        SET_ITEM_VALUE,
        SET_ITEM_VALUE_SUCCESS } from './actions'
import data from '@utils/menu'

function* handler(){
    yield takeEvery(GET_ALL_ITEMS_REQUEST, getAllItemsRequest)
    yield takeEvery(SET_ITEM_VALUE, setItemValue)
}

function* getAllItemsRequest(action){
    try {
        yield put({
            type: GET_ALL_ITEMS_REQUEST_SUCCESS,
            payload: {
                data: data.menu2
            }
        })
    } catch (error) {
        console.log('Similar to get items request error: ', error)
    }
}

function* setItemValue(action){
    let { _id } = action.payload
    console.log('----------setItemValue', _id);
    try {
        yield put({
            type: SET_ITEM_VALUE_SUCCESS,
            payload: {
                _id
            }
        })
    } catch (error) {
        console.log('Similar to set item value error: ', error)
    }
}

export { handler }