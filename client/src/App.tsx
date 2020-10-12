import React, { useState } from 'react';
import { hot } from 'react-hot-loader/root';
import { Button, Container, Dialog, DialogTitle } from '@material-ui/core';

const App = () => {
  const [open, setOpen] = useState(false);
  return (
    <Container>
      <Button onClick={() => setOpen(true)}>Open</Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Hi</DialogTitle>
      </Dialog>
    </Container>
  );
};

export default hot(App);
