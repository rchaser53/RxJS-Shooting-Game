export const setActorState = (key,payload)=>{
	return {
		type:"SET_ACTOR_STATE",
		key,
		payload
	}
}

export const setEnemyState = (key,payload)=>{
	return {
		type:"SET_ENEMY_STATE",
		key,
		payload
	}
}

export const setDamageToEnemy = (key)=>{
	return {
		type:"SET_DAMAGE_TO_ENEMY",
		key
	}
}

export const setOutSideState = (key,payload)=>{
	return {
		type:"SET_OUTSIDE_STATE",
		key,
		payload
	}
}