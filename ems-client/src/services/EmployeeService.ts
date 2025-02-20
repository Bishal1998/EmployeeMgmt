import axios from "axios";

interface Employee {
  firstName: string;
  lastName: string;
  email: string;
}

const REST_API_URL = "http://localhost:8080/api/employees";

const listEmployees = () => {
  return axios.get(REST_API_URL);
};

const addEmployee = (employee: Employee) => {
  return axios.post(REST_API_URL, employee);
};

const getSingleEmployee = (employeeId: number) => {
  return axios.get(`${REST_API_URL}/${employeeId}`);
};

const updateEmployee = (employee: Employee, employeeId: number) => {
  return axios.put(`${REST_API_URL}/${employeeId}`, employee);
};

const deleteEmployee = (employeeId: number) => {
  return axios.delete(`${REST_API_URL}/${employeeId}`);
};

export {
  listEmployees,
  addEmployee,
  getSingleEmployee,
  updateEmployee,
  deleteEmployee,
};
