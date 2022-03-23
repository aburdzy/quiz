import { createSlice } from '@reduxjs/toolkit';

const resultSlice = createSlice({
  name: 'result',
  initialState: { value: { correctAnswers: 0, questions: 0 } },
  reducers: {
    updateResult: (state, action) => {
      state.value =  { correctAnswers:  action.payload.correctAnswers, questions: action.payload.questions };
    }
  }
});

export const { updateResult } = resultSlice.actions;
export default resultSlice.reducer;