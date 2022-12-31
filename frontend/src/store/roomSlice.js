const { createSlice } = require("@reduxjs/toolkit");


export const STATUSES = Object.freeze({
	IDLE: "idle",
	ERROR: "error",
	LOADING: "loading",
});


const roomSlice = createSlice({
	name: "room",
	initialState: {
		data: [],
		status: STATUSES.IDLE,
	},
	reducers: {
		setroom(state, action) {
			state.data = action.payload;
		},
		addRoom(state, action) {
			state.data.push(action.payload);
		},
		setStatus(state, action) {
			state.status = action.payload;
		},
	},
});

export const { setroom, setStatus, addRoom } = roomSlice.actions;
export default roomSlice.reducer;

// Thunks
//Fetch all the rooms
export function fetchrooms() {
	return async function fetchroomThunk(dispatch, getState) {
		dispatch(setStatus(STATUSES.LOADING));
		try {
			const res = await fetch(`${process.env.REACT_APP_Backend_URL}/room/`, {
				method: "GET",
				credentials: "include",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
					"Access-Control-Allow-Credentials": true,
				},
			});
			const data = await res.json();
			dispatch(setroom(data));
			dispatch(setStatus(STATUSES.IDLE));
		} catch (err) {
			console.log(err);
			dispatch(setStatus(STATUSES.ERROR));
		}
	};
}