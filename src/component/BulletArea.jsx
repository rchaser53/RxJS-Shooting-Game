import rx from 'rxjs';
import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import style from '../../css/actor';
import EnemyShot from './EnemyShotWrapper';
import Shot from './ShotWrapper';
import Circle from './EnemyShotCircleWrapper';

import {
	setActorState,
	setDamageToEnemy
} from '../action/action';

import {
	deleteBarState
} from '../action/bar';

import {
	deleteCircleState
} from '../action/circle';

import {
	deleteShotState
} from '../action/shot';

import {
	areaWidth,
	areaHeight,
	actorWidth
} from '../config/config';

const mapStateToProps = (state)=>{
	return {
		actor:state.actor,
		enemy:state.enemy,
		bar:state.bar.toObject(),
		circle:state.circle.toObject(),
		shot:state.shot.toObject()
	};
}
const mapDispatchToProps = (dispatch)=>{
	return bindActionCreators({
			setActorState,
			setDamageToEnemy,
			setDamageToEnemy,
			setDamageToEnemy,
			deleteBarState,
			deleteShotState,
			deleteCircleState
		},dispatch);
}
class BulletArea extends React.Component{
	render(){
		const {	setActorState,setDamageToEnemy,deleteBarState,
				deleteShotState,deleteCircleState,
				enemy,actor,bar,circle,shot} = this.props;
		const {	actorLeft,actorSpeed,isHit} = actor;

		return (<div className={style.barArea} style={{position:"absolute",width:(areaWidth + actorWidth), height:areaHeight }}>
					{
						Object.keys(bar).map((key)=>{
							return 	(<EnemyShot key={`barNo${key}`} actor={actor}
												left={bar[key].left} top={bar[key].top}
												setActorState={()=>{
													setActorState("isHit",true);
												}}
												deleteBar={()=>{
													deleteBarState(key);
									}} />);
						})
					}
					{
						Object.keys(circle).map((key)=>{
							return 	(<Circle key={`circleNo${key}`} actor={actor}
											 left={circle[key].left} top={circle[key].top}
											 setActorState={()=>{
												setActorState("isHit",true);
											 }}
											 deleteCircle={()=>{
												deleteCircleState(key);
									}} />);
						})
					}
					{
						Object.keys(shot).map((key)=>{
							return 	(<Shot	key={`shotNo${key}`} enemy={enemy}
											left={shot[key].left} top={shot[key].top}
											setDamageToEnemy={setDamageToEnemy}
											deleteShot={()=>{
												deleteShotState(key);
									}} />);
						})
					}
				</div>);
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(BulletArea);