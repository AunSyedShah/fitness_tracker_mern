import axios from "axios";

// get token from local storage with validation
const token = localStorage.getItem("token");
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

export default axios;