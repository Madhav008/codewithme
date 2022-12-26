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
    createRomm: {},
  },
  reducers: {
    setroom(state, action) {
      state.data = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
  },
});

export const { setroom, setStatus } = roomSlice.actions;
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
export function createroom() {
  return async function fetchroomThunk(dispatch, getState) {
    dispatch(setStatus(STATUSES.LOADING));

    try {
      var newroom = getState().room.createRomm;

      const res = await fetch(
        `${process.env.REACT_APP_Backend_URL}/room/create`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
          },
          body: newroom,
        }
      );
      const data = await res.json();
      dispatch(setStatus(STATUSES.IDLE));
    } catch (err) {
      console.log(err);
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
}
