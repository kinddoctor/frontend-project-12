import axios from 'axios';

export default async function sendSignupRequest(body) {
  const {
    data: { token, username },
  } = await axios.post('/api/v1/signup', body);
  localStorage.setItem('ChattyChat token', token);
  localStorage.setItem('ChattyChat username', username);
}
