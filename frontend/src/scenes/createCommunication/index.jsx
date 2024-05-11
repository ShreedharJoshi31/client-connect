// EditForm.js
import { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { createCommunication } from "../../app/asyncThunks";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const EditForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const { id } = useParams();

  const handleFormSubmit = async (values) => {
    try {
      const response = await dispatch(
        createCommunication({
          customerId: id,
          conversation: values.conversation,
          timestamp: values.timestamp,
          token: token,
        })
      );
      navigate(`/comms/${id}`);
      console.log("Communication created successfully!");
    } catch (error) {
      console.error("Error creating communication:", error);
    }
  };

  return (
    <Box m="20px">
      <Header
        title="CREATE COMMUNICATION"
        subtitle="Create Communication Details"
      />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={{
          conversation: "",
          timestamp: "",
        }}
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
                multiline
                rows={4}
                variant="filled"
                type="text"
                label="Conversation"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.conversation}
                name="conversation"
                error={!!touched.conversation && !!errors.conversation}
                helperText={touched.conversation && errors.conversation}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="datetime-local"
                label="Timestamp"
                InputLabelProps={{
                  shrink: true,
                }}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.timestamp}
                name="timestamp"
                error={!!touched.timestamp && !!errors.timestamp}
                helperText={touched.timestamp && errors.timestamp}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create Communication
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  conversation: yup.string().required("required"),
  timestamp: yup.string().required("required"),
});

export default EditForm;
