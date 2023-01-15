import generalStyles from 'styles/root/generalStyles';

const AttachmentListStyle = {
  ...generalStyles,
  container: {
    paddingTop: 16,
    marginBottom: 16,
    minHeight: 210
  },
  header: {
    fontSize: 16
  },
  emptyContent: {
    fontSize: 16,
    textAlign: 'center',
    paddingBottom: 16
  }
};

export default AttachmentListStyle;
