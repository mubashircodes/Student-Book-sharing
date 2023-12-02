const express = require('express');
const app = express();


app.post('/generate-token', (req, res) => {
  const temporaryToken = generateTemporaryToken();
  res.json({ token: temporaryToken });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


import React, { useState } from 'react';
import { Auth } from 'aws-amplify';

const RegisterComponent = () => {
  const [temporaryToken, setTemporaryToken] = useState('');

  const registerUser = async (username, password) => {
    try {
      await Auth.signUp({
        username,
        password,
        attributes: {
          email: 'placeholder@email.com', 
        },
      });

      const tokenResponse = await fetch('/generate-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      });

      const { token } = await tokenResponse.json();
      setTemporaryToken(token);

      console.log('User registration successful');
    } catch (error) {
      console.error('User registration error:', error);
    }
  };

  return (
    <div>
      {}
      <button onClick={() => registerUser('exampleUser', 'password')}>
        Register User
      </button>
      <p>Temporary Token: {temporaryToken}</p>
    </div>
  );
};

export default RegisterComponent;
