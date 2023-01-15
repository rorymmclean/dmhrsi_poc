import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  getAttachmentsApi,
  addAssessmentAttachmentApi,
  addAttachmentApi,
  deleteAttachmentApi
} from './attachment-api';

export const getAttachmentsThunk = createAsyncThunk('attachment/getAttachments', async data => {
  const response = await getAttachmentsApi(data);
  return response;
});

export const addAssessmentAttachmentThunk = createAsyncThunk(
  'attachment/addAssessmentAttachment',
  async ({ payload, count }) => {
    const response = await addAssessmentAttachmentApi(payload);
    return {
      ...response,
      questionAttachment: payload.questionAttachment,
      sourceId: payload.assessmentQuestionId,
      count: count
    };
  }
);
export const addAttachmentThunk = createAsyncThunk('attachment/addAttachment', async data => {
  const response = await addAttachmentApi(data);
  return response;
});

export const deleteAttachmentThunk = createAsyncThunk(
  'attachment/deleteAttachment',
  async ({ id, sourceId }) => {
    await deleteAttachmentApi(id);
    return { attachmentId: id, sourceId };
  }
);
