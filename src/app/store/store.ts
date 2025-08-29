import { configureStore } from '@reduxjs/toolkit'
import authReducer from '@features/auth/authSlice'
import coursesReducer from '@features/courses/coursesSlice'
import videoReducer from '@features/video/videoSlice'


export const store = configureStore({
  reducer: {
    auth: authReducer,
    courses: coursesReducer,
    video: videoReducer,
  },
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch