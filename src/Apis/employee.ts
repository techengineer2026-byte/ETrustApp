// src/Apis/employee.ts

import api from './client';
// import { ENDPOINTS } from './endpoints';

export const atEmployeeApi = () =>
  api.get("/employee");

