import { TextField as MuiTextField } from '@mui/material';
import { Controller } from 'react-hook-form';

export const TextField = ({
  name,
  label,
  control,
  type,
  disabled,
  helperText,
  defaultValue = '',
  error,
  className,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <MuiTextField
          {...field}
          type={type}
          label={label}
          disabled={disabled}
          className={className}
          helperText={helperText}
          error={!!helperText}
        />
      )}
    />
  );
};

export default TextField;
