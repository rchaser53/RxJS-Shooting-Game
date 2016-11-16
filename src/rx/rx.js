import rx from 'rxjs';
import {
	getRandomNumber,
	firstFilter,
	filterByKeyCode
} from '../util/util';

export const makeSource = ()=>{
	return rx.Observable.of("a")
			.concatMap(()=>{
			    return rx.Observable
			    		.interval(getRandomNumber(15,60));
			 })
			.skip(1)
			.share();
}

export const makeKeyup = ()=>{
	return rx.Observable
			.fromEvent(window,'keyup')
			.filter(firstFilter);
}

export const makeEvents = ()=>{
	return rx.Observable
			.fromEvent(window,'keydown')
			.filter(firstFilter)
			.merge(makeKeyup())
			.map((e)=>{
				return {
					flg:e.type === "keydown",
					keyCode:e.keyCode
				};
			})
			.share();
}

export const makeShot = (addNewShot)=>{
	return rx.Observable
			.interval(400)
		  	.withLatestFrom(
		  		makeEvents().filter(filterByKeyCode(32)),
		  		(i, e) => {
		  			return e.flg;
		  		}
		  	)
		  	.filter(flg => flg)
		  	.subscribe(addNewShot);
}

export const makeMoving = (speedUp,condition) => {
	return rx.Observable
			.interval(150)
		  	.withLatestFrom(
		  		makeEvents().filter(filterByKeyCode(condition)),
		  		(i, e) => {
		  			return e.flg?e.keyCode:false;
		  		}
		  	)
		  	.filter(e => !!e)
		  	.subscribe(speedUp)
}