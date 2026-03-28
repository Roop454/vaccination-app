import React, { useState } from 'react';
import axios from 'axios';
import BubblesBg from '../components/BubblesBg';
import API_BASE_URL from '../config/api';

import {
  Container,
  TextField,
  Button,
  Typography,
  Card,
  CardContent
} from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await axios.post(
      `${API_BASE_URL}/api/auth/login`,
      { email, password }
    );

    localStorage.setItem("token", res.data.token);
    navigate('/dashboard');
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #6c5d60, #81e0a8, #9d34ca)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>

      <div style={{ position: "relative" }}>

    <BubblesBg />

    <Container style={{ position: "relative", zIndex: 1 }}>
      ...
    </Container>

  </div>

      <motion.div initial={{ opacity: 0, y: 80 }} animate={{ opacity: 1, y: 0 }}>
        <Card style={{
          padding: 30,
          width: 400,
          borderRadius: 20,
          background: "rgba(255,255,255,0.15)",
          backdropFilter: "blur(20px)"
        }}>
          <CardContent>

            <Typography variant="h4" align="center">
              Login 🔐
            </Typography>

            <TextField
              label="Email"
              fullWidth
              onChange={(e) => setEmail(e.target.value)}
              style={{ marginTop: 20 }}
            />

            <TextField
              label="Password"
              type="password"
              fullWidth
              onChange={(e) => setPassword(e.target.value)}
              style={{ marginTop: 20 }}
            />

            <motion.div whileHover={{ scale: 1.1 }}>
              <Button
                variant="contained"
                fullWidth
                onClick={handleLogin}
                style={{
                  marginTop: 25,
                  background: "linear-gradient(90deg, #00e5ff, #ff00ff)"
                }}
              >
                LOGIN 🚀
              </Button>
            </motion.div>

          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}