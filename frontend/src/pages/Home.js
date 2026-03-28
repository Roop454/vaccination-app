import React from 'react';
import { motion } from 'framer-motion';
import { Container, Typography, Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import BubblesBg from '../components/BubblesBg';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #ff758c, #6a11cb, #2575fc)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        paddingBottom: 50
      }}
    >
      <div style={{ position: "relative" }}>

    <BubblesBg />

    <Container style={{ position: "relative", zIndex: 1 }}>
      ...
    </Container>

  </div>
      {/* 🔥 GLOW BLOBS */}
      <div className="blob blob1"></div>
      <div className="blob blob2"></div>
      <div className="blob blob3"></div>

      <Container>

        {/* HERO */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={{
            textAlign: "center",
            padding: 40,
            borderRadius: 20,
            background: "rgba(255,255,255,0.12)",
            backdropFilter: "blur(20px)",
            color: "white",
            boxShadow: "0 10px 40px rgba(0,0,0,0.3)"
          }}
        >
          <Typography variant="h3" style={{ fontWeight: "bold" }}>
            💉 Vaccination Data Analysis
          </Typography>

          <Typography style={{ marginTop: 15, opacity: 0.9 }}>
            Analyze vaccination trends, search records, and visualize insights
            with beautiful charts and real-time data.
          </Typography>

          <motion.div whileHover={{ scale: 1.1 }}>
            <Button
              variant="contained"
              onClick={() => navigate('/dashboard')}
              style={{
                marginTop: 25,
                padding: "12px 25px",
                borderRadius: 10,
                background: "linear-gradient(90deg, #00e5ff, #ff00ff)",
                boxShadow: "0 0 20px rgba(0,255,255,0.7)"
              }}
            >
              🚀 Explore Dashboard
            </Button>
          </motion.div>
        </motion.div>

        {/* FEATURES */}
        <Grid container spacing={3} style={{ marginTop: 50 }}>
          {[
            "📊 Interactive Charts",
            "🔍 Smart Search",
            "📅 Data Tracking",
            "⚡ Real-time Updates"
          ].map((item, i) => (
            <Grid item xs={12} md={3} key={i}>
              <motion.div
                whileHover={{ scale: 1.1, rotate: 2 }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                style={{
                  padding: 20,
                  borderRadius: 15,
                  background: "rgba(255,255,255,0.15)",
                  backdropFilter: "blur(10px)",
                  color: "white",
                  textAlign: "center",
                  boxShadow: "0 5px 20px rgba(0,0,0,0.2)"
                }}
              >
                {item}
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* STATS */}
        <Grid container spacing={3} style={{ marginTop: 50 }}>
          {[
            { value: "100+", label: "People Data" },
            { value: "95%", label: "Vaccinated" },
            { value: "10+", label: "Charts & Insights" }
          ].map((stat, i) => (
            <Grid item xs={12} md={4} key={i}>
              <motion.div
                whileHover={{ scale: 1.1 }}
                style={{
                  padding: 25,
                  borderRadius: 15,
                  background: "rgba(0,0,0,0.3)",
                  color: "white",
                  textAlign: "center"
                }}
              >
                <Typography variant="h4">{stat.value}</Typography>
                <Typography>{stat.label}</Typography>
              </motion.div>
            </Grid>
          ))}
        </Grid>

      </Container>
    </div>
  );
}