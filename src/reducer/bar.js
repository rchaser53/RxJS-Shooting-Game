import immutable from 'immutable';
import {
  getRandomNumber
} from '../util/util';

let tempObj = {};
for(let i=0;i<Math.floor(Math.random() * 30);i++){
  tempObj[i] = {
    left:Math.floor(Math.random() * 90),
    top:getRandomNumber(0,50)
  };
}
const barInitialState = immutable.Map(tempObj);

const bar = (state = barInitialState, action)=>{
  switch (action.type) {
    case "ADD_BAR_STATE":
      return state.set(action.key,{
        left:action.payload.left,
        top:action.payload.top
      });
    case "DELETE_BAR_STATE":
      return state.delete(action.key);
    default:
      return state;
  }
}
export default bar;