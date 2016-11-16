import {
  getRandomNumber
} from '../util/util';

const actorInitialState = {
  actorTop:getRandomNumber(80,95),
	actorLeft:getRandomNumber(10,90),
	isBrake:false
}

const actor = (state = actorInitialState, action)=>{
  switch (action.type) {
  case "SET_ACTOR_STATE":
    return Object.assign({}, state, {
      [action.key]: action.payload
    });
  default:
    return state;
  }
}
export default actor;