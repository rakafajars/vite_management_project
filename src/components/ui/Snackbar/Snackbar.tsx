import { Snackbar as BaseSnackbar, Alert, AlertProps, SnackbarProps } from '@mui/material';

export interface CustomSnackbarProps extends Omit<SnackbarProps, 'message'> {
  open: boolean;
  onClose: () => void;
  message: string;
  severity?: AlertProps['severity'];
}

const Snackbar = ({
  open,
  onClose,
  message,
  severity = 'error',
  autoHideDuration = 6000,
  anchorOrigin = { vertical: 'top', horizontal: 'right' },
  ...props
}: CustomSnackbarProps): React.ReactElement => {
  return (
    <BaseSnackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={anchorOrigin}
      {...props}
    >
      <Alert onClose={onClose} severity={severity} sx={{ width: '100%', fontSize: '14px', fontFamily: 'Inter, sans-serif' }}>
        {message}
      </Alert>
    </BaseSnackbar>
  );
};

export default Snackbar;
