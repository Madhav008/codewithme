import { createSlice } from '@reduxjs/toolkit'


export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});
export const userCodeSlice = createSlice({
  name: 'usercode',
  initialState:{
    data:{},
    status: STATUSES.IDLE,
    output:{},
  },
  reducers: {
    setUserCode: (state, action) => {
      state.data = action.payload
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    setOutput:(state, action) => {
      state.output = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const {setUserCode,setStatus ,setOutput} = userCodeSlice.actions

export default userCodeSlice.reducer



export function submitProblem() {
  return async function fetchproblemMetaThunk(dispatch, getState) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      var problem_data = getState().problemMeta.data;
      var user_code = getState().usercode.data;

      var submit_data = {
        "pid":problem_data.pid,
        "userCode":user_code.code,
        "slug":problem_data.slug,
        "lang": user_code.lang
      }



      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify(submit_data);

      const res = await fetch(`${process.env.REACT_APP_Backend_URL}/result`, {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      });

      const data = await res.json();
      dispatch(setStatus(STATUSES.LOADING))
      dispatch(setOutput(data));
      dispatch(setStatus(STATUSES.IDLE));
    } catch (err) {
      console.log(err);
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
}
