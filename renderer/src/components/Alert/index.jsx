import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import { AlertContent } from './style';
import CloseIcon from '@mui/icons-material/Close';
import Collapse from '@mui/material/Collapse';
import { Alert } from '@mui/material';

export default function AlertComponent({ msg, opened, setConnectionErr}) {
    const [isOpen, setIsOpen] = React.useState(opened)
    
    return (

        <AlertContent>
            <Collapse in={isOpen}>
                <Alert
                    severity='error'
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setIsOpen(false)
                                setConnectionErr(false)
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                >
                    {msg}
                </Alert>
            </Collapse>
        </AlertContent>

    );
}