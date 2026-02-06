// src/Apis/client.ts

import axios from 'axios';


axios({
  method: 'post',
  url: 'https://etapis-a9d7hkerghe4d0gn.centralindia-01.azurewebsites.net/api/Employees',
  headers: {
    'Content-Type': 'application/json',
    accept: 'text/plain',
  },
  data: {
    id: 0,
    createdBy: 0,
    updatedBy: 0,
    deletedBy: 0,
    createdOn: new Date().toISOString(),
    updatedOn: new Date().toISOString(),
    deletedOn: new Date().toISOString(),
    isActive: true,
    isApproved: true,
    name: 'Test User',
    email: 'test@mail.com',
    mobile: 1234567890,
    password: '123456',
    qualification: 'B.Tech',
    qulaifiedFrom: 'ABC College',
    qualificationStream: 'CSE',
    jobType: 'Full Time',
    isWorking: true,
    totalExperience: 1,
    jobPosition: 'Developer',
    currentCTC: 0,
    expectedCTC: 0,
    curStateID: 1,
    curCityID: 1,
    preferedCityID: 1,
    resumeFile: '',
    refFrom: '',
    jobStatus: 'New',
    etCenterID: 1,
    nearByKM: 10,
    packageID: 1,
    packageExpDate: '2026-02-05',
    postLimit: 0,
    selfStatus: 'Active',
  },
})
  .then(response => {
    console.log('✅ POST SUCCESS');
    console.log('STATUS:', response.status);
    console.log('DATA:', response.data);
  })
  .catch(error => {
    console.log('❌ POST FAILED');
    console.log('STATUS:', error.response?.status);
    console.log('ERROR:', error.response?.data || error.message);
  });

var api = axios.create({
  baseURL: 'https://etapis-a9d7hkerghe4d0gn.centralindia-01.azurewebsites.net',
  headers: {
  }
});

export default api;


