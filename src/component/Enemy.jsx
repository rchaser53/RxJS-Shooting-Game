import rx from 'rxjs';
import React from 'react';

import style from '../../css/actor';

import {
	actorWidth,
	actorHeight
} from '../config/config';

import {
	getRandomNumber,
	getRandomBoolean
} from '../util/util';

class Enemy extends React.Component{
	constructor(){
		super();
		this.state = {
			isRight:true
		};
	}
	componentDidMount() {
		const {setEnemyState} = this.props;
		rx.Observable
			.interval(100)
			.flatMap((x)=>{
				return this.getAliveEnemy(x);
			})
			.map(()=>{
				return this.changeDirection();
			})
			.subscribe((x)=>{
				this.moveEnemy(x);
			});

		rx.Observable
			.interval(500)
			.flatMap((x)=>{
				return this.getAliveEnemy(x);
			})
			.concatMap((x)=>{
			    return rx.Observable
					      .of(x)
					      .delay(getRandomNumber(100,500));
			 })
			.subscribe(
				(newBarNum)=>{
					getRandomBoolean()
						?this.addNewBar(newBarNum)
						:this.addNewCircle(newBarNum);
				}
			);
	}
	getAliveEnemy(x){
		const {enemyLife} = this.props;
		return (0 < enemyLife)
					?rx.Observable.of(x)
					:rx.Observable.empty();
	}
	changeDirection(){
		const {enemyLeft} = this.props;
		const {isRight} = this.state;

			if(enemyLeft == 0 || enemyLeft == (100 - actorWidth)){
				this.setState({
					isRight:!isRight
				});
				return (isRight)?-1:1;
			}
		return (isRight)?1:-1;
	}
	moveEnemy(x){
		const {setEnemyState,enemyLeft} = this.props;
		setEnemyState("enemyLeft",enemyLeft + x);
	}
	addNewBar(newBarNum){
		const {setBarId,enemyLeft} = this.props;
		setBarId(`id_${Date.now()}_${newBarNum}`,enemyLeft,10);
	}
	addNewCircle(newBarNum){
		const {setCircleId,enemyLeft} = this.props;
		setCircleId(`id_${Date.now()}_${newBarNum}`,enemyLeft,10);
	}
	render(){
		const {enemyLeft,enemyLife,enemyTop} = this.props;
		return 	(0 < enemyLife)
					?(<div	className={style.actor}
							style={{
								width:`${actorWidth}%`,
								height:`${actorHeight}%`,
								left:`${enemyLeft}%`,
								top:`${enemyTop}%`,
								position:"absolute",
								backgroundColor:"gray"
							}}  />)
					:false;
	}
}
export default Enemy;