export const addBarState = (key,payload)=>{
	
	return {
		type:"ADD_BAR_STATE",
		key,
		payload
	}
}

export const deleteBarState = (key)=>{
	return {
		type:"DELETE_BAR_STATE",
		key
	}
}