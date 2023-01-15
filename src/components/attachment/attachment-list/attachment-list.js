import React from 'react';
import PropTypes from 'prop-types';
import { Grid, withStyles, CircularProgress } from '@material-ui/core';

// JPComponents
import JPTypography from 'v4.0/jp-core/components/jp-typography/jp-typography';

// JPCore Components
import Attachment from 'jp-core-components/attachment/attachment';

// Utils
import { arePropsEqual } from 'utils/utils';

// Styles
import AttachmentListStyle from 'v4.0/jp-pages/attachment/attachment-list/attachment-list-style';

// Constants
import { CIRCULAR_PROGRESS_SIZES } from 'v4.0/global/consts';

/**
 * attachments list will render the list of attachments and forward events to .
 * also you have the ability to show or hide download all attachments button
 * @param {Props} props
 */
function AttachmentList(props) {
  const { title, classes, onDeleteClick, isLoading, onClick, attachments, emptyView } = props;

  const listItems = attachments.map(attachment => (
    <Grid item key={attachment.id}>
      <Attachment
        attachment={attachment}
        onClick={onClick}
        onDeleteClick={onDeleteClick ? () => onDeleteClick(attachment) : null}
        className={classes.container}
      ></Attachment>
    </Grid>
  ));

  const content = isLoading ? (
    <Grid
      container
      direction="row"
      justify="center"
      alignContent="center"
      classes={{ root: classes.loading }}
    >
      <Grid item>
        <CircularProgress size={CIRCULAR_PROGRESS_SIZES.lg} />
      </Grid>
    </Grid>
  ) : (
    <Grid container direction="row" spacing={1} className={classes.container}>
      {listItems}
    </Grid>
  );

  const titleComponent = isLoading ? null : (
    <JPTypography
      type="h4"
      className={attachments.length > 0 ? classes.header : classes.emptyContent}
    >
      {attachments.length ? title : emptyView ?? 'No attachments available'}
    </JPTypography>
  );

  return (
    <Grid container className={classes.container} justify="center" alignContent="center">
      {titleComponent}
      {(isLoading || attachments.length > 0) && content}
    </Grid>
  );
}

AttachmentList.defaultProps = {
  isLoading: false,
  isDownloading: false,
  attachments: [],
  enableDownloadAll: true,
  processingAttachmentList: []
};

AttachmentList.propTypes = {
  attachments: PropTypes.array.isRequired,
  onClick: PropTypes.func,
  onDownloadAllClick: PropTypes.func,
  onDeleteClick: PropTypes.func,
  title: PropTypes.string,
  enableDownloadAll: PropTypes.bool,
  isLoading: PropTypes.bool,
  isDownloading: PropTypes.bool,
  processingAttachmentList: PropTypes.array,
  emptyView: PropTypes.string
};

export default withStyles(AttachmentListStyle)(
  React.memo(
    AttachmentList,
    arePropsEqual([
      'attachments',
      'title',
      'enableDownloadAll',
      'isLoading',
      'isDownloading',
      'processingAttachmentList',
      'emptyView'
    ])
  )
);
