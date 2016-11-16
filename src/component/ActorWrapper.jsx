import rx from 'rxjs';
import React from 'react';
import Actor from './Actor';

import {
	actorWidth,
	actorHeight
} from '../config/config';

import {
	firstFilter,
	filterByKeyCode
} from '../util/util';

import {
	makeShot,
	makeMoving
} from '../rx/rx';

const ActorWrapper = (Component) => {
	return class extends React.Component {
		constructor(){
			super();
			this.state = {
				speedX:0,
				speedY:0
			};
		}
		componentDidMount() {
			const {
				actorLeft
			} = this.props;

			// 弾の発射
			makeShot(()=>{
				this.addNewShot();
			});

			// X軸加速
			makeMoving((code)=>{
				this.speedUp(code === 39,"speedX");
			},[37,39]);

			// Y軸加速
			makeMoving((code)=>{
				this.speedUp(code === 40,"speedY");
			},[38,40]);

			// 当たり判定および壁判定
			rx.Observable
				.interval(100)
				.subscribe(()=>{
					this.changeActorState();
					this.preventHitWall("actorLeft",actorWidth);
					this.preventHitWall("actorTop",actorHeight);
			});
		}
		addNewShot(newBarNum){
			const { setShotId, actorLeft, actorTop } = this.props;
			setShotId(`id_${Date.now()}_${newBarNum}`,actorLeft, actorTop - actorHeight);
		}
		speedUp(isPositive,axis){
			const speed = this.state[axis];

			if(Math.abs(speed) > 50) return;
			const tempNum = (isPositive)?1:-1;

			this.setState({[axis]:speed + tempNum});
		}
		changeActorState(){
			const { actorLeft, actorTop, setActorState } = this.props;
			const { speedX, speedY } = this.state;

			if(Math.abs(speedX) <= 0.5 && Math.abs(speedY) <= 0.5){
				this.setState({
					speedX:0,
					speedY:0
				});
			} else {
				this.setState({
					speedX:speedX - (Math.sign(speedX) * 0.5),
					speedY:speedY - (Math.sign(speedY) * 0.5)
				});
			}

			setActorState("actorLeft",actorLeft + speedX);
			setActorState("actorTop",actorTop + speedY);
		}
		preventHitWall(key,size){
			const position = this.props[key];
			const {setActorState} = this.props;

			if(100 - size < position){
				setActorState(key,100 - size);
			} else if(position < 0){
				setActorState(key,0);
			}
		}
		render(){
			const {actorLeft,actorTop,isHit} = this.props;
				return <Component actorLeft={actorLeft} actorTop={actorTop} isHit={isHit} />
		}
	}
}
export default ActorWrapper(Actor);