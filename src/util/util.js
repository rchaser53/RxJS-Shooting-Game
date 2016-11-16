import {
	areaWidth,
	actorWidth,
	actorHeight,
	barWidth,
	barHeight
} from '../config/config';

export const getRandomNumber = (min, max) =>{
  return Math.floor(Math.random() * (max - min)) + min;
}

export const getRandomBoolean = ()=>{
	return (Math.floor(Math.random() * 2) % 2 === 0);
}

export const decisions = {
	isShotAtActorLeft:(actorLeft,left)=>{
		return (left - actorWidth) <= actorLeft && actorLeft <= (left + barWidth);
	},
	isShotAtActorTop:(actorTop,top)=>{
		return actorTop - actorHeight < top && top < actorTop;
	},
	checkOutOrIn:(left,top)=>{
		return (0 < left && left < 100 && top < 100);
	}
}

// TBD あった方が余分なmergeが走らない分早い? 要調査
export const firstFilter = (e)=>{
	return e.keyCode === 32 || (37 <= e.keyCode && e.keyCode <= 40);
}

export const filterByKeyCode = (codeArray)=>{
	const targetArray = (Array.isArray(codeArray) === true)
							?codeArray:[codeArray];
	return (e)=>{
		return targetArray.includes(e.keyCode);
	}
}