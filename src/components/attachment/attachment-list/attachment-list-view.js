import React, { useEffect, Fragment, useRef } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import { JPThunkDispatch } from 'v4.0/shared/shared';

import {
  getAttachmentsThunk,
  deleteAttachmentThunk
} from 'v4.0/shared/attachment/api/attachment-thunk-api';

import { downloadAttachmentApi } from 'v4.0/shared/attachment/api/attachment-api';

// Core Components
import AttachmentList from 'v4.0/jp-pages/attachment/attachment-list/attachment-list';

import { attachmentSelector } from 'v4.0/shared/attachment/selector/attachment-selector';

// utils
import { openURLInNewTab } from 'utils/utils';

// JPComponents
import { useToggleState } from 'v4.0/jp-core/components/jp-core-hooks';
import WarningModal from 'jp-components/warning-modal/warning-modal';

// Consts
import { ATTACHMENT_TYPES } from 'v4.0/global/attachment-enum';
import {
  ATTACHMENT_GET_ATTACHMENTS,
  ATTACHMENT_DELETE_ATTACHMENT,
  ATTACHMENT_DOWNLOAD_ATTACHMENT
} from 'action/attachment/attachment-action-types';
import { store } from 'index';
import { QUESTION_STATUS } from 'v4.0/jp-pages/assessment-questions/utils/enums';
import { calculateQuestionCount } from 'v4.0/jp-pages/assessment-questions/utils/utils';

import { showAlert } from 'v4.0/shared/slice/ui-slice';

const DELETE_WARNING_MODAL = 'DELETE_WARNING_MODAL';
/**
 * AttachmentListController will control all attachments
 * this controller will give you the ability to show specific type of attachments
 * also will give you and option to download all attachments at once
 * @param {Props} props
 */
function AttachmentListView(props) {
  const {
    title,
    attachmentType,
    attachmentSourceId,
    emptyView,
    allowAttachmentDelete,
    onAttachmentDeleteSuccess
  } = props;

  //#region States
  const attachmentList = useSelector(attachmentSelector.selectAll);
  const [getToggleState, setToggleState] = useToggleState([
    ATTACHMENT_GET_ATTACHMENTS,
    ATTACHMENT_DOWNLOAD_ATTACHMENT,
    ATTACHMENT_DELETE_ATTACHMENT
  ]);
  //#endregion

  //#region hooks
  const dispatch = useDispatch();
  //#endregion

  //#region Other Hooks
  const attachmentToDelete = useRef(null);

  const getAttachments = id => {
    setToggleState(ATTACHMENT_GET_ATTACHMENTS, true);
    JPThunkDispatch(getAttachmentsThunk({ source: attachmentType, sourceId: id })).finally(() => {
      setToggleState(ATTACHMENT_GET_ATTACHMENTS, false);
    });
  };

  //#endregion

  //#region Life Cycle
  useEffect(() => {
    getAttachments(attachmentSourceId);
  }, [attachmentSourceId]);

  //#endregion

  //#region  Functions

  /**
   * @callback onAttachmentClick
   * called when specific answer attachment clicked
   * @param {object} attachment
   */
  function onAttachmentClick({ id, uploadType, fileName }) {
    if (uploadType === ATTACHMENT_TYPES.file) {
      setToggleState(ATTACHMENT_DOWNLOAD_ATTACHMENT, true);
      downloadAttachmentApi(id)
        .then(res => {
          window.location = res.data.url;
        })
        .finally(() => {
          setToggleState(ATTACHMENT_DOWNLOAD_ATTACHMENT, false);
        });
    } else {
      openURLInNewTab(fileName);
    }
  }

  /**
   * @callback onAttachmentDelete
   * will dispatch the delete attachment action
   * @param {number} id
   */
  async function onAttachmentDelete() {
    const id = attachmentToDelete.current?.id;
    if (!id) {
      return;
    }
    setToggleState(ATTACHMENT_DOWNLOAD_ATTACHMENT, true);

    JPThunkDispatch(deleteAttachmentThunk({ id, sourceId: attachmentSourceId }))
      .then(() => {
        onAttachmentDeleteSuccess && onAttachmentDeleteSuccess(attachmentToDelete.current);
        const question =
          store.getState().assessmentQuestionList.assessmentQuestionList.entities[
          attachmentSourceId
          ];

        const required =
          question?.isRequireAttachment || question?.isConditionalAttachmentResponseRequired;

        if (required && !question?.attachmentsCount) {
          calculateQuestionCount({
            question: { questionId: attachmentSourceId },
            questionStatus: QUESTION_STATUS.open,
            affectedQuestions: []
          });
        }
      })
      .catch(error => {
        dispatch(showAlert(error));
      })
      .finally(() => {
        attachmentToDelete.current = null;
        toggleWarningModal(false)();
        setToggleState(ATTACHMENT_DOWNLOAD_ATTACHMENT, false);
      });
  }

  /**
   * @function toggleWarningModal
   * @description will toggle the delete warning modal
   * @param {boolean} state
   */
  function toggleWarningModal(state) {
    return function () {
      setToggleState(DELETE_WARNING_MODAL, state);
    };
  }

  function onDeleteClick(attachment) {
    attachmentToDelete.current = attachment;
    toggleWarningModal(true)();
  }
  //#endregion

  return (
    <Fragment>
      <WarningModal
        onDismiss={toggleWarningModal(false)}
        onOk={onAttachmentDelete}
        isLoading={getToggleState(ATTACHMENT_DOWNLOAD_ATTACHMENT)}
        message={'Are you sure you want to delete this attachment?'}
        show={getToggleState(DELETE_WARNING_MODAL)}
      />
      <AttachmentList
        emptyView={emptyView}
        title={title}
        attachments={attachmentList}
        isLoading={getToggleState(ATTACHMENT_GET_ATTACHMENTS)}
        onClick={onAttachmentClick}
        onDeleteClick={allowAttachmentDelete ? onDeleteClick : null}
      ></AttachmentList>
    </Fragment>
  );
}

AttachmentListView.defaultProps = {
  isLoading: false,
  enableDownloadAll: true,
  attachmentType: 0,
  allowAttachmentDelete: false
};

AttachmentListView.propTypes = {
  attachmentType: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  attachmentSourceId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  title: PropTypes.string,
  enableDownloadAll: PropTypes.bool,
  reload: PropTypes.bool,
  emptyView: PropTypes.string,
  allowAttachmentDelete: PropTypes.bool
};

export default AttachmentListView;
