import { createEntityAdapter } from '@reduxjs/toolkit';

export const attachmentAdapter = createEntityAdapter({
  selectId: attachments => attachments.id
});
