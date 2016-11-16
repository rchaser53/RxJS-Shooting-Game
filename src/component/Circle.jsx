import React from 'react';
import style from '../../css/bar';

const Circle = (props)=>{
	return (<div className={style.bar}
				 style={{
				 	borderRadius:2,
				 	width:10,
				 	height:10,
				 	left:`${props.left}%`,
				 	top:`${props.top}%`
			}} />);
}
export default Circle;