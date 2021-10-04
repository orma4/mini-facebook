import { Autocomplete as MuiAutocomplete } from '@mui/material';
import { Controller } from 'react-hook-form';
import { TextField } from '@mui/material';

export const Autocomplete = ({
  name,
  label,
  control,
  options,
  type,
  disabled,
  helperText,
  defaultValue = '',
  error,
  className,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <MuiAutocomplete
          onChange={(event, item) => {
            onChange(item);
          }}
          value={value}
          options={options}
          getOptionLabel={item => (item.name ? item.name : '')}
          getOptionSelected={(option, value) =>
            value === undefined || value === '' || option.id === value.id
          }
          renderInput={params => (
            <TextField
              {...params}
              //   error={!!errors.item}
              //   helperText={errors.item && 'item required'}
            />
          )}
        />
      )}
    />
  );
};

export default Autocomplete;
