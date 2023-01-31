import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';

// Material ui
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  Box,
  DialogActions,
  Grid,
  makeStyles,
  IconButton,
  CircularProgress,
  Typography,
  Divider
} from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';

// Core component
import JPModalStyle from './jp-modal-style';
import Button from 'components/CustomButtons/Button';
import JPGrid from 'components/jp-grid/jp-grid';

const useStyles = makeStyles(JPModalStyle);

export function scrollContainerRef(scrollContainer) {
  const scroll = scrollContainer.scrollHeight - scrollContainer.clientHeight;
  scrollContainer.scrollTo(0, scroll);
}
const JPModal = props => {
  const timerToken = useRef(null);
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const [isLoading, setIsLoading] = useState(true);
  const classes = useStyles(props);
  const {
    title,
    description,
    fullWidth,
    maxWidth,
    open,
    keepMounted,
    onClose,
    children,
    dialogActions,
    closeButton,
    showHeader,
    scrollToBottom,
    defaultTitle
  } = props;

  function onRef(ref) {
    if (ref) {
      if (scrollToBottom) {
        setTimeout(() => {
          scrollContainerRef(ref);
        }, 1000);
      }
      props.onRef && props.onRef(ref);
    }
  }

  useEffect(() => {
    if (open) {
      timerToken.current = setTimeout(() => {
        setIsLoading(false);
      }, 700);
    } else {
      setIsLoading(true);
    }

    return () => {
      if (timerToken.current) {
        clearTimeout(timerToken.current);
        timerToken.current = null;
      }
    };
  }, [open]);

  const closeButtonIcon = (
    <JPGrid item paddingBottom={4}>
      <IconButton size="small" aria-label="close" onClick={() => onClose()}>
        <CloseIcon />
      </IconButton>
    </JPGrid>
  );

  const renderHeader = param => (
    <DialogTitle classes={{ root: classes.rootDialogTitle }}>
      <Box display="flex" className={classes.height}>
        <JPGrid
          container
          direction="row"
          justify={
            title?.length || (defaultTitle?.length && isLoading) ? 'space-between' : 'flex-end'
          }
          alignItems="center"
        >
          {title || (defaultTitle?.length && isLoading) ? (
            <JPGrid item>
              <JPGrid container alignItems={'center'} height={32}>
                <JPGrid item marginBottom={5}>
                  <Typography
                    className={classes.titleColor}
                    type={'h2'}
                    overFlow
                    style={{
                      fontSize: '24px',
                      color: 'rgba(70,72,74,0.9)',
                      fontWeight: 'bold',
                      letterSpacing: '-0.48px',
                      fontFamily: 'Trattatello'
                    }}
                  >
                    {title || defaultTitle}
                  </Typography>
                </JPGrid>
              </JPGrid>
            </JPGrid>
          ) : null}
          {closeButton ? closeButtonIcon : null}
        </JPGrid>
      </Box>
      <Grid sm={12}>
        <Divider style={{ border: '1px solid #000', margin: '0 !important', height: 0 }} />
      </Grid>
    </DialogTitle>
  );

  const renderContent = () => (
    <Grid item md={12}>
      <Typography type={'h3'}>{description}</Typography>
    </Grid>
  );

  return open ? (
    <Dialog
      disableScrollLock
      disableBackdropClick
      fullWidth={fullWidth}
      maxWidth={maxWidth || 'sm'}
      open={open}
      classes={{
        paper: `${classes.paper}`
      }}
      transition={Transition}
      keepMounted={keepMounted}
      disableEscapeKeyDown
      onClose={onClose}
      aria-labelledby="modal-slide-title"
      aria-describedby="modal-slide-description"
    >
      {showHeader ? renderHeader() : null}
      <DialogContent
        ref={ref => {
          onRef(ref);
        }}
        classes={{ root: !dialogActions && classes.rootDialogContent }}
      >
        {description && dialogActions ? (
          renderContent()
        ) : isLoading ? (
          <Grid
            container
            justify="center"
            alignItems="center"
            className={classes.circularContainer}
          >
            <CircularProgress size={35}></CircularProgress>
          </Grid>
        ) : (
          children
        )}
      </DialogContent>
      {dialogActions?.length ? (
        <DialogActions classes={{ root: classes.rootDialogActions }}>
          <Grid container direction={'row'} justify={'flex-end'}>
            {dialogActions?.map((button, index) => (
              <JPGrid item marginRight={3} marginLeft={3}>
                <Button
                  onClick={button.onClick}
                  variant={button.variant || 'outlined'}
                  color={button.color}
                  disabled={button.disabled || button.isLoading}
                  isLoading={button.isLoading}
                  type={button.type}
                  form={button.form}
                  style={{
                    fontFamily: 'Trattatello',
                    fontWeight: 'bold'
                  }}
                >
                  {button.name}
                </Button>
              </JPGrid>
            ))}
          </Grid>
        </DialogActions>
      ) : null}
    </Dialog>
  ) : null;
};

JPModal.defaultProps = {
  keepMounted: true,
  closeButton: false,
  dialogActions: [],
  showHeader: true,
  title: ''
};

JPModal.propTypes = {
  title: PropTypes.any,
  description: PropTypes.any,
  fullWidth: PropTypes.bool,
  maxWidth: PropTypes.string,
  open: PropTypes.bool,
  keepMounted: PropTypes.bool,
  onClose: PropTypes.func,
  dialogActions: PropTypes.array,
  titleColor: PropTypes.string,
  closeButton: PropTypes.bool,
  scrollToBottom: PropTypes.number,
  showHeader: PropTypes.bool,
  onRef: PropTypes.func,
  defaultTitle: PropTypes.bool
};

export default JPModal;
