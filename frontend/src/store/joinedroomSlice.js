import { createSlice } from '@reduxjs/toolkit'
import { resetProblemMeta, setproblemMeta } from './ProblemMetaSlice';
import { fetchUser } from './UserSlice';

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});
export const joinedRoomSlice = createSlice({
  name: 'joinedroom',
  initialState: {
    joined: false,
    roomdata: {},
    status: STATUSES.IDLE,
    name: '',
    number: 0,
  },
  reducers: {
    setJoined: (state) => {
      state.joined = !state.joined
    },
    reset: (state) => {
      return {
        joined: false,
        roomdata: {},
        status: STATUSES.IDLE,
        name: '',
        number: 0,
      }
    },

    setStatus(state, action) {
      state.status = action.payload;
    },
    setRoomdata: (state, action) => {
      state.roomdata = action.payload
    },
    setRoomName: (state, action) => {
      state.name = action.payload;
    },
    next: (state, action) => {
      if (state.number == 3) {
        state.number = 0;
      } else {
        state.number += 1;
      }
    },
    previous: (state, action) => {
      if (state.number == 0) {
        state.number = 3;
      } else {

        state.number -= 1;
      }
    }

  },
})

// Action creators are generated for each case reducer function
export const { setJoined, reset, setStatus, setRoomdata, setRoomName, next, previous } = joinedRoomSlice.actions

export default joinedRoomSlice.reducer

export function leaveTheRoom() {
  return async function leaveTheroomThunk(dispatch, getState) {
    dispatch(setStatus(STATUSES.LOADING));
    var roomname = getState().joinedroom.name;
    var user = getState().user.user
    try {
      const res = await fetch(`${process.env.REACT_APP_Backend_URL}/room/leave/${roomname}`, {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify({ userid: user.username })
      });
      await res.json();
      // dispatch(setRoomdata(data));
      dispatch(reset())
      dispatch(resetProblemMeta())
      dispatch(setStatus(STATUSES.IDLE));
    } catch (err) {
      console.log(err);
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
}




export function joinTheRoom() {
  return async function getroomThunk(dispatch, getState) {
    dispatch(setStatus(STATUSES.LOADING));
    var roomname = getState().joinedroom.name;
    var user = getState().user.user

    if (user.username && roomname) {
      try {
        const res = await fetch(`${process.env.REACT_APP_Backend_URL}/room/join/${roomname}`, {
          method: "POST",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
          },
          body: JSON.stringify({ userid: user.username })
        });
        await res.json();
        console.log("Joined the room now fetching the roomdata");
        // dispatch(setRoomdata(data));
        dispatch(fetchTheRoomData());
        dispatch(setStatus(STATUSES.IDLE));
      } catch (err) {
        console.log(err);
        dispatch(setStatus(STATUSES.ERROR));
      }
    }
  };
}

export function fetchTheRoomData() {
  return async function getroomThunk(dispatch, getState) {
    dispatch(setStatus(STATUSES.LOADING));

    var roomname = getState().joinedroom.name;
    try {
      const res = await fetch(`${process.env.REACT_APP_Backend_URL}/room/${roomname}`, {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      });
      const data = await res.json();
      dispatch(setRoomdata(data));
      console.log("the roomdata" + data);
      dispatch(setStatus(STATUSES.IDLE));
    } catch (err) {
      console.log(err);
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
}


