import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentMessage: '',
  messages: []
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    sendMessage(state, action) {
      state.messages.push(action.payload);
    },
    setCurrentMessage(state, action) {
      state.currentMessage = action.payload;
    }
  }
});

export const { sendMessage, setCurrentMessage } = chatSlice.actions;

export default chatSlice.reducer;
