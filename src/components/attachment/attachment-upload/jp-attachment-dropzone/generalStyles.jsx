
const primaryColor = [
  '#ff9800',
  '#ffa726',
  '#fb8c00',
  '#ffa21a',
  '#f57c00',
  '#faf2cc',
  '#fcf8e3',
  '#f27f2d',
  '#f39621',
  '#f2a921'
];
const grayColor = [
  '#999',
  '#777',
  '#3C4858',
  '#AAAAAA',
  '#D2D2D2',
  '#DDD',
  '#46484A',
  '#333',
  '#eee',
  '#ccc',
  '#e4e4e4',
  '#E5E5E5',
  '#f9f9f9',
  '#f5f5f5',
  '#495057',
  '#e7e7e7',
  '#212121',
  '#c8c8c8',
  '#505050',
  '#DDDDDD',
  '#F5F6F7 ',
  '#f5f5f6'
];


const hexToRgb = input => {
  input = input + '';
  input = input.replace('#', '');
  let hexRegex = /[0-9A-Fa-f]/g;
  if (!hexRegex.test(input) || (input.length !== 3 && input.length !== 6)) {
    throw new Error('input is not a valid hex color.');
  }
  if (input.length === 3) {
    let first = input[0];
    let second = input[1];
    let last = input[2];
    input = first + first + second + second + last + last;
  }
  input = input.toUpperCase(input);
  let first = input[0] + input[1];
  let second = input[2] + input[3];
  let last = input[4] + input[5];
  return parseInt(first, 16) + ', ' + parseInt(second, 16) + ', ' + parseInt(last, 16);
};

const primaryBoxShadow = {
  boxShadow:
    '0 4px 20px 0 rgba(' +
    hexToRgb('#000') +
    ',.14), 0 7px 10px -5px rgba(' +
    hexToRgb(primaryColor[0]) +
    ',.4)'
};
const generalStyles = {
  select: {
    padding: '12px 0 7px',
    fontSize: '.75rem',
    fontWeight: '400',
    lineHeight: '1.42857',
    textDecoration: 'none',
    textTransform: 'uppercase',
    color: grayColor[2],
    letterSpacing: '0',
    '&:focus': {
      backgroundColor: 'transparent'
    },
    '&[aria-owns] + input + svg': {
      transform: 'rotate(180deg)'
    },
    '& + input + svg': {
      transition: 'all 300ms linear'
    }
  },
  selectFormControl: {
    margin: '7px 0 17px 0 !important',
    '& > div': {
      '&:before': {
        borderBottomWidth: '1px !important',
        borderBottomColor: grayColor[4] + '!important'
      },
      '&:after': {
        borderBottomColor: primaryColor[0] + '!important'
      }
    }
  },
  selectLabel: {
    color: grayColor[3],
    height: 'unset',
    fontSize: '14px',
    fontWeight: '400',
    lineHeight: '1.42857',
    opacity: '1'
  },
  selectMenu: {
    '& > div > ul': {
      border: '0',
      padding: '5px 0',
      margin: '0',
      boxShadow: 'none',
      minWidth: '100%',
      borderRadius: '4px',
      boxSizing: 'border-box',
      display: 'block',
      fontSize: '14px',
      textAlign: 'left',
      listStyle: 'none',
      backgroundColor: '#FFF',
      backgroundClip: 'padding-box'
    },
    '& $selectPaper $selectMenuItemSelectedMultiple': {
      backgroundColor: 'inherit'
    },
    '& > div + div': {
      maxHeight: '266px !important'
    }
  },
  selectMenuItem: {
    fontSize: '13px',
    padding: '10px 20px',
    margin: '0 5px',
    borderRadius: '2px',
    transition: 'all 150ms linear',
    display: 'block',
    clear: 'both',
    fontWeight: '400',
    lineHeight: '2',
    whiteSpace: 'nowrap',
    color: grayColor[7],
    paddingRight: '30px',
    '&:hover': {
      backgroundColor: primaryColor[0],
      color: '#FFF',
      ...primaryBoxShadow
    }
  },
  selectMenuItemSelected: {
    backgroundColor: primaryColor[0] + '!important',
    color: '#FFF !important'
  },
  selectMenuItemSelectedMultiple: {
    backgroundColor: 'transparent !important',
    '&:hover': {
      backgroundColor: primaryColor[0] + '!important',
      color: '#FFF',
      ...primaryBoxShadow,
      '&:after': {
        color: '#FFF'
      }
    },
    '&:after': {
      top: '16px',
      right: '12px',
      width: '12px',
      height: '5px',
      borderLeft: '2px solid currentColor',
      transform: 'rotate(-45deg)',
      opacity: '1',
      color: grayColor[2],
      position: 'absolute',
      content: "''",
      borderBottom: '2px solid currentColor',
      transition: 'opacity 90ms cubic-bezier(0,0,.2,.1)'
    }
  },
  selectPaper: {
    boxSizing: 'borderBox',
    borderRadius: '4px',
    padding: '0',
    minWidth: '100%',
    display: 'block',
    border: '0',
    boxShadow: '0 2px 5px 0 rgba(' + hexToRgb('#000') + ', 0.26)',
    backgroundClip: 'padding-box',
    margin: '2px 0 0',
    fontSize: '14px',
    textAlign: 'left',
    listStyle: 'none',
    backgroundColor: 'transparent',
    maxHeight: '266px'
  },
  icon: {
    opacity: '0'
  },
  fullWidth: {
    width: '100%'
  },
  fullHeight: {
    height: '100%'
  },
  subtitle: {
    fontWeight: 'normal',
    fontSize: '12px',
    lineHeight: '14px',
    color: '#46484A80',
    textTransform: 'uppercase',
    letterSpacing: '0.96px'
  },
  tableDisabled: {
    'pointer-events': 'none',
    '-webkit-user-select': 'none',
    '-moz-user-select': 'none',
    '-ms-user-select': 'none',
    'user-select': 'none',
    opacity: 0.8
  },
  disabled: {
    'pointer-events': 'none',
    '-webkit-user-select': 'none',
    '-moz-user-select': 'none',
    '-ms-user-select': 'none',
    'user-select': 'none',
    opacity: 0.45
  },
  disabledOnly: {
    'pointer-events': 'none',
    '-webkit-user-select': 'none',
    '-moz-user-select': 'none',
    '-ms-user-select': 'none',
    'user-select': 'none'
  },
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: '180px'
  },
  container: {
    flex: 1
  },
  paddingRegular: {
    padding: 8
  },
  paddingLarge: {
    padding: 16
  },
  paddingXLarge: {
    padding: 32
  },
  textAlignCenter: {
    textAlign: 'center'
  },
  textAlignLeft: {
    textAlign: 'left'
  },
  textAlignRight: {
    textAlign: 'right'
  },
  moreButton: { margin: '8px', marginLeft: '-2px', cursor: 'pointer' },
  loader: {
    color: primaryColor[0]
  },
  inputAdornment: {
    marginRight: '8px',
    position: 'relative'
  },
  dottedBorderBottom: {
    backgroundImage: 'linear-gradient(to right, #aaa 32%, rgba(255,255,255,0) 10%)',
    backgroundPosition: 'bottom',
    backgroundSize: '8px 1.5px',
    backgroundRepeat: 'repeat-x'
  },
  disabledInput: {
    opacity: '1 !important',
    '&::before': {
      opacity: '0 !important'
    }
  },
  removeUnderLine: {
    borderBottom: 'none',
    '&::before': {
      opacity: '0 !important'
    }
  },

  focusableDiv: { cursor: 'pointer' },
  cardIconTitle: {
    marginTop: '10px',
    marginBottom: '10px'
  },
  blackFont: {
    color: '#000 !important'
  },
  marginLeft: {
    marginLeft: '16px'
  },
  noselect: {
    '-webkit-touch-callout': 'none',
    '-webkit-user-select': 'none',
    '-khtml-user-select': 'none',
    '-moz-user-select': 'none',
    '-ms-user-select': 'none',
    'user-select': 'none'
  },
  treeViewSeparator: {
    position: 'absolute',
    height: 'inherit',
    width: '100%',
    borderBottom: `1px ${grayColor[19]} solid`,
    left: 0,
    zIndex: '-1'
  },
  fullOpacity: {
    opacity: 1
  },
  textEllipsis: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap'
  },
  displayFlex: {
    display: 'flex'
  },
  capsuleMinWidth: {
    minWidth: '100px'
  },
  noHorizontalPadding: {
    paddingRight: '0 !important',
    paddingLeft: '0 !important'
  },
  noVerticalPadding: {
    paddingTop: '0 !important',
    paddingBottom: '0 !important'
  },
  noMargin: {
    color: 'white',
    margin: '0 !important'
  },
  displayNone: {
    display: 'none'
  },
  invertColors: {
    filter: 'invert(1)'
  },
  verticalAlignMiddle: {
    verticalAlign: 'middle'
  },
  disableHover: {
    '&:hover': {
      backgroundColor: 'unset !important',
      color: 'unset !important',
      boxShadow: 'unset !important'
    }
  },
  disableFocus: {
    '&:focus': {
      backgroundColor: 'unset !important',
      color: 'unset !important',
      boxShadow: 'unset !important',
      '-webkit-user-select': 'none',
      '-moz-user-select': 'none',
      '-ms-user-select': 'none'
    }
  },
  alternativeLogo: {
    width: '70%',
    height: '70%',
    opacity: 0.5,
    backgroundColor: 'unset !important'
  },
  verticalCenter: {
    display: 'flex',
    alignItems: 'center'
  },
  horizontalCenter: {
    display: 'flex',
    justifyContent: 'center'
  },
  fullFlexCenter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  cardHeight: {
    height: 'calc(100% - 60px)'
  },
  flexEnd: {
    display: 'flex',
    justifyContent: 'end'
  },
  uploadButton: {
    marginBottom: 16
  },
  numberOfLines: ({ numberOfLines = 2 }) => ({
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    '-webkit-line-clamp': numberOfLines,
    '-webkit-box-orient': 'vertical'
  })
};
export default generalStyles;
