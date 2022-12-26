import * as types from "./Constants";

const initialState = {
  clients: []
};

const Reducer = (state = initialState, action: any) => {
  switch(action.type) {
    case types.ADD_CLIENTS:
      return {
        ...state,
        clients: action.payload
      };
    default:
      return state;
  }
}

export default Reducer;