import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/styles';
import defaultDropZoneStyle from './default-dropzone-style';

const DefaultDropzone = props => {
  const { classes, isLoading, children, label, fullWidth, ...other } = props;

  return (
    <Dropzone
      {...other}
      ref={ref => {
        if (props.onRef) {
          props.onRef(ref);
        }
      }}
    >
      {({ getRootProps, getInputProps }) => (
        <div className={classes.dropZone} {...getRootProps()}>
          <input {...getInputProps()} />
          <div className={`${classes.progressContainer} ${fullWidth && classes.fullWidth}`}>
            {isLoading ? (
              <CircularProgress size={30} />
            ) : (
              label && <div className={classes.title}>{label}</div>
            )}
            {children}
          </div>
        </div>
      )}
    </Dropzone>
  );
};

DefaultDropzone.propTypes = {
  isLoading: PropTypes.bool,
  classes: PropTypes.object,
  label: PropTypes.any,
  fullWidth: PropTypes.bool
};

export default withStyles(defaultDropZoneStyle)(DefaultDropzone);
