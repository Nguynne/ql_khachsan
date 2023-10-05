import axios from "axios";

const URL = "https://139.180.144.147/api";
const loginService = (user) => axios.post(`${URL}/Users/authenticate`, user);

export { loginService };
