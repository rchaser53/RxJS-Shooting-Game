import rx from 'rxjs';
import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import style from '../../css/actor';
import Actor from './ActorWrapper';
import Enemy from './Enemy';
import BulletArea from './BulletArea';

import {
	setActorState,
	setEnemyState,
	setDamageToEnemy,
	setOutSideState
} from '../action/action';

import {
	addBarState
} from '../action/bar';

import {
	addCircleState
} from '../action/circle';

import {
	addShotState
} from '../action/shot';

import {
	areaWidth,
	areaHeight,
	actorWidth,
	actorHeight,
	barWidth
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
		setEnemyState,
		setDamageToEnemy,
		addBarState,
		addShotState,
		addCircleState
	},dispatch);
}

class OutSide extends React.Component{
	constructor(){
		super();
		this.state = {
			startTime:0
		};
	}
	componentDidMount(){
		rx.Observable.interval(1)
			.flatMap((x)=>{
				return this.selectStartTimeStreat(x);
			})
			.subscribe(
				(x)=>{
					this.setState({startTime:++this.state.startTime});
				},
				(err)=>{
					console.log(err);
				}
			);
	}
	selectStartTimeStreat(x){
		if(this.props.actor.isHit === true){
			return rx.Observable.throw("GAME OVER!");
		}
		return rx.Observable.of(x);
	}
	render(){
		const {	setActorState,setEnemyState,addBarState,
				addShotState,addCircleState,
				enemy,actor } = this.props;
		const {	actorLeft,actorTop,isHit} = actor;

		return (<div>
					<div style={{display:"flex"}}>
						<div>{`SCORE:${this.state.startTime}`}</div>
						<div className={(enemy.life > 0)?style.messeageArea:style.gameClear}>
							{
								(isHit)
									?"GAME OVER!"
									:(enemy.life > 0)
										?""
										:"GAME CLEAR!"
							}
						</div>
					</div>
					<div className={style.barArea} style={{position:"relative",width:(areaWidth + actorWidth), height:areaHeight }}>
						<BulletArea />
						<Enemy
							setEnemyState={setEnemyState} enemyLeft={enemy.enemyLeft}
							enemyTop={enemy.enemyTop} enemyLife={enemy.life}
							setBarId={(newId,left,top)=>{
								addBarState(newId,{left,top});
							}}
							setCircleId={(newId,left,top)=>{
								addCircleState(newId,{left,top});
						}} />
						<Actor	actorLeft={actorLeft} actorTop={actorTop}
								setShotId={(newId,left,top)=>{
									addShotState(newId,{left,top});
								}}
								setActorState={setActorState} isHit={isHit} />
					</div>
				</div>);
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(OutSide);