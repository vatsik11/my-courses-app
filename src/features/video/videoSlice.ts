import { createSlice, PayloadAction } from '@reduxjs/toolkit'


interface VideoState {
  isOpen: boolean
  currentCourseId: string | null
  currentUrl: string | null
}


const initialState: VideoState = {
  isOpen: false,
  currentCourseId: null,
  currentUrl: null,
}


const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    openVideo: (
      state,
      action: PayloadAction<{ courseId: string; url: string }>
    ) => {
      state.isOpen = true
      state.currentCourseId = action.payload.courseId
      state.currentUrl = action.payload.url
    },
    closeVideo: (state) => {
      state.isOpen = false
      state.currentCourseId = null
      state.currentUrl = null
    },
  },
})


export const { openVideo, closeVideo } = videoSlice.actions
export default videoSlice.reducer