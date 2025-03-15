import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Avatar,
  Paper,
  Rating,
} from "@mui/material";
import {
  LocalHospital as LocalHospitalIcon,
  VideoCall as VideoCallIcon,
  Assignment as AssignmentIcon,
  FormatQuote as FormatQuoteIcon,
} from "@mui/icons-material";

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <LocalHospitalIcon sx={{ fontSize: 40 }} />,
      title: "Expert Ayurvedic Practitioners",
      description:
        "Connect with experienced Ayurvedic doctors who provide personalized care and treatment plans.",
    },
    {
      icon: <VideoCallIcon sx={{ fontSize: 40 }} />,
      title: "Video Consultations",
      description:
        "Convenient online consultations from the comfort of your home with secure video calling.",
    },
    {
      icon: <AssignmentIcon sx={{ fontSize: 40 }} />,
      title: "Digital Prescriptions",
      description:
        "Receive detailed prescriptions and treatment plans directly through our platform.",
    },
  ];

  const testimonials = [
    {
      name: "Rahul Sharma",
      role: "Patient",
      image: "https://source.unsplash.com/random/100x100/?man",
      rating: 5,
      text: "The Ayurvedic consultation was incredibly helpful. The practitioner took time to understand my concerns and provided a holistic treatment plan.",
    },
    {
      name: "Priya Patel",
      role: "Patient",
      image: "https://source.unsplash.com/random/100x100/?woman",
      rating: 5,
      text: "I love how convenient it is to connect with Ayurvedic experts from home. The video consultations are smooth and the prescriptions are detailed.",
    },
    {
      name: "Dr. Amit Kumar",
      role: "Ayurvedic Practitioner",
      image: "https://source.unsplash.com/random/100x100/?doctor",
      rating: 5,
      text: "This platform helps me reach more patients and provide better care. The digital prescription system is particularly useful.",
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: "primary.main",
          color: "white",
          py: 8,
          textAlign: "center",
        }}
      >
        <Container>
          <Typography variant="h2" component="h1" gutterBottom>
            Ayurvedic Telemedicine Platform
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom>
            Connect with Ayurvedic practitioners online and receive personalized
            care
          </Typography>
          <Box sx={{ mt: 4 }}>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={() => navigate("/register")}
              sx={{ mr: 2 }}
            >
              Get Started
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              size="large"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container sx={{ py: 8 }}>
        <Typography variant="h3" component="h2" align="center" gutterBottom>
          Our Features
        </Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  p: 3,
                }}
              >
                <Box sx={{ color: "primary.main", mb: 2 }}>{feature.icon}</Box>
                <CardContent>
                  <Typography variant="h5" component="h3" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* How It Works Section */}
      <Box sx={{ bgcolor: "grey.100", py: 8 }}>
        <Container>
          <Typography variant="h3" component="h2" align="center" gutterBottom>
            How It Works
          </Typography>
          <Grid container spacing={4} sx={{ mt: 2 }}>
            <Grid item xs={12} md={4}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image="https://source.unsplash.com/random/400x200/?ayurveda"
                  alt="Register"
                />
                <CardContent>
                  <Typography variant="h5" component="h3" gutterBottom>
                    1. Register
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Create your account and complete your health profile.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image="https://source.unsplash.com/random/400x200/?doctor"
                  alt="Book Consultation"
                />
                <CardContent>
                  <Typography variant="h5" component="h3" gutterBottom>
                    2. Book Consultation
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Choose an Ayurvedic practitioner and schedule your
                    consultation.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image="https://source.unsplash.com/random/400x200/?medicine"
                  alt="Receive Treatment"
                />
                <CardContent>
                  <Typography variant="h5" component="h3" gutterBottom>
                    3. Receive Treatment
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Get personalized treatment plans and follow up with your
                    practitioner.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Container sx={{ py: 8 }}>
        <Typography variant="h3" component="h2" align="center" gutterBottom>
          What Our Users Say
        </Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          {testimonials.map((testimonial, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardContent>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Avatar
                      src={testimonial.image}
                      alt={testimonial.name}
                      sx={{ width: 56, height: 56, mr: 2 }}
                    />
                    <Box>
                      <Typography variant="h6" component="div">
                        {testimonial.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {testimonial.role}
                      </Typography>
                      <Rating
                        value={testimonial.rating}
                        readOnly
                        size="small"
                      />
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex", mb: 2 }}>
                    <FormatQuoteIcon
                      sx={{ fontSize: 40, color: "primary.main", mr: 1 }}
                    />
                    <Typography variant="body1" color="text.secondary">
                      {testimonial.text}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Call to Action Section */}
      <Box sx={{ bgcolor: "secondary.main", color: "white", py: 8 }}>
        <Container>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={8}>
              <Typography variant="h3" component="h2" gutterBottom>
                Ready to Experience Ayurvedic Care?
              </Typography>
              <Typography variant="h6" gutterBottom>
                Join thousands of users who trust our platform for their
                holistic health needs.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4} sx={{ textAlign: "center" }}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() => navigate("/register")}
                sx={{ px: 4, py: 2, fontSize: "1.2rem" }}
              >
                Get Started Now
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
