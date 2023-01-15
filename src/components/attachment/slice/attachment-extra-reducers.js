// Constants
import { attachmentAdapter } from 'v4.0/shared/attachment/adapter/attachment-adapter';

import {
  getAttachmentsThunk,
  addAssessmentAttachmentThunk,
  deleteAttachmentThunk,
  addAttachmentThunk
} from 'v4.0/shared/attachment/api/attachment-thunk-api';

export const attachmentExtraReducers = builder => {
  builder.addCase(getAttachmentsThunk.fulfilled, (state, { payload }) => {
    const list = [];
    Object.keys(payload).forEach(key => {
      list.push(...payload[key]);
    });
    attachmentAdapter.setAll(state, list);
  });
  builder.addCase(addAttachmentThunk.fulfilled, (state, { payload }) => {
    attachmentAdapter.addOne(state, payload);
  });
  builder.addCase(addAssessmentAttachmentThunk.fulfilled, (state, { payload }) => {
    const newPayload = [];
    payload.questionAttachment.forEach((element, index) => {
      newPayload.push({
        ...payload.questionAttachment[index],
        id: payload.attachmentIds[index],
        sourceId:
          payload.questionAttachment[index].sourceId ?? payload.questionAttachment[index].questionId
      });
    });
    attachmentAdapter.addMany(state, newPayload);
  });
  builder.addCase(deleteAttachmentThunk.fulfilled, (state, { payload }) => {
    attachmentAdapter.removeOne(state, payload.attachmentId);
  });
};
