import { TextField as MuiTextField, styled } from '@mui/material';
import { Controller } from 'react-hook-form';
import { mobile } from '../../utils/screen-sizes';

const StyledTextField = styled(MuiTextField)`
  width: 35rem;

  .MuiOutlinedInput-root {
    background: #f4f5f8;
  }

  @media ${mobile} {
    width: 25rem;
  }
`;

export const TextField = ({
  name,
  label,
  control,
  type = 'text',
  disabled,
  helperText,
  defaultValue = '',
  error,
  className,
  ...props
}) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <StyledTextField
          {...field}
          type={type}
          label={label}
          disabled={disabled}
          className={className}
          helperText={helperText}
          error={!!helperText}
          autoComplete='off'
          {...props}
        />
      )}
    />
  );
};

export default TextField;
