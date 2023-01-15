import React from 'react';
import PropTypes from 'prop-types';

// JPComponents
import JPGrid from 'components/jp-grid/jp-grid';

// Core Components
import AttachmentUploadView from 'components/attachment/attachment-upload/attachment-upload-view';
//import AttachmentListView from 'components/attachment/attachment-list/attachment-list-view';

// Hooks
import { useDispatch } from 'react-redux';

/**
 * @function AttachmentCardView
 * will render the whole attachment view including list and controller for upload
 */
function AttachmentCardView(props) {
  const {
    attachmentType,
    attachmentSourceId,
    assessmentId,
    metaData,
    disabled,
    onSaveAttachmentSuccess
  } = props;

  //#region Hooks
  const dispatch = useDispatch();
  //#endregion Hooks

  //#region Render functions
  /**
   * @function renderUpload
   * @description will render upload attachments if not disabled mode.
   */
  function renderUpload() {
    let view = null;

    view = (
      <JPGrid item md={12} xs={12}>
        <AttachmentUploadView
          attachmentType={attachmentType}
          sourceId={attachmentSourceId}
          onFinishUploadAttachment={onSaveAttachmentSuccess}
          dispatch={dispatch}
          assessmentId={assessmentId}
          metaData={metaData}
          disabled={disabled}
        />
      </JPGrid>
    );

    return view;
  }
  //#endregion
  return (
    <JPGrid container spacing={2}>
      {!disabled ? renderUpload() : null}
      {/* <JPGrid item md={12} xs={12}>
        <AttachmentListView
          dispatch={dispatch}
          attachmentType={attachmentType}
          attachmentSourceId={attachmentSourceId}
          emptyView={emptyView}
          allowAttachmentDelete={allowAttachmentDelete}
          getList={getList}
          onAttachmentDeleteSuccess={onAttachmentDeleteSuccess}
        />
      </JPGrid>*/}
    </JPGrid>
  );
}

AttachmentCardView.defaultProps = {
  emptyView: 'No attachments available'
};

AttachmentCardView.propTypes = {
  attachmentType: PropTypes.string,
  attachmentSourceId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  assessmentId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  metaData: PropTypes.object,
  emptyView: PropTypes.string,
  allowAttachmentDelete: PropTypes.bool,
  onAttachmentDeleteSuccess: PropTypes.func,
  onSaveAttachmentSuccess: PropTypes.func
};

export default AttachmentCardView;
