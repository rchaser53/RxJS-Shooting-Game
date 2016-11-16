import React from 'react';
import style from '../../css/actor';

import {
	actorWidth,
	actorHeight
} from '../config/config';

export class Actor extends React.Component{
	render(){
		const {actorLeft,actorTop,isHit} = this.props;

		return (<div className={style.actor}
					style={{
						width:`${actorWidth}%`,
						height:`${actorHeight}%`,
						left:`${actorLeft}%`,
						top:`${actorTop}%`,
						backgroundColor:(isHit)?"red":"yellow"
				}}  />);
	}
}

export default Actor;