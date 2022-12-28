import { configureStore } from "@reduxjs/toolkit";
import questionsReducer from "./QuestionsSlice";
import problemMetaReducer from "./ProblemMetaSlice";
import companiesReducer from "./companiesSlice";
import topicsReducer from "./topicsSlice";
import userCodeReducer from "./userCodeSlice";
import expectedCodeReducer from "./expectedCodeSlice";
import roomReducer from "./roomSlice";
import joinedRoomReducer from "./joinedroomSlice";

export const store = configureStore({
  reducer: {
    questions: questionsReducer,
    problemMeta: problemMetaReducer,
    companies: companiesReducer,
    room: roomReducer,
    topics: topicsReducer,
    usercode: userCodeReducer,
    expectedcode:expectedCodeReducer,
    joinedroom: joinedRoomReducer,
  },
});
