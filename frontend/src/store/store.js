import { configureStore } from '@reduxjs/toolkit'
import questionsReducer from './QuestionsSlice'
import problemMetaReducer from './ProblemMetaSlice'

export const store = configureStore({
  reducer: {
    questions:questionsReducer,
    problemMeta: problemMetaReducer
  },
})