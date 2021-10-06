import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import http from "../../axios";
import { Like, CreatePost } from "../../components";
import Cookies from "universal-cookie";
import { Typography, Paper, Divider } from "@mui/material";

export const Wall = () => {
  const [posts, setPosts] = useState([]);
  const { id } = useParams();
  const cookies = new Cookies();
  const currentLoggedInUserId = cookies.get("userId");

  useEffect(() => {
    const fetchPostsByUserId = async () => {
      try {
        const response = await http.post("/posts/user-posts", { userId: id });

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

      <Typography component="h2" variant="h2">
        {posts.length > 0 ? "User posts:" : "No posts yet"}
      </Typography>

      {posts.map((post) => {
        const likesLength = post?.likes?.length;
        const userAlreadyLikedPost = post?.likes?.includes(
          currentLoggedInUserId
        );

        return (
          <Paper key={post._id} sx={{ p: 2, mb: 2 }}>
            <p style={{ fontWeight: "bold", fontSize: "2.2rem" }}>
              {post.title}
            </p>
            <p style={{ marginBottom: "2rem" }}>{post.description}</p>

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

export default Wall;
