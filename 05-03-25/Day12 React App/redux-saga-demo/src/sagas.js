import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";
import { FETCH_DATA_REQUEST, fetchDataSuccess, fetchDataFailure } from "./redux/actions";

// API call function
const fetchDataFromAPI = async () => {
  const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
  console.log(response.data);
  return response.data;
  
};

// Worker Saga: Handles the API call
function* fetchDataSaga() {
  try {
    const data = yield call(fetchDataFromAPI);
    console.log(data);
    
    yield put(fetchDataSuccess(data)); // Dispatch success action
  } catch (error) {
    yield put(fetchDataFailure(error.message)); // Dispatch failure action
  }
}

// Watcher Saga: Watches for FETCH_DATA_REQUEST action
function* rootSaga() {
  yield takeLatest(FETCH_DATA_REQUEST, fetchDataSaga);
}

export default rootSaga;