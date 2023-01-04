import { createSlice } from '@reduxjs/toolkit'


export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});
export const expectedCodeSlice = createSlice({
  name: 'expectedcode',
  initialState:{
    data:{},
    status: STATUSES.IDLE,
  },
  reducers: {
    setExpectedCode: (state, action) => {
      state.data = action.payload
    },
    setStatus(state, action) {
      state.status = action.payload;
    },

  },
})

// Action creators are generated for each case reducer function
export const {setExpectedCode,setStatus} = expectedCodeSlice.actions

export default expectedCodeSlice.reducer



export function getExpectedCode() {
  return async function getExpectedCodeThunk(dispatch, getState) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      var problem_data = getState().problemMeta.data;

      var submit_data = {
        "pid":problem_data.pid,
        "input":problem_data.input,
        "slug":problem_data.slug,
      }



      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify(submit_data);

      const res = await fetch(`/run`, {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      });

      const data = await res.json();
      dispatch(setStatus(STATUSES.LOADING))
      dispatch(setExpectedCode(data));
      dispatch(setStatus(STATUSES.IDLE));
    } catch (err) {
      console.log(err);
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
}
