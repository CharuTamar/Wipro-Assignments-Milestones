import { FETCH_DATA_REQUEST, FETCH_DATA_SUCCESS, FETCH_DATA_FAILURE } from "./redux/actions";

const initialState = {
  loading: false,
  data: [],
  error: "",
};

export const dataReducer = (state = initialState, action) => {
    console.log("Reducer received action:", action); // ✅ Debug action
    switch (action.type) {
      case FETCH_DATA_REQUEST:
        return { ...state, loading: true };
  
      case FETCH_DATA_SUCCESS:
        console.log("Reducer updated state with data:", action.payload); // ✅ Debug payload
        return { loading: false, data: action.payload, error: "" };
  
      case FETCH_DATA_FAILURE:
        return { loading: false, data: [], error: action.payload };
  
      default:
        return state;
    }
};
  