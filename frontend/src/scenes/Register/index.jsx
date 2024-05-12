// Login.js
import { Box, Button, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { login, register } from "../../app/asyncThunks";
import { login as loginAction } from "../../app/reducers/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const handleClick = async (credentials) => {
    try {
      const result = await dispatch(register(credentials));
      navigate("/login");
    } catch (error) {
      console.error("Error creating customer:", error);
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
        textAlign="center"
      >
        <Header title="Register" subtitle="Enter your credentials" />

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
                type="text"
                label="Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="name"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
              />
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
                  Register
                </Button>
              </Box>
            </form>
          )}
        </Formik>
        <Typography variant="body1" mt={2}>
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            style={{ textDecoration: "none", color: "red", cursor: "pointer" }}
          >
            Login here
          </span>
        </Typography>
      </Box>
    </Box>
  );
};

const loginSchema = yup.object().shape({
  name: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialValues = {
  name: "",
  email: "",
  password: "",
};

export default Login;
