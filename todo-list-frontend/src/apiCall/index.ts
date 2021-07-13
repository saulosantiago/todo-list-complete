import axios from 'axios';

const composeToken = (token: String) => token ? { Authorization: `Bearer ${token}` } : {};

const apiCall = (url: String, method: any, body: any = {}, token = '') => axios({
  method,
  url: `http://localhost:3001/api${url}`,
  data: body,
  headers: {
    ...composeToken(token)
  }
});

export default apiCall;
