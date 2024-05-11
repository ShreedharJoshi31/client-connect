import { useEffect } from "react";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCommunicationsByCustomerId } from "../../app/asyncThunks";

const Communications = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { token } = useSelector((state) => state.auth);
  const { id } = useParams();

  // Fetch communications from Redux store
  const communications = useSelector(
    (state) => state.communication.communications
  );
  const loading = useSelector((state) => state.communication.loading);
  const error = useSelector((state) => state.communication.error);

  useEffect(() => {
    dispatch(getCommunicationsByCustomerId({ customerId: id, token: token }));
  }, [dispatch, id, token]);

  const formatDateTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    return `${dateTime.toLocaleDateString()} ${dateTime.toLocaleTimeString()}`;
  };

  const rows = communications.map((communication, index) => ({
    ...communication,
    id: index + 1,
  }));

  const columns = [
    { field: "id", headerName: "SR. NO.", flex: 0.5 },
    {
      field: "conversation",
      headerName: "Conversations",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "timestamp",
      headerName: "Time Stamp",
      flex: 1,
      valueFormatter: (params) => formatDateTime(params.value),
    },
  ];

  return (
    <Box m="20px">
      <Header
        title="COMMUNICATIONS"
        subtitle="List of Communications for Future Reference"
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

export default Communications;
