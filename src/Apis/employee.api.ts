// src/Apis/employee.api.ts

import api from './client';
export const getEmployeeApi = () =>
  api.get("/employee");
