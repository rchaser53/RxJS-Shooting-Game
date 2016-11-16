import {combineReducers } from 'redux';
import actor from './actor';
import enemy from './enemy';
import outSide from './outSide';
import bar from './bar';
import shot from './shot';
import circle from './circle';

const reducers = combineReducers({
  	bar,
  	shot,
  	circle,
	actor,
	enemy,
  	outSide
});

export default reducers;