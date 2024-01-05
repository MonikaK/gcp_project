import {Box, SxProps, TextField, Theme, Typography} from "@mui/material";

/**
 * Function representing the component responsible for managing a single form input text field.
 */
export const Input = ({
                    label,
                    value,
                    onChange,
                    error,
                    helperText,
                    type,
                    sx,
                    disabled
}:{
    label: string;
    value: string;
    onChange?: (value: string) => void;
    error?: boolean;
    helperText?: string;
    type?: string;
    sx?: SxProps<Theme>;
    disabled?: boolean;
}) => {
    return (
        <Box marginY={2} sx={[...(Array.isArray(sx) ? sx : [sx])]}>
            <Typography variant="subtitle1" fontWeight={500} marginBottom={1}>
                {label}
            </Typography>
            <TextField
                variant="filled"
                fullWidth
                value={value}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange && onChange(e.target.value)}
                error={error}
                helperText={helperText}
                type={type}
                disabled={disabled}
            />
        </Box>
    );
}