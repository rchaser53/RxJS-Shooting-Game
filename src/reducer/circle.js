import immutable from 'immutable';

const circleInitialState = immutable.Map({});

const circle = (state = circleInitialState, action)=>{
  switch (action.type) {
    case "ADD_CIRCLE_STATE":
      return state.set(action.key,{
        left:action.payload.left,
        top:action.payload.top
      });
    case "DELETE_CIRCLE_STATE":
      return state.delete(action.key);
    default:
      return state;
  }
}
export default circle;