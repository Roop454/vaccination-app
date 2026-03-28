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

export default function AddUser() {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!name.trim()) return alert("Enter name");

    await axios.post(`${API_BASE_URL}/api/users`, { name });

    alert("User added ✅");
    navigate('/dashboard');
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #d18c97, #753faf, #b1ee37)",
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

      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card style={{
          padding: 30,
          width: 400,
          borderRadius: 20,
          background: "rgba(255,255,255,0.15)",
          backdropFilter: "blur(20px)",
          boxShadow: "0 10px 40px rgba(0,0,0,0.3)"
        }}>
          <CardContent>

            <Typography variant="h4" align="center">
              Add Person 💉
            </Typography>

            <motion.div whileFocus={{ scale: 1.03 }}>
              <TextField
                label="Enter Name"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ marginTop: 20 }}
              />
            </motion.div>

            <motion.div whileHover={{ scale: 1.1 }}>
              <Button
                variant="contained"
                fullWidth
                onClick={handleSubmit}
                style={{
                  marginTop: 25,
                  background: "linear-gradient(90deg, #00e5ff, #ff00ff)",
                  boxShadow: "0 0 20px rgba(0,255,255,0.7)"
                }}
              >
                ADD USER 🚀
              </Button>
            </motion.div>

          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}