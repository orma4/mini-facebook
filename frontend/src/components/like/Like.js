import http from '../../axios';
import { useState } from 'react';
import { Button, styled } from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';

const StyledSvgLikeButton = styled(Button)`
  margin-top: '2rem';

  svg {
    width: 3.2rem;
    height: 3.2rem;
  }
`;

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
      <StyledSvgLikeButton
        onClick={!userAlreadyLikedPost ? likePost : dislikePost}
        sx={{
          minWidth: 'auto',
          p: 0,
          mt: '2rem',
        }}
      >
        {isLiked || userAlreadyLikedPost ? (
          <ThumbUpAltIcon />
        ) : (
          <ThumbUpOutlinedIcon />
        )}
        <p style={{ marginLeft: '1rem' }}>{likesLength > 0 && likesLength}</p>
      </StyledSvgLikeButton>
    </div>
  );
};

export default Like;
