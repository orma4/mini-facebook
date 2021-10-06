import { useForm } from 'react-hook-form';
import { TextField } from '../../ui';
import { Button, Paper, Grid } from '@mui/material';
import http from '../../axios';
import AddCommentIcon from '@mui/icons-material/AddComment';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

export const CreatePost = ({ posts, setPosts }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(createPostSchema) });

  const onSubmit = async ({ title, description }) => {
    try {
      const response = await http.post('/posts/create', { title, description });

      if (response.status === 200) {
        // Add the new post to state for re-render the page with the new post after submit
        setPosts([...posts, response.data]);
        reset({ title: '', description: '' });
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Paper
      sx={{
        p: '5rem 2rem',
        mb: 5,
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container direction='column' spacing={2}>
          <Grid item>
            <TextField
              label='Title'
              name='title'
              control={control}
              helperText={errors?.title?.message}
            />
          </Grid>

          <Grid item>
            <TextField
              label='Description'
              name='description'
              control={control}
              multiline
              rows={4}
              helperText={errors?.description?.message}
            />
          </Grid>

          <Grid item>
            <Button
              type='submit'
              variant='contained'
              startIcon={<AddCommentIcon />}
              sx={{ padding: '1rem 3rem' }}
            >
              Create Post
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export const createPostSchema = yup.object().shape({
  title: yup
    .string()
    .min(2, 'Minimum 2 characters')
    .max(30, 'Maximum 30 characters')
    .required('Required Field'),
  description: yup
    .string()
    .min(2, 'Minimum 2 characters')
    .max(300, 'Maximum 300 characters long')
    .required('Required Field'),
});

export default CreatePost;
