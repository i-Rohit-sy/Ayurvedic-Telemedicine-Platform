import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Container,
  Grid,
  Link,
  Typography,
  IconButton,
  Stack,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer = () => {
  const footerLinks = {
    "Quick Links": [
      { name: "Home", path: "/" },
      { name: "About Us", path: "/about" },
      { name: "Contact", path: "/contact" },
      { name: "Book Consultation", path: "/consultation" },
    ],
    "For Practitioners": [
      { name: "Join as Practitioner", path: "/register" },
      { name: "Practitioner Dashboard", path: "/dashboard" },
      { name: "Manage Availability", path: "/availability" },
    ],
    Legal: [
      { name: "Privacy Policy", path: "/privacy-policy" },
      { name: "Terms of Service", path: "/terms-of-service" },
      { name: "Cookie Policy", path: "/cookie-policy" },
    ],
  };

  const socialLinks = [
    { icon: <FacebookIcon />, url: "https://facebook.com" },
    { icon: <TwitterIcon />, url: "https://twitter.com" },
    { icon: <InstagramIcon />, url: "https://instagram.com" },
    { icon: <LinkedInIcon />, url: "https://linkedin.com" },
  ];

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "primary.main",
        color: "white",
        py: 6,
        mt: "auto",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Company Description */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              AYURVEDIC CARE
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Connecting you with experienced Ayurvedic practitioners for
              holistic healthcare through modern telemedicine solutions.
            </Typography>
            <Stack direction="row" spacing={1}>
              {socialLinks.map((social, index) => (
                <IconButton
                  key={index}
                  component="a"
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ color: "white" }}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Stack>
          </Grid>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <Grid item xs={12} sm={6} md={2} key={title}>
              <Typography variant="h6" gutterBottom>
                {title}
              </Typography>
              {links.map((link) => (
                <Link
                  key={link.name}
                  component={RouterLink}
                  to={link.path}
                  color="inherit"
                  sx={{
                    display: "block",
                    mb: 1,
                    textDecoration: "none",
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  {link.name}
                </Link>
              ))}
            </Grid>
          ))}

          {/* Contact Information */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2" paragraph>
              Email: support@ayurvediccare.com
            </Typography>
            <Typography variant="body2" paragraph>
              Phone: +91 123 456 7890
            </Typography>
            <Typography variant="body2">
              Address: 123 Wellness Street,
              <br />
              New Delhi, India
            </Typography>
          </Grid>
        </Grid>

        {/* Copyright */}
        <Typography
          variant="body2"
          align="center"
          sx={{ mt: 4, borderTop: "1px solid rgba(255, 255, 255, 0.1)", pt: 2 }}
        >
          © {new Date().getFullYear()} Ayurvedic Care. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
