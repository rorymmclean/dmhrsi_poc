import generalStyles from "../generalStyles";

const defaultDropZoneStyle = {
  ...generalStyles,
  dropZone: {
    flex: 1,
    width: '100%',
    border: '1px dashed #D3D3D3',
    textAlign: 'center',
    color: '#ccc',
    marginTop: '16px',
    borderRadius: '8px',
    height: '196px',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex'
  },
  title: {
    fontStyle: 'Italic',
    fontSize: '13px',
    lineHeight: '18px'
  }
};

export default defaultDropZoneStyle;
