import React from 'react';
import style from '../../css/bar';

import {
	barWidth,
	barHeight
} from '../config/config';


const Bar = (props)=>{
		const {left,top,classKey} = props;
		return (<div className={style[classKey]}
					 style={{
					 	width:`${barWidth}%`,
					 	height:`${barHeight}%`,
					 	left:`${left}%`,
					 	top:`${top}%`
				}} />);
	}

export default Bar;