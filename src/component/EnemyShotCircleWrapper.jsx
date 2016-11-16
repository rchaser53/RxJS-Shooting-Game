import rx from 'rxjs';
import React from 'react';

import {
	getRandomNumber,
	getRandomBoolean,
	decisions
} from '../util/util';

import {
	makeSource
} from '../rx/rx';

import Circle from './Circle';

const EnemyShotCircleWrapper = (Component,{checkOutOrIn,isShotAtActorLeft,isShotAtActorTop},makeSource) => {
	return class extends React.Component{
		constructor(props){
			super(props);
			const sign = getRandomBoolean()?1:-1;
			this.state = {
				left:props.left,
				top:props.top,
				angle:getRandomNumber(3,7) * sign
			};
		}
		checkOutOrIn(){
			const {left,top} = this.state;
			return checkOutOrIn(left,top);
		}
		isShotOutide(){
			const {actorLeft,actorTop} = this.props.actor;
			const {left,top} = this.state;

			return isShotAtActorLeft(actorLeft,left) && isShotAtActorTop(actorTop,top);
		}
		componentDidMount(){
			const {
				deleteCircle,
				setActorState,
			} = this.props;
			const startTop = this.state.top;
			const startLeft = this.state.left;

			const source = makeSource();

			const falling = source
								.takeWhile(()=>{
									return this.checkOutOrIn();
								})
								.subscribe(
									(x)=>{
										const top = startTop + x;
										const tempUp = x * (9 - Math.abs(this.state.angle));
										const left = startLeft + (tempUp / this.state.angle);

										this.setState({
											top,
											left
										});
									},
									()=>{},
									()=>{
										shot.unsubscribe();
										deleteCircle();
									}
								);

			const shot = source
							.filter(()=>{
								return this.isShotOutide();
							})
							.subscribe(
								()=>{
									setActorState();
									shot.unsubscribe();
									falling.unsubscribe();
									deleteCircle();
								}
							);

		}
		render(){
			const {left,top} = this.state;
			return <Component left={left} top={top} />
		}
	}
}
export default EnemyShotCircleWrapper(Circle,decisions,makeSource);