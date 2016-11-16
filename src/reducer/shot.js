import immutable from 'immutable';
const shotInitialState = immutable.Map({});

const actor = (state = shotInitialState, action)=>{
  switch (action.type) {
    case "ADD_SHOT_STATE":
      return state.set(action.key,{
        left:action.payload.left,
        top:action.payload.top
      });
    case "DELETE_SHOT_STATE":
      return state.delete(action.key);
  default:
    return state;
  }
}
export default actor;