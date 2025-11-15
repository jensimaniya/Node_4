import axios from 'axios';
const API = axios.create({ baseURL: 'http://localhost:8090/api' });
API.interceptors.request.use(config=>{
  const sid = localStorage.getItem('sessionId');
  if(sid) config.headers.Authorization = 'Session ' + sid;
  return config;
});
export default API;
