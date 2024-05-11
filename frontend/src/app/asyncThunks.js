import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk("auth/login", async (credentials) => {
  const response = await axios.post(
    "http://localhost:5000/api/users/login",
    credentials
  );
  return response.data;
});

export const getCustomers = createAsyncThunk(
  "customer/getCustomers",
  async (token) => {
    const response = await axios.get("http://localhost:5000/api/customers", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

export const addCustomer = createAsyncThunk(
  "customer/addCustomer",
  async ({ customer, token }) => {
    const response = await axios.post(
      "http://localhost:5000/api/customers",
      customer,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);

export const getCustomerById = createAsyncThunk(
  "customer/getCustomerById",
  async ({ id, token }) => {
    const response = await axios.get(
      `http://localhost:5000/api/customers/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);

export const updateCustomer = createAsyncThunk(
  "customer/updateCustomer",
  async ({ id, customer, token }) => {
    const response = await axios.put(
      `http://localhost:5000/api/customers/${id}`,
      customer,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);

export const deleteCustomer = createAsyncThunk(
  "customer/deleteCustomer",
  async ({ id, token }) => {
    await axios.delete(`http://localhost:5000/api/customers/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return id;
  }
);

export const createCommunication = createAsyncThunk(
  "communication/createCommunication",
  async ({ customerId, conversation, timestamp, token }) => {
    const response = await axios.post(
      `http://localhost:5000/api/communications/${customerId}`,
      { conversation, timestamp },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);

export const getCommunicationsByCustomerId = createAsyncThunk(
  "communication/getCommunicationsByCustomerId",
  async ({ customerId, token }) => {
    const response = await axios.get(
      `http://localhost:5000/api/communications/${customerId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);

export const createCommunicationsForAllCustomers = createAsyncThunk(
  "communication/createCommunicationsForAllCustomers",
  async ({ conversation, timestamp, token }) => {
    const response = await axios.post(
      "http://localhost:5000/api/communications",
      { conversation, timestamp },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);

export const sendEmail = createAsyncThunk(
  "communication/sendEmail",
  async ({ subject, content, token }) => {
    const response = await axios.post(
      "http://localhost:5000/api/communications/send-email",
      { subject, content },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);
