import axios from 'axios';
import { setCredentials, setError } from '../redux/store/authSlice';

export default async function sendAuthRequest(
  dispatch,
  { username, password },
  autorize,
) {
  try {
    const { data } = await axios.post('/api/v1/login', { username, password });
    localStorage.setItem('tokenJWT', data.token);
    dispatch(setCredentials(data));
    autorize();
  } catch (error) {
    dispatch(setError(error.response.statusText));
    throw error;
  }
}
