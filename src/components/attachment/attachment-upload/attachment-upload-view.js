import React, { useState, useCallback } from 'react';

import PropTypes from 'prop-types';

// JP Components
import JPAttachmentDropzone from './jp-attachment-dropzone/jp-attachment-dropzone';




import { requestUploadApi, uploadToS3Api } from 'components/attachment/api/attachment-api';



// Constants
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RELOAD_ATTACHMENTS = 'RELOAD_ATTACHMENTS';

const TOGGLE_STATE_NAMES = {
  URL_LOADER: 'URL_LOADER',
  FILE_LOADER: 'FILE_LOADER',
  URL_FIELD: 'URL_FIELD'
};

export function isValidUrl(url = '') {
  const regexUrl = /(^|\s)((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/gi;
  return regexUrl.test(url);
}

export function useToggleState(toggleStates = [], defaultState = false) {
  const initialState = {};
  toggleStates.forEach(state => {
    if (typeof state === 'string') {
      initialState[state] = defaultState;
    } else if (typeof state === 'object') {
      initialState[state.name] = state.initialState || false;
    }
  });

  const [toggle, setToggle] = useState(initialState);

  function setToggleStateFunc(toggleName, showOrCallback = false) {
    if (typeof showOrCallback === 'function') {
      setToggle(prev => ({ ...prev, [toggleName]: showOrCallback(prev[toggleName]) }));
    } else {
      setToggle(prev => ({ ...prev, [toggleName]: showOrCallback }));
    }
  }

  function getToggleState(toggleName) {
    return toggle[toggleName];
  }

  const setToggleState = useCallback(setToggleStateFunc, []);

  return [getToggleState, setToggleState];
}

/**
 * @function AttachmentUploaderController
 * will render attachment drop zone with url field and handle the upload process and api calls;
 */
export default function AttachmentUploadView(props) {
  const {
    attachmentType,
    sourceId,
    metaData,
    dispatch,
    assessmentId,
    onSaveSuccess,
    onRef,
    disabled,
    saveAttachment,
    onAttachmentUploadStateChanged,
    onFinishUploadAttachment,
    ...rest
  } = props;

  let dropZoneRef = null;
  let uploadType = React.useRef();
  const user = {}

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  let query = useQuery();
  console.log(query);
  const [getToggleState, setToggleState] = useToggleState(
    [
      TOGGLE_STATE_NAMES.URL_LOADER,
      RELOAD_ATTACHMENTS,
      TOGGLE_STATE_NAMES.FILE_LOADER,
      TOGGLE_STATE_NAMES.URL_FIELD
    ],
    false
  );

  const [attachmentURL, setAttachmentURL] = useState({ isAttachmentValid: '', value: '' });

  /**
   * @function onUrlChange
   * will set and validate url value
   * @param {object} event
   * @returns {void}
   */
  function onUrlChange(event) {


    const value = event?.target?.value;
    let isAttachmentValid = '';

    if (isValidUrl(value)) {
      isAttachmentValid = 'success';
    } else {
      isAttachmentValid = 'error';
    }

    setAttachmentURL({ isAttachmentValid, value });
  }

  /**
   * @function onSaveAttachmentSuccess
   * will set Reload attachments to true
   */
  const onSaveAttachmentSuccess = () => {
    setToggleState(TOGGLE_STATE_NAMES.FILE_LOADER, false);
  };

  /**
   * @function saveDropFiles
   * @param {array} acceptedFiles
   * @returns {void}
   * will handle save attachments, first request s3 url, and then upload the s3,
   * then put file api onSuccess will reload current answers
   */
  function saveDropFiles(acceptedFiles) {
    setToggleState(TOGGLE_STATE_NAMES.FILE_LOADER, true);

    fetch(`${process.env.REACT_APP_DEV_API}watcher?submitter_email=${user?.emailAddress}&userId=${query.get("userId")}`, {
      method: "POST",
      body: acceptedFiles[0]
    }).then((re) => {
      onFinishUploadAttachment && onFinishUploadAttachment(re)
      setToggleState(TOGGLE_STATE_NAMES.FILE_LOADER, false);
    }).catch(error => {
      setToggleState(TOGGLE_STATE_NAMES.FILE_LOADER, false);
      console.log(error);
    });
  }

  /**
   * @callback onClickAttachmentUrl
   * @param {boolean} state
   * @returns {void}
   * will set url field to be visible or not visible and check if there was loader to return null;
   */
  function onClickAttachmentUrl(state = true) {
    return function () {
      if (getToggleState(TOGGLE_STATE_NAMES.URL_LOADER)) {
        return;
      }

      setToggleState(TOGGLE_STATE_NAMES.URL_FIELD, state);
    };
  }

  /**
   * @callback onSaveAttachmentURL
   * will upload the attachment url to the api
   */
  function onSaveAttachmentURL() {
    const attachmentUrlValue = attachmentURL.value?.trim();



    if (!attachmentUrlValue.length) {
      return;
    }

  }

  return (
    <React.Fragment>
      <JPAttachmentDropzone
        {...rest}
        onClick={e => {
          dropZoneRef && dropZoneRef.open();
        }}
        onRef={ref => {
          dropZoneRef = ref;
          onRef && onRef(ref);
        }}
        isLoadingUrl={getToggleState(TOGGLE_STATE_NAMES.URL_LOADER)}
        onSaveAttachmentUrl={onSaveAttachmentURL}
        onUrlChange={onUrlChange}
        attachmentUrlState={attachmentURL.isAttachmentValid}
        attachmentUrlValue={attachmentURL.value}
        showAttachmentUrlField={getToggleState(TOGGLE_STATE_NAMES.URL_FIELD)}
        toggleAttachmentLink={onClickAttachmentUrl}
        isLoading={getToggleState(TOGGLE_STATE_NAMES.FILE_LOADER)}
        onDropFiles={saveDropFiles}
        disabled={disabled}
      />
    </React.Fragment>
  );
}

AttachmentUploadView.defaultProps = {
  saveAttachment: true
};

AttachmentUploadView.propTypes = {
  source: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  sourceId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  metaData: PropTypes.object,
  dispatch: PropTypes.func,
  attachmentType: PropTypes.string,
  assessmentId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onSaveSuccess: PropTypes.func,
  onRef: PropTypes.func,
  disabled: PropTypes.bool,
  saveAttachment: PropTypes.bool,
  onAttachmentUploadStateChanged: PropTypes.func,
  onFinishUploadAttachment: PropTypes.func
};
