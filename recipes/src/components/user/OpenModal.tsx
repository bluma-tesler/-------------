import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Modal, Button, Box, IconButton, FormControl, InputLabel, OutlinedInput, InputAdornment } from '@mui/material'
import { FormEvent, RefObject, useState } from 'react';
const OpenModal = ({ open, onClose, onSubmit, emailRef, passwordRef }:
    {
        open: boolean,
        onClose: () => void,
        onSubmit: (e: FormEvent<HTMLFormElement>) => void,
        emailRef: RefObject<HTMLInputElement>;
        passwordRef: RefObject<HTMLInputElement>;
    }) => {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 250,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (<>
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Box sx={style}>
                <form onSubmit={onSubmit}>
                    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">email</InputLabel>
                        <OutlinedInput
                            type='email'
                            id="outlined-adornment-weight"
                            endAdornment={<InputAdornment position="end"></InputAdornment>}
                            label="email"
                            inputRef={emailRef}
                            required
                        />
                    </FormControl>
                    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            inputRef={passwordRef}
                            required
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label={
                                            showPassword ? 'hide the password' : 'display the password'
                                        }
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        onMouseUp={handleMouseUpPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                    </FormControl>
                    <div style={{ textAlign: 'center' }}>
                        <Button sx={{ margin: 2 }} type='submit' variant="contained"
                            color="success" >Submit</Button>
                        <Button sx={{ margin: 2 }} variant="contained"
                            color="success" onClick={onClose}> חזור</Button></div>
                </form>
            </Box>
        </Modal>
    </>)
}
export default OpenModal