import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import http from '../../axios';
import { Like, CreatePost } from '../../components';
import Cookies from 'universal-cookie';

export const Wall = () => {
  const [posts, setPosts] = useState([]);
  const { id } = useParams();
  const cookies = new Cookies();
  const currentLoggedInUserId = cookies.get('userId');

  useEffect(() => {
    const fetchPostsByUserId = async () => {
      try {
        const response = await http.post('/posts/user-posts', { userId: id });

        if (response.status === 200 && response.data) {
          setPosts(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchPostsByUserId();
  }, [id]);

  return (
    <div>
      {id === currentLoggedInUserId && (
        <CreatePost posts={posts} setPosts={setPosts} />
      )}
      {posts.length > 0 ? <h1>Posts by you :</h1> : <h1>No posts yet</h1>}

      {posts.map(post => {
        const likesLength = post?.likes?.length;
        const userAlreadyLikedPost = post?.likes?.includes(
          currentLoggedInUserId,
        );

        return (
          <div key={post._id}>
            <h2>{post.title}</h2>
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

export default Wall;
