import {
  getRandomNumber
} from '../util/util';

const enemyInitialState = {
	enemyLeft:getRandomNumber(20,80),
  enemyTop:10,
  life:15
}

const enemy = (state = enemyInitialState, action)=>{
  switch (action.type) {
  case "SET_ENEMY_STATE":
    return Object.assign({}, state, {
      [action.key]: action.payload
    });
  case "SET_DAMAGE_TO_ENEMY":
    return Object.assign({}, state, {
      life: --state.life
    });
  default:
    return state;
  }
}
export default enemy;