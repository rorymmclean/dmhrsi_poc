import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Icon
import DownloadIcon from '@material-ui/icons/GetApp';

// JP Components
import JPButton from 'jp-components/button/jp-button';

// Thunk
import { downloadAttachmentApi } from 'v4.0/shared/attachment/api/attachment-api';

function DownloadAttachment(props) {
  const { attachmentId } = props;

  const [isLoading, setLoading] = useState(false);

  //#region Dispatch functions
  async function onDownloadAttachmentClick() {
    setLoading(true);

    downloadAttachmentApi(attachmentId)
      .then(res => {
        window.location = res.data.url;
      })
      .finally(() => {
        setLoading(false);
      });
  }
  //#endregion

  return (
    <JPButton
      onClick={() => onDownloadAttachmentClick()}
      title={'Download'}
      key={'Download'}
      expandableText="Download"
      color={'primaryBlueFill'}
      round={false}
      isLoading={isLoading}
      justIcon
      icon={DownloadIcon}
    />
  );
}

DownloadAttachment.propTypes = {
  attachmentId: PropTypes.number
};

export default DownloadAttachment;
