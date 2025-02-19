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

export { listEmployees, addEmployee };
