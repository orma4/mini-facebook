import { useForm } from 'react-hook-form';
import { TextField } from '../../ui';
import { Button } from '@mui/material';
import http from '../../axios';

export const CreatePost = ({ posts, setPosts }) => {
  const {
    control,
    handleSubmit,
    reset,
    // formState: { errors },
  } = useForm();

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
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField label='Title' name='title' control={control} />
      <TextField label='Description' name='description' control={control} />
      <Button type='submit' variant='contained'>
        Create Post
      </Button>
    </form>
  );
};

export default CreatePost;
