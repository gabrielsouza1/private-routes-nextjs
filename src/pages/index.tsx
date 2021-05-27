import { useContext, useRef, useState } from 'react';
import { AuthContext } from '../contexts/auth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login } = useContext(AuthContext);

  function handleLogin() {
    login({ email, password });
  }

  return (
    <div>
      <input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="button" onClick={handleLogin}>Login</button>
    </div>
  );
}
