import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { login } from 'store/authSlice';

export default function LoginWindow() {
  const [open, setOpen] = useState(true);

  function handleSubmit(e: HTMLFormElement): void {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formJson = Object.fromEntries((formData as any).entries());
    const username = formJson.username;
    login({ username });
    setOpen(false);
  }

  return (
    <>
      <Dialog
        open={open}
        PaperProps={{
          component: 'form',
          onSubmit: handleSubmit
        }}
      >
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates occasionally.
          </DialogContentText>
          <TextField
            id="outlined-basic"
            margin="dense"
            name="username"
            label="Username"
            variant="outlined"
            autoFocus
            required
          />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" type="submit">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}