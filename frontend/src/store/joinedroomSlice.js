import { createSlice } from '@reduxjs/toolkit'
import { setproblemMeta } from './ProblemMetaSlice';

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
    problems: [],
    number: 0,
  },
  reducers: {
    setJoined: (state) => {
      state.joined = !state.joined
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
    setProblems: (state, action) => {
      state.problems.push(action.payload);
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
export const { setJoined, setStatus, setRoomdata, setRoomName, setProblems, next, previous} = joinedRoomSlice.actions

export default joinedRoomSlice.reducer

export function leaveTheRoom() {
  return async function leaveTheroomThunk(dispatch, getState) {
    dispatch(setStatus(STATUSES.LOADING));

    var roomname = getState().joinedroom.name;
    try {
      const res = await fetch(`${process.env.REACT_APP_Backend_URL}/room/leave/${roomname}`, {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify({ userid: "MadhavReact" })
      });
      await res.json();
      // dispatch(setRoomdata(data));

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
    try {
      const res = await fetch(`${process.env.REACT_APP_Backend_URL}/room/join/${roomname}`, {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify({ userid: "MadhavReact" })
      });
      await res.json();
      // dispatch(setRoomdata(data));
      dispatch(fetchTheRoomData());
      dispatch(setStatus(STATUSES.IDLE));
    } catch (err) {
      console.log(err);
      dispatch(setStatus(STATUSES.ERROR));
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
      dispatch(setStatus(STATUSES.IDLE));
      dispatch(fetchAllRoomProblems())
    } catch (err) {
      console.log(err);
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
}


export function fetchAllRoomProblems() {
  return async function fetchAllRoomProblemsThunk(dispatch, getState) {
    dispatch(setStatus(STATUSES.LOADING));
    var questions = getState().joinedroom.roomdata[0].questions;
    var lastdata;
    try {
      for (const question of questions) {
        const pid = question.id;
        console.log(pid);
        const res = await fetch(
          `${process.env.REACT_APP_Backend_URL}/info/${pid}`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "Access-Control-Allow-Credentials": true,
            },
          }
        );
        const data = await res.json();
        dispatch(setProblems(data));
        dispatch(setStatus(STATUSES.IDLE));
        lastdata = data
      }
      dispatch(setproblemMeta(lastdata))
    } catch (err) {
      console.log(err);
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
}
