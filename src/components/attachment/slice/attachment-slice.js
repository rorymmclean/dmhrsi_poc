// Redux Toolkit
import { createSlice } from '@reduxjs/toolkit';

import { attachmentExtraReducers } from 'v4.0/shared/attachment/slice/attachment-extra-reducers';

// Adapter
import { attachmentAdapter } from 'v4.0/shared/attachment/adapter/attachment-adapter';

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
    addAttachment: attachmentAdapter.addOne,
    updateAttachments: attachmentAdapter.setAll,
    deleteAttachment: attachmentAdapter.removeOne
  },
  extraReducers: attachmentExtraReducers
});

export const { addAttachment, updateAttachments, deleteAttachment } = attachmentSlice.actions;

export default attachmentSlice.reducer;
