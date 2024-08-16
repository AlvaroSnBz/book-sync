import { useState } from 'react';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import styles from './Register.module.css';

type MessageType = 'Error' | 'Ok';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [messageType, setMessageType] = useState<MessageType>('Ok');
  const [message, setMessage] = useState('');
  const [isErrorDivVisible, setIsErrorDivVisible] = useState(false);

  const hashPassword = (stringToHash: string): string => {
    const hashedPassword = CryptoJS.SHA256(stringToHash);
    return hashedPassword.toString(CryptoJS.enc.Hex);
  };

  const showErrorDiv = (messageToShow: string) => {
    setMessage(messageToShow);
    setIsErrorDivVisible(true);
    setTimeout(() => setIsErrorDivVisible(false), 4000);
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const createdUser = await axios.post('/login/register', {
        username,
        email,
        password: hashPassword(password),
      });
      if (!createdUser.data.isValid) {
        setMessageType('Error');
        showErrorDiv(createdUser.data.messageError);
      } else {
        setMessageType('Ok');
        showErrorDiv(createdUser.data.messageError);
        setUsername('');
        setEmail('');
        setPassword('');
      }
    } catch (error) {
      console.error('Error in the register', error);
    }
  };

  return (
    <div className={styles.body}>
      <div className={styles.registerContainer}>
        {isErrorDivVisible && (
          <div
            className={
              messageType === 'Error'
                ? styles.errorDiv
                : styles.registerCompleteDiv
            }
          >
            {message}
          </div>
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
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
