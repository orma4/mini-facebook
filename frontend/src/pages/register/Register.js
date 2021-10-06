import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { TextField } from "../../ui";
import { Button, Paper, Typography, Grid, styled } from "@mui/material";
import http from "../../axios";
import { useHistory } from "react-router-dom";
import Cookies from "universal-cookie";
import { mobile } from "../../utils/screen-sizes";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const StyledSpan = styled("span")(({ theme }) => ({
  color: theme.palette.primary.main,
}));

const StyledTitle = styled(Typography)`
  max-width: 30rem;
`;

const StyledRegisterButton = styled(Button)`
  width: 35rem;

  @media ${mobile} {
    width: 25rem;
  }
`;

export const Register = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerFormSchema),
  });
  const history = useHistory();
  const cookies = new Cookies();

  useEffect(() => {
    if (cookies.get("token")) {
      history.push("/");
    }
  });

  const onSubmit = async ({ fullName, email, password }) => {
    try {
      const { data } = await http.post("/users/register", {
        fullName,
        email,
        password,
      });

      if (data.token) {
        const dateToRemoveCookie = new Date().setTime(
          new Date().getTime() + 7 * 24 * 60 * 60 * 1000
        );

        cookies.set("token", data.token, {
          path: "/",
          expires: new Date(dateToRemoveCookie),
        });

        history.push("/");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Paper
      sx={{
        p: "5rem 2rem",
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <StyledTitle variant="h1" component="h1">
          Register to <StyledSpan>Mini-Facebook</StyledSpan>
        </StyledTitle>

        <Grid container direction="column" spacing={2}>
          <Grid item>
            <TextField
              label="Full Name"
              name="fullName"
              control={control}
              helperText={errors?.fullName?.message}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Email"
              name="email"
              control={control}
              type="email"
              helperText={errors?.email?.message}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Password"
              name="password"
              control={control}
              type="password"
              helperText={errors?.password?.message}
            />
          </Grid>
          <Grid item>
            <StyledRegisterButton type="submit" variant="contained">
              Register
            </StyledRegisterButton>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export const registerFormSchema = yup.object().shape({
  fullName: yup.string().min(2, "Required Field"),
  email: yup.string().email("Invalid email address").required("Required Field"),
  password: yup
    .string()
    .min(2, "Required Field - at least 2 characters")
    .max(20, "Maximum 20 characters long")
    .required("Required Field"),
});

export default Register;
