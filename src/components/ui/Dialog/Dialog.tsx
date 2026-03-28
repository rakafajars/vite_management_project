import {
    Dialog as BaseDialog,
    Button,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    ButtonProps,
    Box,
    Typography
} from '@mui/material';
// @ts-ignore
import ArchitectIcon from "@/assets/ic_architect_cv.svg";

export interface DialogAction {
    label: string;
    onClick: () => void;
    color?: ButtonProps['color'];
    variant?: ButtonProps['variant'];
}

export interface DialogProps {
    open: boolean;
    onClose: () => void;
    title: string;
    message: string;
    actions?: DialogAction[];
}

const Dialog = ({
    open,
    onClose,
    title,
    message,
    actions
}: DialogProps): React.ReactElement => {
    return (
        <BaseDialog 
            open={open} 
            onClose={onClose}
            PaperProps={{
                sx: {
                    borderRadius: '24px',
                    padding: '32px 24px',
                    textAlign: 'center',
                    maxWidth: '400px',
                    width: '100%',
                    boxShadow: '0px 10px 40px 0px rgba(0, 31, 41, 0.1)',
                }
            }}
        >
            <Box display="flex" justifyContent="center" mb={3}>
                <img src={ArchitectIcon} alt="Icon" width={100} height={100} />
            </Box>
            
            <DialogTitle sx={{ p: 0, mb: 1.5 }}>
                <Typography
                    fontFamily="Manrope, sans-serif"
                    fontSize="24px"
                    fontWeight={800}
                    color="#003544"
                >
                    {title}
                </Typography>
            </DialogTitle>
            
            <DialogContent sx={{ p: 0, mb: 4 }}>
                <DialogContentText
                    fontFamily="Inter, sans-serif"
                    fontSize="16px"
                    color="#4C616C"
                >
                    {message}
                </DialogContentText>
            </DialogContent>
            
            {actions && actions.length > 0 && (
                <DialogActions sx={{ p: 0, justifyContent: 'center', flexDirection: 'column', gap: 1.5 }}>
                    {actions.map((item, idx) => (
                        <Button
                            key={idx}
                            onClick={item.onClick}
                            variant={item.variant || "contained"}
                            fullWidth
                            sx={{
                                backgroundColor: item.variant !== 'outlined' && item.variant !== 'text' ? "#003544" : undefined,
                                color: item.variant === 'outlined' || item.variant === 'text' ? "#003544" : "#fff",
                                borderColor: "#003544",
                                borderRadius: '12px',
                                py: 1.5,
                                fontSize: "16px",
                                fontWeight: 600,
                                fontFamily: "Inter, sans-serif",
                                textTransform: "none",
                                boxShadow: item.variant !== 'outlined' && item.variant !== 'text' ? "0px 4px 12px 0px rgba(0, 53, 68, 0.15)" : 'none',
                                "&:hover": {
                                    backgroundColor: item.variant !== 'outlined' && item.variant !== 'text' ? "#002a35" : "rgba(0, 53, 68, 0.04)",
                                    borderColor: "#002a35",
                                },
                            }}
                        >
                            {item.label}
                        </Button>
                    ))}
                </DialogActions>
            )}
        </BaseDialog>
    );
};

export default Dialog;