import { useState, useEffect } from 'react';
import http from '../../axios';
import { Like, CreatePost } from '../../components';
import Cookies from 'universal-cookie';

// import * as yup from 'yup';
// import { yupResolver } from '@hookform/resolvers/yup';

export const HomePage = () => {
  const [posts, setPosts] = useState([]);
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

      {posts.length > 0 && <h1>Posts from all the users:</h1>}

      {posts.map(post => {
        const likesLength = post?.likes?.length;
        const userAlreadyLikedPost = post?.likes?.includes(userId);

        return (
          <div key={post._id}>
            <p>{post.author}</p>
            <p>{post.title}</p>
            <p>{post.description}</p>

            <Like
              postId={post._id}
              likesLength={likesLength}
              userAlreadyLikedPost={userAlreadyLikedPost}
              posts={posts}
              setPosts={setPosts}
            />
          </div>
        );
      })}
    </div>
  );
};

export default HomePage;
