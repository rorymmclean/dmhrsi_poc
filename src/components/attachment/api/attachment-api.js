import { fetcher } from 'axios-helper';
import { END_POINTS } from 'endpoints';
import { formatParameterizedURL } from 'utils';

export const getAttachmentsApi = async data => {
  const endPoint = { ...END_POINTS.attachment.getAttachments };
  endPoint.url = formatParameterizedURL(endPoint.url, data);
  const response = await fetcher(endPoint);
  return response.data;
};

export const addAssessmentAttachmentApi = async data => {
  const endPoint = { ...END_POINTS.attachment.addAssessmentAttachment };
  endPoint.url = formatParameterizedURL(endPoint.url, {
    id: data.assessmentId,
    questionId: data.assessmentQuestionId
  });
  endPoint.data = data;
  const response = await fetcher(endPoint);
  return response.data;
};

export const addAttachmentApi = async data => {
  const endPoint = { ...END_POINTS.attachment.addAttachment };
  endPoint.url = formatParameterizedURL(endPoint.url, data);
  endPoint.data = data;
  const response = await fetcher(endPoint);
  return response.data;
};

export const deleteAttachmentApi = async id => {
  const endPoint = { ...END_POINTS.attachment.deleteAttachment };
  endPoint.url = formatParameterizedURL(endPoint.url, { id });
  const response = await fetcher(endPoint);
  return response;
};

export const downloadAttachmentApi = async id => {
  const endPoint = { ...END_POINTS.attachment.downloadAttachment };
  endPoint.url = formatParameterizedURL(endPoint.url, { id });
  const response = await fetcher(endPoint);
  return response;
};

export const requestUploadApi = async data => {
  const endPoint = { ...END_POINTS.attachment.requestUpload };
  endPoint.data = data;
  const response = await fetcher(endPoint);
  return response.data;
};

export const uploadToS3Api = async ({ url, data }) => {
  const endPoint = { ...END_POINTS.attachment.uploadToS3 };
  endPoint.url = url;
  endPoint.data = data;
  const response = await fetcher(endPoint);
  return response.data;
};
