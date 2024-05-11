// Login.js
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../app/asyncThunks";
import { login as loginAction } from "../../app/reducers/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const handleClick = async (credentials) => {
    dispatch({ type: "LOGIN_START" });

    try {
      const result = await dispatch(login(credentials));
      dispatch(loginAction(result.payload));

      navigate("/dashboard");
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE", payload: error.message });
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Box
        maxWidth="500px"
        width="100%"
        margin="auto"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Header title="LOGIN" subtitle="Enter your credentials" />

        <Formik
          onSubmit={(values) => handleClick(values)}
          initialValues={initialValues}
          validationSchema={loginSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit} style={{ width: "100%" }}>
              <TextField
                fullWidth
                variant="filled"
                type="email"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
              />
              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
              />
              <Box
                display="flex"
                justifyContent="center"
                mt="20px"
                width="100%"
              >
                <Button type="submit" color="secondary" variant="contained">
                  Login
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialValues = {
  email: "",
  password: "",
};

export default Login;
