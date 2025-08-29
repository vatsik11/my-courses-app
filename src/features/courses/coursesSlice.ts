import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { Course } from './types'
import { fetchCourses, mockPurchase } from '@api/coursesApi'


interface CoursesState {
  items: Course[]
  loading: boolean
  error: string | null
  purchasedIds: string[]
  purchasing: Record<string, boolean>
  purchaseError: string | null
}


const initialState: CoursesState = {
  items: [],
  loading: false,
  error: null,
  purchasedIds: [],
  purchasing: {},
  purchaseError: null,
}


export const loadCourses = createAsyncThunk('courses/load', async () => {
  const data = await fetchCourses()
  return data
})


export const purchaseCourse = createAsyncThunk(
  'courses/purchase',
  async (courseId: string, { rejectWithValue }) => {
    try {
      const res = await mockPurchase(courseId)
      return res.courseId
    } catch (e: any) {
      return rejectWithValue(e?.message ?? 'Purchase failed')
    }
  }
)


const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    resetPurchaseError: (state) => {
      state.purchaseError = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadCourses.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loadCourses.fulfilled, (state, action: PayloadAction<Course[]>) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(loadCourses.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message ?? 'Failed to load courses'
      })
      .addCase(purchaseCourse.pending, (state, action) => {
        const id = action.meta.arg
        state.purchasing[id] = true
        state.purchaseError = null
      })
      .addCase(purchaseCourse.fulfilled, (state, action: PayloadAction<string>) => {
        const id = action.payload
        state.purchasing[id] = false
        if (!state.purchasedIds.includes(id)) state.purchasedIds.push(id)
      })
      .addCase(purchaseCourse.rejected, (state, action) => {
        const id = (action.meta as any).arg as string
        state.purchasing[id] = false
        state.purchaseError = (action.payload as string) ?? 'Purchase failed'
      })
  },
})


export const { resetPurchaseError } = coursesSlice.actions
export default coursesSlice.reducer