import {Box, Button, Modal, Typography} from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

/**
 * Function representing the component responsible for displaying an information of success or failure of an operation.
 */
const MessageBox = ({
                         isOpen,
                         text,
                         isError,
                         onClose
                   }:{
    isOpen: boolean;
    text: string;
    isError: boolean;
    onClose: ()=>void;
}) => {

    return (
        <Modal open={isOpen} onClose={onClose} className="modal" sx={{marginTop: "100px"}}>
            <Box
                sx={{
                    alignContent: "center",
                    alignItems: "center",
                    marginBottom: 1,
                    border: "2px solid black",
                    borderRadius: 3,
                    padding: 2,
                    backgroundColor: "rgba(231,226,182,1)",
                    height: "120px",
                    display:"flex",
                    flexDirection:"column"
                }}
            >
                {isError ? <ErrorIcon fontSize="large" color="error" /> :
                    <CheckCircleIcon fontSize="large" color="success" />}
                <Typography id="modal-modal-title" sx={{ my: 2 }}>
                    {text}
                </Typography>
                <Button onClick={onClose} className="button-style">OK</Button>
            </Box>
        </Modal>
    );
}

export default MessageBox;