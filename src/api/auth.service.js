import axios from 'axios';
import { setData, setError } from '../redux/store/authSlice';

export default async function sendAuthRequest(dispatch, { username, password }, autorize) {
  try {
    const {
      data: { token },
    } = await axios.post('/api/v1/login', { username, password });
    localStorage.setItem('tokenJWT', token);
    dispatch(setData({ username, token }));
    autorize();
  } catch (error) {
    dispatch(setError(error.response.statusText));
    throw error;
  }
}
