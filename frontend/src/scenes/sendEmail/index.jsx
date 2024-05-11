// EditForm.js
import { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import {
  createCommunication,
  createCommunicationsForAllCustomers,
  sendEmail,
} from "../../app/asyncThunks";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const SendEmail = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (values) => {
    try {
      setLoading(true);
      const { subject, content } = values;
      const timestamp = new Date().toISOString(); // Timestamp for the communication
      await dispatch(
        createCommunicationsForAllCustomers({
          conversation: `Subject:${subject} Content:${content}`, // Use content as conversation
          timestamp,
          token,
        })
      );
      await dispatch(
        sendEmail({ subject: subject, content: content, token: token })
      );
      setLoading(false);
      navigate("/contacts"); // Redirect after creating communications
    } catch (error) {
      console.error("Error sending email: ", error);
      setLoading(false);
    }
  };

  return (
    <>
      <Box m="20px">
        <Header
          title="SEND EMAIL"
          subtitle="Send Emails to all the contacts "
        />

        <Formik
          onSubmit={handleFormSubmit}
          initialValues={{
            subject: "",
            content: "",
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
                  rows={1}
                  variant="filled"
                  type="text"
                  label="Subject"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.subject}
                  name="subject"
                  error={!!touched.subject && !!errors.subject}
                  helperText={touched.subject && errors.subject}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  variant="filled"
                  type="text"
                  label="Content"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.content}
                  name="content"
                  error={!!touched.content && !!errors.content}
                  helperText={touched.content && errors.content}
                  sx={{ gridColumn: "span 4" }}
                />
              </Box>
              <Box display="flex" justifyContent="end" mt="20px">
                <Button type="submit" color="secondary" variant="contained">
                  Send Email
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </>
  );
};

const checkoutSchema = yup.object().shape({
  subject: yup.string().required("required"),
  content: yup.string().required("required"),
});

export default SendEmail;
