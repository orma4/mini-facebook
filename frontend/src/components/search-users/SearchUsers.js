import { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import http from '../../axios';
import { TextField } from '../../ui';
import { Paper } from '@mui/material';
import { useDebounce } from '../../hooks';
import { useHistory } from 'react-router-dom';

export const SearchUsers = () => {
  const [usersOptions, setUsersOptions] = useState([]);
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
      findUsers();
    } else {
      setUsersOptions([]);
    }
  }, [debouncedUsersValue]);

  const renderUsersList = useCallback(() => {
    if (usersOptions.length > 0) {
      return (
        <Paper>
          {usersOptions.map(userOption => {
            return (
              <div
                key={userOption._id}
                onClick={() => {
                  history.push(`/${userOption._id}`);
                  setUsersOptions([]);
                  reset({ searchTerm: '' });
                }}
              >
                {userOption.fullName}
              </div>
            );
          })}
        </Paper>
      );
    } else if (usersOptions.length === 0 && searchFieldValue) {
      return <Paper>No users found</Paper>;
    }
  }, [history, searchFieldValue, usersOptions, reset]);

  return (
    <div>
      <TextField label='Search User...' name='searchTerm' control={control} />
      {renderUsersList()}
    </div>
  );
};

export default SearchUsers;
