import { useState } from 'react';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import styles from './Register.module.css';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showErrorDiv, setShowErrorDiv] = useState(false);

  const hashPassword = (stringToHash: string): string => {
    const hashedPassword = CryptoJS.SHA256(stringToHash);
    return hashedPassword.toString(CryptoJS.enc.Hex);
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const createdUser = await axios.post('/login/register', {
        username,
        password: hashPassword(password),
      });
      if (!createdUser.data) {
        setShowErrorDiv(true);
        setTimeout(() => setShowErrorDiv(false), 4000);
      }
    } catch (error) {
      console.error('Error in the register', error);
    }
  };

  return (
    <div className={styles.body}>
      <div className={styles.registerContainer}>
        {showErrorDiv && (
          <div className={styles.errorDiv}>This username is already in use</div>
        )}
        <form onSubmit={handleRegister}>
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
            <button className={styles.registerButton} type="submit">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
