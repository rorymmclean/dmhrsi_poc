import React from 'react';
import PropTypes from 'prop-types';

// Material UI
import { Grid, makeStyles } from '@material-ui/core';

// Styles
import classNames from 'classnames';
import JPGridStyle from 'components/jp-grid/jp-grid-style';

const useStyle = makeStyles(JPGridStyle);

/**
 * @function JPGrid
 * @description will render normal Grid component from material UI with extra features like margin and padding
 * @param {*} props
 */
function JPGrid(props) {
  const {
    paddingRight,
    paddingLeft,
    paddingBottom,
    paddingTop,
    marginBottom,
    marginTop,
    marginRight,
    marginLeft,
    children,
    className,
    fullHeight,
    height,
    width,
    fullWidth,
    maxWidth,
    maxHeight,
    minWidth,
    minHeight,
    margin,
    padding,
    disabled,
    ...rest
  } = props;

  const classes = useStyle(props);

  return (
    <Grid
      className={classNames(classes.grid, {
        [classes.disabledOnly]: disabled,
        [className]: !!className
      })}
      {...rest}
    >
      {children}
    </Grid>
  );
}

JPGrid.propTypes = {
  padding: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  margin: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  paddingRight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  paddingLeft: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  paddingBottom: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  paddingTop: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  marginBottom: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  marginTop: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  marginRight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  marginLeft: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  maxWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  minWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  minHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  maxHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
  disabled: PropTypes.bool,
  fullHeight: PropTypes.bool,
  container: PropTypes.bool,
  item: PropTypes.bool,
  fullWidth: PropTypes.bool,
  spacing: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
  wrap: PropTypes.oneOf(['nowrap', 'wrap', 'wrap-reverse']),
  justify: PropTypes.oneOf([
    'flex-start',
    'center',
    'flex-end',
    'space-between',
    'space-around',
    'space-evenly'
  ]),
  alignContent: PropTypes.oneOf([
    'stretch',
    'center',
    'flex-start',
    'flex-end',
    'space-between',
    'space-around'
  ]),
  direction: PropTypes.oneOf(['row', 'row-reverse', 'column', 'column-reverse']),
  alignItems: PropTypes.oneOf(['flex-start', 'center', 'flex-end', 'stretch', 'baseline']),
  display: PropTypes.string
};

export default JPGrid;
