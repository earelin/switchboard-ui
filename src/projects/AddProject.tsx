import AddIcon from '@mui/icons-material/Add';
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from '@mui/material';
import React, { useCallback, useState } from 'react';
import {
  Control,
  Controller,
  FieldErrors,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { isBlank } from '../utils/validation';
import { useQueryClient } from '@tanstack/react-query';

type CreateFormInput = {
  name: string;
  key: string;
  description?: string;
};

export default function AddProject() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
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
      <AddProjectDialog open={open} handleClose={handleClose} />
    </>
  );
}

type AddProjectDialogProps = {
  open: boolean;
  handleClose: VoidFunction;
};

function AddProjectDialog({ open, handleClose }: AddProjectDialogProps) {
  const queryClient = useQueryClient();
  const [isUploading, setIsUploading] = useState(false);
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<CreateFormInput>();

  const onClose: VoidFunction = useCallback(() => {
    handleClose();
    setIsUploading(false);
    reset();
  }, [reset, handleClose]);

  const onSubmit: SubmitHandler<CreateFormInput> = useCallback(
    (data) => {
      setIsUploading(true);
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      onClose();
    },
    [queryClient, onClose]
  );

  return (
    <Dialog
      data-testid="add-project-dialog"
      open={open}
      onClose={onClose}
      fullWidth
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Add project</DialogTitle>
        <DialogContent data-testid="add-project-dialog-content">
          <AddProjectFormFields
            disabled={isUploading}
            control={control}
            errors={errors}
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            data-testid="add-project-dialog-close"
            onClick={onClose}
          >
            Cancel
          </Button>
          <SubmitButton isUploading={isUploading} />
        </DialogActions>
      </form>
    </Dialog>
  );
}

type AddProjectFormFieldsProps = {
  disabled: boolean;
  control: Control<CreateFormInput>;
  errors: FieldErrors<CreateFormInput>;
};

function AddProjectFormFields({
  control,
  disabled,
  errors,
}: AddProjectFormFieldsProps) {
  return (
    <Stack spacing={2} sx={{ paddingTop: '0.25rem' }}>
      <Controller
        name="name"
        control={control}
        defaultValue=""
        rules={{ validate: validateFieldNotEmpty('Name') }}
        render={({ field }) => (
          <TextField
            disabled={disabled}
            error={Boolean(errors.name)}
            helperText={errors?.name?.message || ' '}
            inputProps={{ 'data-testid': 'project-name' }}
            label="Name"
            {...field}
          />
        )}
      />
      <Controller
        name="key"
        control={control}
        defaultValue=""
        rules={{ validate: validateFieldNotEmpty('Key') }}
        render={({ field }) => (
          <TextField
            disabled={disabled}
            error={Boolean(errors.key)}
            helperText={errors?.key?.message || ' '}
            inputProps={{ 'data-testid': 'project-key' }}
            label="Key"
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
            disabled={disabled}
            inputProps={{ 'data-testid': 'project-description' }}
            label="Description"
            multiline
            rows={3}
            {...field}
          />
        )}
      />
    </Stack>
  );
}

type SubmitButtonProps = {
  isUploading: boolean;
};

function SubmitButton({ isUploading }: SubmitButtonProps) {
  return (
    <Button
      type="submit"
      variant="contained"
      data-testid="add-project-dialog-save"
    >
      {isUploading && (
        <CircularProgress
          color="inherit"
          size="1rem"
          sx={{ marginRight: '0.5rem' }}
        />
      )}
      Add
    </Button>
  );
}

function validateFieldNotEmpty(name: string) {
  return function (value: string | null) {
    return isBlank(value) ? `${name} should not be empty` : undefined;
  };
}
