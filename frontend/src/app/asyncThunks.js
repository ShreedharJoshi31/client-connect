import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// const APIURL = "http://localhost:5000/api/";
const APIURL = "https://client-connect.onrender.com/api/";

export const login = createAsyncThunk("auth/login", async (credentials) => {
  const response = await axios.post(`${APIURL}users/login`, credentials);
  return response.data;
});

export const register = createAsyncThunk("auth/register", async (userData) => {
  const response = await axios.post(`${APIURL}users/register`, userData);
  return response.data;
});

export const getCustomers = createAsyncThunk(
  "customer/getCustomers",
  async (token) => {
    const response = await axios.get(`${APIURL}customers`, {
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
    const response = await axios.post(`${APIURL}customers`, customer, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

export const getCustomerById = createAsyncThunk(
  "customer/getCustomerById",
  async ({ id, token }) => {
    const response = await axios.get(`${APIURL}customers/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

export const updateCustomer = createAsyncThunk(
  "customer/updateCustomer",
  async ({ id, customer, token }) => {
    const response = await axios.put(`${APIURL}customers/${id}`, customer, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

export const deleteCustomer = createAsyncThunk(
  "customer/deleteCustomer",
  async ({ id, token }) => {
    await axios.delete(`${APIURL}customers/${id}`, {
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
      `${APIURL}communications/${customerId}`,
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
      `${APIURL}
      communications/${customerId}`,
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
      `${APIURL}communications`,
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
      `${APIURL}communications/send-email`,
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
