import http from '../../axios';
import { useState } from 'react';

export const Like = ({
  postId,
  likesLength,
  userAlreadyLikedPost,
  posts,
  setPosts,
}) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLikeOrDislikeCompletion = newData => {
    const postsCopy = [...posts];
    const postIndexToUpdate = postsCopy.findIndex(post => post._id === postId);
    postsCopy[postIndexToUpdate] = newData;
    setPosts(postsCopy);
  };

  const likePost = async () => {
    try {
      const response = await http.post('/posts/like-post', { postId });
      if (response.status === 200) {
        setIsLiked(true);
        handleLikeOrDislikeCompletion(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const dislikePost = async () => {
    try {
      const response = await http.post('/posts/dislike-post', { postId });
      if (response.status === 200) {
        setIsLiked(false);
        handleLikeOrDislikeCompletion(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <button onClick={!userAlreadyLikedPost ? likePost : dislikePost}>
        {isLiked || userAlreadyLikedPost ? 'Dislike' : 'Like'}
      </button>

      <p>{likesLength > 0 && likesLength}</p>
    </div>
  );
};

export default Like;
