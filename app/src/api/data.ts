import axios from 'axios';
import { URI } from '../constants/constants';
import { rowType } from '../constants/types';

// create bank account
export const createAccount = async (data: rowType) => {
  const config = {
    timeout: 5000,
  };
  return await axios
    .post(`${URI}/api/bank-account`, data, config)
    .then((res) => res.data);
};

// get an account
export const getAccount = async (id: number) => {
  const config = {
    timeout: 5000,
  };
  return await axios
    .get(`${URI}/api/bank-account/${id}`, config)
    .then((res) => res.data);
};

// get accounts
export const getAccounts = async () => {
  const config = {
    timeout: 5000,
  };
  return await axios
    .get(`${URI}/api/bank-account`, config)
    .then((res) => res.data);
};

// update bank account
export const updateAccount = async (data: rowType) => {
  const config = {
    timeout: 5000,
  };
  return await axios
    .put(`${URI}/api/bank-account`, data, config)
    .then((res) => res.data);
};

// delete bank account
export const deleteAccount = async (id: number) => {
  const config = {
    timeout: 5000,
  };
  return await axios
    .delete(`${URI}/api/bank-account/${id}`, config)
    .then((res) => res.data);
};
