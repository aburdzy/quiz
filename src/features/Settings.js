import { createSlice } from '@reduxjs/toolkit';

const settingsSlice = createSlice({
  name: 'settings',
  initialState: { value: { category: '', questionsAmount: 0 } },
  reducers: {
    updateCategory: (state, action) => {
      state.value = {...state.value, category: action.payload.category };
    },

    updateQuestionsAmount: (state, action) => {
      state.value = {...state.value, questionsAmount: action.payload.questionsAmount }
    }
  }
});

export const { updateCategory, updateQuestionsAmount } = settingsSlice.actions;
export default settingsSlice.reducer;