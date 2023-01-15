
const JPGridStyle = theme => ({
  grid: {
    margin: ({ margin }) => margin,
    padding: ({ padding }) => padding,
    paddingRight: ({ paddingRight }) => paddingRight,
    paddingLeft: ({ paddingLeft }) => paddingLeft,
    paddingBottom: ({ paddingBottom }) => paddingBottom,
    paddingTop: ({ paddingTop }) => paddingTop,
    marginBottom: ({ marginBottom }) => marginBottom,
    marginTop: ({ marginTop }) => marginTop,
    marginRight: ({ marginRight }) => marginRight,
    maxHeight: ({ maxHeight }) => maxHeight,
    maxWidth: ({ maxWidth }) => maxWidth,
    minWidth: ({ minWidth }) => minWidth,
    minHeight: ({ minHeight }) => minHeight,
    marginLeft: ({ marginLeft }) => marginLeft,
    width: ({ fullWidth, width }) => (fullWidth ? '100%' : width),
    height: ({ fullHeight, height }) => (fullHeight ? '100%' : height),
    display: ({ display }) => display
  }
});

export default JPGridStyle;
