import { Box, Button } from '@mui/material';

interface FormActionsProps {
  onCancel: () => void;
  cancelLabel?: string;
  submitLabel?: string;
  loading?: boolean;
}

const FormActions: React.FC<FormActionsProps> = ({
  onCancel,
  cancelLabel = 'Batal',
  submitLabel = 'Tambah',
  loading = false,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 1,
        width: '100%',
        mt: 2,
      }}
    >
      <Button
        type="button"
        variant="contained"
        color="error"
        sx={{
          flex: 1,
          borderRadius: '10px',
          px: { xs: 3, md: 4 },
          py: { xs: 1.5, md: 1.75 },
          fontSize: { xs: '14px', md: '15px' },
          fontWeight: 600,
          textTransform: 'none',
          boxShadow: '0px 4px 12px 0px rgba(0, 53, 68, 0.15)',
          '&:hover': {
            backgroundColor: '#d32f2f',
          },
        }}
        onClick={onCancel}
      >
        {cancelLabel}
      </Button>
      <Button
        type="submit"
        variant="contained"
        loading={loading}
        sx={{
          flex: 1,
          backgroundColor: '#003544',
          borderRadius: '10px',
          px: { xs: 3, md: 4 },
          py: { xs: 1.5, md: 1.75 },
          fontSize: { xs: '14px', md: '15px' },
          fontWeight: 600,
          textTransform: 'none',
          boxShadow: '0px 4px 12px 0px rgba(0, 53, 68, 0.15)',
          '&:hover': {
            backgroundColor: '#002a35',
            boxShadow: '0px 6px 16px 0px rgba(0, 53, 68, 0.25)',
          },
        }}
      >
        {submitLabel}
      </Button>
    </Box>
  );
};

export default FormActions;
