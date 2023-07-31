import { useState } from 'react';
import { useRouter } from 'next/router';

//import db from '/db/databse';


export default function login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();


  const login = async (e) => {
    e.preventDefault();

    try {
      
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        alert('User logged in successfully!');
        // Add code to redirect or show a success message to the user
      } else {
        alert('login failed.');
        // Add code to show an error message to the user
      }
      
      return router.push('/')
    } catch (err) {
      alert('Error during login:', err);
      // Add code to show an error message to the user
    }
  };

  return (
    <form onSubmit={login}>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
}