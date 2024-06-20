import React, { useState } from 'react';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import styles from './Login.module.css';

interface LoginProps {
  setIsLogged: (option: boolean) => void;
}
export default function LoginComponent({ setIsLogged }: LoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const hashPassword = (stringToHash: string): string => {
    const hashedPassword = CryptoJS.SHA256(stringToHash);
    return hashedPassword.toString(CryptoJS.enc.Hex);
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post('/login/login', {
        username,
        password: hashPassword(password),
      });
      setIsLogged(response.data);
      if (response.data) {
        localStorage.setItem('username', username);
      }
    } catch (error) {
      console.error('Error logging in', error);
    }
  };

  return (
    <div className={styles.body}>
      <div className={styles.loginContainer}>
        <form onSubmit={handleLogin}>
          <div className={styles.inputGroup}>
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className={styles.loginButton} type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
