import rx from 'rxjs';
import React from 'react';
import reactDom from 'react-dom';
import style from '../../css/bar';

import Bar from './Bar';

import {
	areaWidth,
	actorWidth,
	actorHeight as enemyHeight,
	barWidth,
	barHeight
} from '../config/config';

const ShotWrapper = (Component) => {
	return class extends React.Component{
		constructor(props){
			super(props);
			this.state = {
				left:props.left,
				top:props.top
			};
		}
		componentDidMount(){
			const {
				deleteShot,
				setDamageToEnemy
			} = this.props;

			const startTop = this.state.top;

			const source = rx.Observable
								.interval(50)
								.share();

			const uping = source
							.takeWhile((x)=>{
								return 0 < startTop - x;
							})
							.subscribe(
								(x)=>{
									this.setState({top:startTop - x});
								},
								()=>{},
								()=>{
									shot.unsubscribe();
									deleteShot();
								}
							);

			const shot = source
							.filter(()=>{
								return this.isShotAtEnemyTop() && this.isShotAtEnemyLeft();
							})
							.subscribe(
								()=>{
									shot.unsubscribe();
									uping.unsubscribe();
									setDamageToEnemy();
									deleteShot();
								}
							);
		}
		isShotAtEnemyLeft(){
			const {enemyLeft} = this.props.enemy;
			const {left} = this.state;
			return (left - actorWidth) <= enemyLeft && enemyLeft <= (left + barWidth);
		}
		isShotAtEnemyTop(){
			const {enemyTop} = this.props.enemy;
			const {top} = this.state;
			return (enemyTop - barHeight) <= top && top <= enemyTop;
		}
		render(){
			const {left,top} = this.state;
			return <Component left={left} top={top} classKey="shot" />
		}
	}
}
export default ShotWrapper(Bar);