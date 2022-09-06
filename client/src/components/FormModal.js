import { forwardRef, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "80%",
  maxWidth: 800,
  p: 4,
};

const FormModal = forwardRef(({handleCreateUser}, ref) => {
  const [loading, setLoading] = useState(false);
  const usernameRef = useRef();
  const nameRef = useRef();
  const bioRef = useRef();

  function submitHandler(e) {
    e.preventDefault();
    setLoading(true);
    handleCreateUser({username: usernameRef.current.value, name: nameRef.current.value, bio: bioRef.current.value});
  }

  return (
    <Paper elevation={3} sx={style} >
    <h1>Let's create an Account</h1>
        <Box component="form" sx={{maxWidth: 300}} autoComplete="off" onSubmit={submitHandler} >
            <TextField
              label="Username"
              id="username"
              name="username"
              required
              margin="normal"
              fullWidth
              inputRef={usernameRef}
            />
            <TextField
              label="Name"
              id="name"
              name="name"
              required
              margin="normal"
              fullWidth
              inputRef={nameRef}
            />
            <TextField
              label="Bio"
              id="bio"
              name="bio"
              required
              margin="normal"
              fullWidth
              inputRef={bioRef}
            />

            <Button type='submit' disabled={loading ? true : false} variant="outlined" className="sidebarTweet" sx={{marginLeft: "0"}}>{loading ? "Creating... ": "Create"}</Button>
        </Box>
    </Paper>
  )
})

export default FormModal