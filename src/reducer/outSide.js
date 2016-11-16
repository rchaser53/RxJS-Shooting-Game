const outSideInitialState = {
      total:0
}

const outSide = (state = outSideInitialState,action)=>{
  switch (action.type) {
  case "SET_OUTSIDE_STATE":
    return Object.assign({}, state, {
      [action.key]: action.payload
    });
  default:
    return state;
  }
}
export default outSide;