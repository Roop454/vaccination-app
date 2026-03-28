import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import BubblesBg from '../components/BubblesBg';
import API_BASE_URL from '../config/api';

import {
  TextField,
  Container,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  MenuItem
} from '@mui/material';

import { Bar, Pie, Line } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [ageFilter, setAgeFilter] = useState('');

  const location = useLocation();

  useEffect(() => {
    fetchUsers();
  }, [location.state]);

  const fetchUsers = async () => {
    const res = await axios.get(`${API_BASE_URL}/api/users`);
    setUsers(res.data);
  };

  const searchUser = async (value) => {
    setSearch(value);

    if (value === '') {
      fetchUsers();
      return;
    }

    const res = await axios.get(
      `${API_BASE_URL}/api/users/search/${encodeURIComponent(value)}`
    );
    setUsers(res.data);
  };

  const filteredUsers = users.filter(user => {
    if (!ageFilter) return true;
    if (ageFilter === "young") return user.age <= 30;
    if (ageFilter === "adult") return user.age > 30 && user.age <= 50;
    if (ageFilter === "senior") return user.age > 50;
    return true;
  });

  const vaccinated = filteredUsers.filter(u => u.vaccinated).length;
  const notVaccinated = filteredUsers.length - vaccinated;

  const fullyVaccinated = filteredUsers.filter(u => u.dose === "Fully Vaccinated").length;
  const partialVaccinated = filteredUsers.filter(u => u.dose === "Partially Vaccinated").length;

  const barData = {
    labels: ['Vaccinated', 'Not Vaccinated'],
    datasets: [{
      data: [vaccinated, notVaccinated],
      backgroundColor: ['#00e676', '#ff1744']
    }]
  };

  const pieData = {
    labels: ['Fully', 'Partial'],
    datasets: [{
      data: [fullyVaccinated, partialVaccinated],
      backgroundColor: ['#00e5ff', '#ff9100']
    }]
  };

  const monthlyData = {};
  filteredUsers.forEach(u => {
    const m = u.date?.split('/')[1];
    if (m) monthlyData[m] = (monthlyData[m] || 0) + 1;
  });

  const lineData = {
    labels: Object.keys(monthlyData),
    datasets: [{
      label: "Trend",
      data: Object.values(monthlyData),
      borderColor: "#ff4081",
      tension: 0.4
    }]
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      style={{
        minHeight: "100vh",
        background: "linear-gradient(270deg, #daaad7, #c59fea, #ec99e9, #dbbe88)",
        backgroundSize: "800% 800%",
        animation: "gradientMove 15s ease infinite",
        padding: "30px"
      }}
    >
      <div style={{ position: "relative" }}>

  {/* 🔥 BACKGROUND ANIMATION */}
  <BubblesBg />

  {/* 🔥 MAIN UI */}
  <motion.div style={{ position: "relative", zIndex: 1 }}>
    <Container>

      {/* TITLE */}
      <Typography
        variant="h4"
        align="center"
        style={{
          color: "white",
          fontWeight: "bold",
          textShadow: "0 0 20px rgba(255,255,255,0.8)"
        }}
      >
        Vaccination Dashboard
      </Typography>

      {/* SEARCH */}
      <TextField
        label="Search User"
        fullWidth
        value={search}
        onChange={(e) => searchUser(e.target.value)}
        sx={{
          mt: 3,
          background: "rgba(255,255,255,0.9)",
          borderRadius: 2,
          boxShadow: "0 4px 15px rgba(0,0,0,0.2)"
        }}
      />

      {/* FILTER */}
      <TextField
        select
        label="Filter Age"
        fullWidth
        value={ageFilter}
        onChange={(e) => setAgeFilter(e.target.value)}
        sx={{
          mt: 2,
          background: "rgba(255,255,255,0.9)",
          borderRadius: 2
        }}
      >
        <MenuItem value="">All</MenuItem>
        <MenuItem value="young">18-30</MenuItem>
        <MenuItem value="adult">30-50</MenuItem>
        <MenuItem value="senior">50+</MenuItem>
      </TextField>

      {/* CHARTS */}
      <Grid container spacing={3} style={{ marginTop: 20 }}>
        <Grid item xs={12} md={6}>
          <motion.div whileHover={{ scale: 1.03 }}>
            <Card style={{
              padding: 20,
              borderRadius: 20,
              background: "rgba(255,255,255,0.1)",
              backdropFilter: "blur(10px)"
            }}>
              <Bar data={barData} />
            </Card>
          </motion.div>
        </Grid>

        <Grid item xs={12} md={6}>
          <motion.div whileHover={{ scale: 1.03 }}>
            <Card style={{
              padding: 20,
              borderRadius: 20,
              background: "rgba(255,255,255,0.1)",
              backdropFilter: "blur(10px)"
            }}>
              <Pie data={pieData} />
            </Card>
          </motion.div>
        </Grid>

        <Grid item xs={12}>
          <motion.div whileHover={{ scale: 1.02 }}>
            <Card style={{
              padding: 20,
              borderRadius: 20,
              background: "rgba(255,255,255,0.1)",
              backdropFilter: "blur(10px)"
            }}>
              <Line data={lineData} />
            </Card>
          </motion.div>
        </Grid>
      </Grid>

      {/* USERS */}
      <Grid container spacing={3} style={{ marginTop: 20 }}>
        {filteredUsers.length === 0 ? (
          <Grid item xs={12}>
            <Card style={{ padding: 20, textAlign: "center" }}>
              <Typography>No user found 😢</Typography>
              <Button href="/add" style={{ marginTop: 10 }}>
                Add User
              </Button>
            </Card>
          </Grid>
        ) : (
          filteredUsers.map(u => (
            <Grid item xs={12} md={4} key={u.id}>
              <motion.div
                whileHover={{ scale: 1.08, rotateY: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Card
                  style={{
                    borderRadius: 20,
                    padding: 20,
                    background: "rgba(255,255,255,0.12)",
                    backdropFilter: "blur(15px)",
                    boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
                    color: "white",
                    position: "relative",
                    overflow: "hidden"
                  }}
                >
                  <CardContent>

                    <Typography variant="h6" style={{ fontWeight: "bold" }}>
                      {u.name}
                    </Typography>

                    <Typography>🎂 Age: {u.age}</Typography>

                    <Typography style={{
                      color: u.dose === "Fully Vaccinated"
                        ? "#00ffcc"
                        : "#ffcc00",
                      fontWeight: "bold"
                    }}>
                      💉 {u.dose}
                    </Typography>

                    <Typography style={{ opacity: 0.8 }}>
                      📅 {u.date}
                    </Typography>

                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  </motion.div>
      </div>
    </motion.div>
  );
}