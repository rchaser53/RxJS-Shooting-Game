import rx from 'rxjs';
import React from 'react';

import Bar from './Bar';

import {
	actorWidth,
	actorHeight,
	barWidth
} from '../config/config';

import {
	decisions
} from '../util/util';

import {
	makeSource
} from '../rx/rx';

const EnemyShotWrapper = (Component,{checkOutOrIn,isShotAtActorLeft,isShotAtActorTop},makeSource) => {
	return class extends React.Component {
		constructor(props){
			super(props);
			this.state = {
				left:props.left,
				top:props.top
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
				deleteBar,
				setActorState
			} = this.props;
			const startTop = this.state.top;

			const source = makeSource();

			const falling = source
								.takeWhile(()=>{
									return this.checkOutOrIn();
								})
								.subscribe(
									(x)=>{
										this.setState({top:x + startTop});
									},
									()=>{},
									()=>{
										shot.unsubscribe();
										deleteBar();
									}
								);

			// skipWhile挙動がおかしくない?
			const shot = source
							.filter(()=>{
								return this.isShotOutide();
							})
							.subscribe(
								()=>{
									setActorState();
									falling.unsubscribe();
									shot.unsubscribe();
									deleteBar();
								}
							);
		}
		render(){
			const {left,top} = this.state;
			return <Component left={left} top={top} classKey="bar" />
		}
	}
}
export default EnemyShotWrapper(Bar,decisions,makeSource);