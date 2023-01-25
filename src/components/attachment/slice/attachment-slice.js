// Redux Toolkit
import { createSlice } from '@reduxjs/toolkit';
import { attachmentAdapter } from '../adapter/attachment-adapter';

// Adapter

export const initialState = attachmentAdapter.getInitialState();

/**
 * @slice attachmentSlice
 * @description create attachment slice.
 * @returns {attachment}
 **/
const attachmentSlice = createSlice({
  name: 'attachments',
  initialState,
  reducers: {
  
  },
});

export const {  } = attachmentSlice.actions;

export default attachmentSlice.reducer;
