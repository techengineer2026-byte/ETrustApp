// src/Apis/auth.api.ts

import api from './client';

// export const loginApi = (data: {
//   email: string;
//   password: string;
// }) => api.post(ENDPOINTS.LOGIN, data);

// export const registerApi = ((data: any) =>
// {
//   console.log('registerApi called with data:', data);
//   api.post("/api/Employees", data);

// });

export const registerApi = (data: any) => {
  return api.post("/api/Employees", data);
};