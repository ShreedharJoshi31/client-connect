// Form.js
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { addCustomer } from "../../app/asyncThunks";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  console.log(token);

  const handleFormSubmit = async (values) => {
    try {
      const response = await dispatch(
        addCustomer({ customer: values, token: token })
      );
      navigate("/contacts");
      console.log("Customer created successfully!");
    } catch (error) {
      console.error("Error creating customer:", error);
    }
  };

  return (
    <Box m="20px">
      <Header title="CREATE CONTACT" subtitle="Create a New contact" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
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
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Contact Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.phone}
                name="phone"
                error={!!touched.phone && !!errors.phone}
                helperText={touched.phone && errors.phone}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Address"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address}
                name="address"
                error={!!touched.address && !!errors.address}
                helperText={touched.address && errors.address}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="GST No."
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.gstNo}
                name="gstNo"
                error={!!touched.gstNo && !!errors.gstNo}
                helperText={touched.gstNo && errors.gstNo}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New User
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  name: yup.string().required("required"),
  phone: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  email: yup.string().email("invalid email").required("required"),
  address: yup.string().required("required"),
  gstNo: yup.string().required("required"),
});
const initialValues = {
  name: "",
  phone: "",
  email: "",
  address: "",
  gstNo: "",
};

export default Form;
