import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { TextField, Autocomplete } from "../../ui";
import { Button } from "@mui/material";
import http from "../../axios";
import { useDebounce } from "../../hooks";
// import * as yup from 'yup';
// import { yupResolver } from '@hookform/resolvers/yup';
// import

export const Wall = () => {
  const [posts, setPosts] = useState([]);
  // const [selectedUser, setSelectedUser] = useState();
  const [usersOptions, setUsersOptions] = useState([]);
  const {
    control,
    handleSubmit,
    reset,
    watch,
    // formState: { errors },
  } = useForm();
  const searchFieldValue = watch("test");
  const debouncedUsersValue = useDebounce(searchFieldValue, 1000);

  useEffect(() => {
    // Fetch all posts
    const getAllPosts = async () => {
      try {
        const response = await http.get("/posts");
        setPosts(response?.data);
      } catch (error) {
        console.log(error);
      }
    };

    getAllPosts();
  }, []);

  useEffect(() => {
    const findUsers = async () => {
      try {
        const response = await http.post("/users/search", {
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
    }
  }, [debouncedUsersValue]);

  const onSubmit = async ({ title, description }) => {
    try {
      const response = await http.post("/posts/create", { title, description });

      if (response.status === 200) {
        // Add the new post to state for re-render the page with the new post after submit
        setPosts([...posts, response.data]);
        reset({ title: "", description: "" });
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      {/* <Autocomplete name='test' control={control} options={usersOptions} /> */}

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField label="Title" name="title" control={control} />
        <TextField label="Description" name="description" control={control} />
        <Button type="submit" variant="contained">
          Create Post
        </Button>
      </form>

      {posts.map((post) => {
        const likesLength = post.likes.length;

        return (
          <div key={post._id}>
            <p>{post.author}</p>
            <p>{post.title}</p>
            <p>{post.description}</p>
            <p>{likesLength > 0 && likesLength}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Wall;
