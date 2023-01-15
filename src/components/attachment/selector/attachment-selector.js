import { attachmentAdapter } from 'v4.0/shared/attachment/adapter/attachment-adapter';

export const attachmentSelector = attachmentAdapter.getSelectors(state => state.attachments);
