import React from 'react';
import PropTypes from 'prop-types';

// Component
import DefaultDropzone from './default-dropzone/default-dropzone';

// Material Ui
import { Grid, InputAdornment, withStyles, Collapse, Typography } from '@material-ui/core';

// Icons
import SaveIcon from '@material-ui/icons/CheckCircleOutlineSharp';
import LinkIcon from '@material-ui/icons/Link';
import ClearOutlinedIcon from '@material-ui/icons/ClearOutlined';
import AttachmentIcon from '@material-ui/icons/Attachment';

// styles
import generalStyles from './generalStyles';
import { isValidUrl } from '../attachment-upload-view';
import Button from 'components/CustomButtons/Button';

function JPAttachmentDropzoneComponent({
  classes,
  isLoading,
  onSaveAttachmentUrl,
  onUrlChange,
  attachmentUrlValue,
  showAttachmentUrlField,
  onDropFiles,
  toggleAttachmentLink,
  onRef,
  isLoadingUrl,
  inputProps,
  disabled,
  onClick,
  dropZoneProps
}) {
  /**
   * @function renderDropZoneChildren
   * will render drop zone children a button onCLick will show input field for link url;
   * @param {object} state
   * @returns {jsx}
   */
  const renderDropZoneChildren = () => (
    <Grid container spacing={1} direction="column" justify="center" alignItems="center">
      <Collapse
        in={showAttachmentUrlField}
        mountOnEnter
        unmountOnExit
        className={classes.dropZoneCollapse}
      >
        <Grid item md={12} container direction="row" justify="center" alignItems="center">
          <Grid item container xs={4} direction="row" justify="center" alignItems="center">
            <Grid item>
              <Button
                variant="text"
                color="secondary"
                justIcon
                isLoading={isLoadingUrl}
                icon={SaveIcon}
                onClick={isValidUrl(attachmentUrlValue) && onSaveAttachmentUrl}
              />
            </Grid>
            <Grid item>
              <Button
                variant="text"
                color="gray"
                justIcon
                icon={ClearOutlinedIcon}
                onClick={toggleAttachmentLink && toggleAttachmentLink(false)}
              />
            </Grid>
          </Grid>
        </Grid>
      </Collapse>
      <Collapse in={!isLoadingUrl && !disabled} mountOnEnter unmountOnExit>
        <Grid item md={12}>
          <Typography type="para" classes={{ addClass: classes.dragHereText }} overFlow>
            <span className={classes.uploadAsAttachment} onClick={onClick}>
              upload as an attachment
            </span>
          </Typography>
        </Grid>
      </Collapse>
    </Grid>
  );

  return (
    <DefaultDropzone
      noClick
      disabled={disabled || isLoading}
      onRef={onRef}
      fullWidth
      onDrop={acceptedFiles => onDropFiles(acceptedFiles)}
      isLoading={isLoading}
      {...dropZoneProps}
    >
      {!isLoading && renderDropZoneChildren()}
    </DefaultDropzone>
  );
}

JPAttachmentDropzoneComponent.propTypes = {
  isLoading: PropTypes.bool,
  isLoadingUrl: PropTypes.bool,
  disabled: PropTypes.bool,
  onDropFiles: PropTypes.func,
  onToggleAttachmentLik: PropTypes.func,
  onUrlChange: PropTypes.func,
  onSaveAttachmentUrl: PropTypes.func,
  onRef: PropTypes.func,
  toggleAttachmentLink: PropTypes.func,
  inputProps: PropTypes.object,
  dropZoneProps: PropTypes.object
};

const styles = {
  ...generalStyles,
  attachmentUrlFormControl: {
    paddingTop: 8,
    marginBottom: 8
  },
  dropZoneCollapse: {
    width: '85%'
  },
  uploadAsAttachment: {
    color: '#2196F3',
    cursor: 'pointer'
  },
  dragHereText: {
    marginTop: 8
  }
};

const JPAttachmentDropzone = withStyles(styles)(JPAttachmentDropzoneComponent);

export default JPAttachmentDropzone;
