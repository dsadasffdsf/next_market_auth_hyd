import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
}

export const Slice = createSlice({
  name: 'slice',
  initialState,
  reducers: {
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const {} = Slice.actions

export default Slice.reducer