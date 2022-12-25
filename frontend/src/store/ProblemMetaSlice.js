const { createSlice } = require("@reduxjs/toolkit");

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

const problemMetaSlice = createSlice({
  name: "problemMeta",
  initialState: {
    data: {},
    status: STATUSES.IDLE,
    pid: "",
  },
  reducers: {
    setproblemMeta(state, action) {
      state.data = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    setPid(state, action) {
      state.pid = action.payload;
    },
 
  },
});

export const { setproblemMeta, setStatus, setPid } =
  problemMetaSlice.actions;
export default problemMetaSlice.reducer;

// Thunks
export function fetchproblemMetas() {
  return async function fetchproblemMetaThunk(dispatch, getState) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      var pid = getState().problemMeta.pid;
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
      dispatch(setproblemMeta(data));
      dispatch(setStatus(STATUSES.IDLE));
    } catch (err) {
      console.log(err);
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
}
