import AddIcon from '@mui/icons-material/Add';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

type CreateFormInput = {
  name: string;
  key: string;
  description?: string;
};

export default function AddProject() {
  const [open, setOpen] = useState(false);
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<CreateFormInput>();

  const onSubmit: SubmitHandler<CreateFormInput> = (data) => {
    console.log(data);
  };

  const handleOpen = () => {
    reset();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        data-testid="add-project-button"
        variant="contained"
        onClick={handleOpen}
      >
        <AddIcon /> Add
      </Button>
      <Dialog
        data-testid="add-project-dialog"
        open={open}
        onClose={handleClose}
        fullWidth
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>Add project</DialogTitle>
          <DialogContent data-testid="add-project-dialog-content">
            <Stack spacing={2} sx={{ paddingTop: '0.25rem' }}>
              <Controller
                name="name"
                control={control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    label="Name"
                    error={Boolean(errors.name)}
                    helperText={errors.name && 'Name is required'}
                    data-testid="project-name"
                    {...field}
                  />
                )}
              />
              <Controller
                name="key"
                control={control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    label="Key"
                    error={Boolean(errors.key)}
                    helperText={errors.key && 'Key is required'}
                    data-testid="project-key"
                    {...field}
                  />
                )}
              />
              <Controller
                name="description"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    multiline
                    label="Description"
                    rows={3}
                    data-testid="project-description"
                    {...field}
                  />
                )}
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button
              variant="outlined"
              data-testid="add-project-dialog-close"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              data-testid="add-project-dialog-save"
            >
              Add
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
