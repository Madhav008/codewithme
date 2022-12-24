import { configureStore } from '@reduxjs/toolkit'
import questionsReducer from './QuestionsSlice'
import problemMetaReducer from './ProblemMetaSlice'
import companiesReducer from './companiesSlice'
import topicsReducer from './topicsSlice'
export const store = configureStore({
  reducer: {
    questions:questionsReducer,
    problemMeta: problemMetaReducer,
    companies:companiesReducer,
    topics:topicsReducer,
  },
})