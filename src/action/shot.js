export const addShotState = (key,payload)=>{
	return {
		type:"ADD_SHOT_STATE",
		key,
		payload
	}
}

export const deleteShotState = (key)=>{
	return {
		type:"DELETE_SHOT_STATE",
		key
	}
}