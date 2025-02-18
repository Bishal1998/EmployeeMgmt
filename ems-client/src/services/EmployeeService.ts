import axios from "axios";

const REST_API_URL = "http://localhost:8080/api/employees";

const listEmployees = () => {
  return axios.get(REST_API_URL);
};

export default listEmployees;
