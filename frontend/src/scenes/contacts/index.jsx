import { useEffect } from "react";
import { Box, Button, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCommentIcon from "@mui/icons-material/AddComment";
import ChatIcon from "@mui/icons-material/Chat";
import EmailIcon from "@mui/icons-material/Email";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { deleteCustomer, getCustomers } from "../../app/asyncThunks";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

const Contacts = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  // Fetch contacts from Redux store
  const contacts = useSelector((state) => state.customer.customers);
  const loading = useSelector((state) => state.customer.loading);
  const error = useSelector((state) => state.customer.error);

  useEffect(() => {
    dispatch(getCustomers(token));
  }, []);

  const rows = contacts.map((communication, index) => ({
    ...communication,
    id: index + 1,
  }));

  const columns = [
    { field: "id", headerName: "SR. NO.", flex: 0.5 },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "gstNo",
      headerName: "GST No.",
      flex: 1,
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1,
    },
    {
      field: "communicationCount",
      headerName: "No. of automated reminders",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <div>
          <IconButton aria-label="edit" size="small">
            <EditIcon
              fontSize="inherit"
              onClick={() => handleEdit(params.row._id)}
            />
          </IconButton>
          <IconButton
            aria-label="delete"
            size="small"
            onClick={() => handleDelete(params.row._id)}
          >
            <DeleteIcon fontSize="inherit" />
          </IconButton>

          <IconButton aria-label="conversations" size="small">
            <ChatIcon
              fontSize="inherit"
              onClick={() => handleShowCommunications(params.row._id)}
            />
          </IconButton>
          <IconButton aria-label="conversations" size="small">
            <AddCommentIcon
              fontSize="inherit"
              onClick={() => handleCreateCommunications(params.row._id)}
            />
          </IconButton>
        </div>
      ),
    },
  ];

  const handleShowCommunications = (customerId) => {
    navigate(`/comms/${customerId}`);
  };

  const handleCreateCommunications = (customerId) => {
    navigate(`/createComms/${customerId}`);
  };

  const handleEdit = (customerId) => {
    navigate(`/update/${customerId}`);
  };

  const handleDelete = async (id) => {
    await dispatch(deleteCustomer({ id: id, token: token }));
    dispatch(getCustomers(token));
  };

  return (
    <Box m="20px">
      <Header
        title="CONTACTS"
        subtitle="List of Contacts for Future Reference"
      />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <Box
          display="flex"
          justifyContent="end"
          mt="20px"
          mr="10px"
          width="100%"
        >
          <Button
            color="secondary"
            variant="contained"
            onClick={() => {
              navigate("/sendEmail");
            }}
            style={{ marginRight: "10px" }}
          >
            <EmailIcon />
            Send Email
          </Button>
          <Button
            color="secondary"
            variant="contained"
            onClick={() => {
              navigate("/form");
            }}
          >
            <AddIcon />
            Create contact
          </Button>
        </Box>
        <DataGrid
          rows={rows}
          columns={columns}
          loading={loading}
          error={error}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Contacts;
