import React, {useEffect, useRef, useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IMask from 'imask';


export const DocumentTextField = ({
    label,
    placeholder, 
    name,
    value,
    onChange, 
    onClick, 
    required, 
    type, 
    error, 
    helptext, 
    icon,
    mask,
    id,
    ref
}) => {

    const maskRef = useRef(null);
    const inputRef = useRef(null);
    const [vallue, setValue] = useState('');    

    useEffect(() => {
        if (inputRef.current) {
            maskRef.current = IMask(inputRef.current, {
              mask: mask,
              lazy: false, // 'false' to always show the mask
              onAccept: (value) => {
                setValue(value); // Atualiza o estado com o valor formatado
              },
            });
          }
    }, []);
    
    const handleChange = (event) => {
        setValue(event.target.value);
 };
    return (
        <Box
        component="form"
        sx={{
            '& > :not(style)': { m: 1, width: '80%', borderRadius: "1rem" },
        }}
        noValidate
        autoComplete="off"
    >

        <TextField
            inputRef={inputRef}
            ref={ref}
            required={required}
            error={error}
            helperText={helptext}
            type={type}
            label={label}
            variant="outlined"
            placeholder={placeholder}
            value={value}
            name={name}
            onChange={onChange}
            onClick={() => onClick}
            id={id}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        {icon}
                    </InputAdornment>
                )
            }}
        />

    </Box>
    );
};

export const BasicInput = ({ 
    label, 
    placeholder, 
    value, 
    name, 
    onChange, 
    onClick, 
    required, 
    type, 
    error, 
    helptext, 
    icon, 
    TextMaskCustom,
    id,
    ref,
    readOnly,
    style }) => {
    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '80%', borderRadius: "1rem" },
            }}
            noValidate
            autoComplete="off"
        >

            <TextField
                style={style}
                aria-readonly={readOnly}
                ref={ref}
                error={error}
                helperText={helptext}
                type={type}
                label={label}
                variant="outlined"
                placeholder={placeholder}
                value={value}
                name={name}
                onChange={onChange}
                onClick={() => onClick}
                id={id}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            {icon}
                        </InputAdornment>
                    ),
                    inputComponent: TextMaskCustom,
                }}
                required={required}
            />

        </Box>
    );
}