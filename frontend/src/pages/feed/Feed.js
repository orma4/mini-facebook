import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import http from '../../axios';
import { Like, CreatePost } from '../../components';
import Cookies from 'universal-cookie';
import { Button, Typography, Paper, Divider } from '@mui/material';

// import * as yup from 'yup';
// import { yupResolver } from '@hookform/resolvers/yup';

export const Feed = () => {
  const [posts, setPosts] = useState([]);
  const history = useHistory();
  const cookies = new Cookies();
  const userId = cookies.get('userId');

  const getAllPosts = async () => {
    try {
      const response = await http.get('/posts');
      setPosts(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <div>
      <CreatePost posts={posts} setPosts={setPosts} />

      {posts.length > 0 && (
        <Typography component='h2' variant='h2'>
          Posts from all the users:
        </Typography>
      )}

      {posts.map(post => {
        const likesLength = post?.likes?.length;
        const userAlreadyLikedPost = post?.likes?.includes(userId);

        return (
          <Paper key={post._id} sx={{ p: 2, mb: 2 }}>
            <Button onClick={() => history.push(`/${post.userId}`)}>
              {post.author}
            </Button>
            <p style={{ fontWeight: 'bold', fontSize: '2.2rem' }}>
              {post.title}
            </p>
            <p style={{ marginBottom: '2rem' }}>{post.description}</p>

            <Divider />

            <Like
              postId={post._id}
              likesLength={likesLength}
              userAlreadyLikedPost={userAlreadyLikedPost}
              posts={posts}
              setPosts={setPosts}
            />
          </Paper>
        );
      })}
    </div>
  );
};

export default Feed;
