export const addCircleState = (key,payload)=>{
	return {
		type:"ADD_CIRCLE_STATE",
		key,
		payload
	}
}

export const deleteCircleState = (key)=>{
	return {
		type:"DELETE_CIRCLE_STATE",
		key
	}
}