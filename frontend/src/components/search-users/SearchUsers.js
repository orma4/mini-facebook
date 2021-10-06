import { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import http from '../../axios';
import { TextField } from '../../ui';
import { Paper, Button, ClickAwayListener } from '@mui/material';
import { useDebounce } from '../../hooks';
import { useHistory } from 'react-router-dom';

const paperStyles = {
  position: 'absolute',
  zIndex: '99',
  width: '320px',
  p: 2,
  mt: 1.5,
  maxHeight: '15rem',
  overflow: 'auto',
};

export const SearchUsers = () => {
  const [usersOptions, setUsersOptions] = useState([]);
  const [isSearchPaperOpen, setIsSearchPaperOpen] = useState(false);
  const history = useHistory();
  const {
    control,
    watch,
    reset,
    // formState: { errors },
  } = useForm();
  const searchFieldValue = watch('searchTerm');
  const debouncedUsersValue = useDebounce(searchFieldValue, 500);

  useEffect(() => {
    const findUsers = async () => {
      try {
        const response = await http.post('/users/search', {
          searchTerm: debouncedUsersValue,
        });

        if (response.status === 200 && response.data) {
          setUsersOptions(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (debouncedUsersValue) {
      setIsSearchPaperOpen(true);
      findUsers();
    } else {
      setIsSearchPaperOpen(false);
      setUsersOptions([]);
    }
  }, [debouncedUsersValue]);

  const renderUsersList = useCallback(() => {
    if (usersOptions.length > 0 && isSearchPaperOpen) {
      return (
        <Paper sx={paperStyles}>
          {usersOptions.map(userOption => {
            return (
              <Button
                key={userOption._id}
                sx={{
                  display: 'block',
                  mb: 1,
                  width: '100%',
                  textAlign: 'left',
                  p: '1rem 0',
                }}
                onClick={() => {
                  history.push(`/${userOption._id}`);
                  setUsersOptions([]);
                  reset({ searchTerm: '' });
                }}
              >
                {userOption.fullName}
              </Button>
            );
          })}
        </Paper>
      );
    } else if (usersOptions.length === 0 && searchFieldValue) {
      return <Paper sx={paperStyles}>No users found</Paper>;
    }
  }, [history, searchFieldValue, usersOptions, isSearchPaperOpen, reset]);

  return (
    <ClickAwayListener onClickAway={() => setIsSearchPaperOpen(false)}>
      <div>
        <TextField label='Search User...' name='searchTerm' control={control} />
        {renderUsersList()}
      </div>
    </ClickAwayListener>
  );
};

export default SearchUsers;
