import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { format } from "date-fns";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConsultations = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/consultations`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await response.json();
        setConsultations(data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching consultations:", error);
        setLoading(false);
      }
    };

    fetchConsultations();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "scheduled":
        return "primary";
      case "in-progress":
        return "warning";
      case "completed":
        return "success";
      case "cancelled":
        return "error";
      default:
        return "default";
    }
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={3}
          >
            <Typography variant="h4">Welcome, {user?.name}</Typography>
            {user?.role === "patient" && (
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate("/book-consultation")}
              >
                Book New Consultation
              </Button>
            )}
          </Box>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              {user?.role === "patient"
                ? "Your Consultations"
                : "Upcoming Consultations"}
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Date & Time</TableCell>
                    <TableCell>
                      {user?.role === "patient" ? "Practitioner" : "Patient"}
                    </TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {consultations.map((consultation) => (
                    <TableRow key={consultation._id}>
                      <TableCell>
                        {format(new Date(consultation.scheduledTime), "PPp")}
                      </TableCell>
                      <TableCell>
                        {user?.role === "patient"
                          ? consultation.practitioner.name
                          : consultation.patient.name}
                      </TableCell>
                      <TableCell>{consultation.type}</TableCell>
                      <TableCell>
                        <Chip
                          label={consultation.status}
                          color={getStatusColor(consultation.status)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() =>
                            navigate(`/consultation/${consultation._id}`)
                          }
                          disabled={consultation.status === "cancelled"}
                        >
                          {consultation.status === "scheduled"
                            ? "Join"
                            : "View"}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
            <Typography variant="h6" gutterBottom>
              Quick Stats
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Paper elevation={1} sx={{ p: 2, textAlign: "center" }}>
                  <Typography variant="h4">
                    {
                      consultations.filter((c) => c.status === "scheduled")
                        .length
                    }
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Upcoming
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper elevation={1} sx={{ p: 2, textAlign: "center" }}>
                  <Typography variant="h4">
                    {
                      consultations.filter((c) => c.status === "completed")
                        .length
                    }
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Completed
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Paper>

          {user?.role === "practitioner" && (
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Availability
              </Typography>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => navigate("/manage-availability")}
              >
                Manage Schedule
              </Button>
            </Paper>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
