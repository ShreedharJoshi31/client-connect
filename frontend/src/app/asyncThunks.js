import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// const APIURL = "http://localhost:5000/api/";
const APIURL = "https://client-connect.onrender.com/";

export const login = createAsyncThunk("auth/login", async (credentials) => {
  const response = await axios.post(`${APIURL}users/login`, credentials);
  return response.data;
});

export const register = createAsyncThunk("auth/register", async (userData) => {
  const response = await axios.post(`${APIURL}users/register`, userData);
  return response.data;
});

export const getCustomers = createAsyncThunk(
  `${APIURL}customer/getCustomers`,
  async (token) => {
    const response = await axios.get("customers", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

export const addCustomer = createAsyncThunk(
  `${APIURL}customer/addCustomer`,
  async ({ customer, token }) => {
    const response = await axios.post("customers", customer, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

export const getCustomerById = createAsyncThunk(
  `${APIURL}customer/getCustomerById`,
  async ({ id, token }) => {
    const response = await axios.get(`customers/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

export const updateCustomer = createAsyncThunk(
  `${APIURL}customer/updateCustomer`,
  async ({ id, customer, token }) => {
    const response = await axios.put(`customers/${id}`, customer, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

export const deleteCustomer = createAsyncThunk(
  `${APIURL}customer/deleteCustomer`,
  async ({ id, token }) => {
    await axios.delete(`customers/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return id;
  }
);

export const createCommunication = createAsyncThunk(
  `${APIURL}communication/createCommunication`,
  async ({ customerId, conversation, timestamp, token }) => {
    const response = await axios.post(
      `communications/${customerId}`,
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
  `${APIURL}communication/getCommunicationsByCustomerId`,
  async ({ customerId, token }) => {
    const response = await axios.get(`communications/${customerId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

export const createCommunicationsForAllCustomers = createAsyncThunk(
  `${APIURL}communication/createCommunicationsForAllCustomers`,
  async ({ conversation, timestamp, token }) => {
    const response = await axios.post(
      "communications",
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
  `${APIURL}communication/sendEmail`,
  async ({ subject, content, token }) => {
    const response = await axios.post(
      "communications/send-email",
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
