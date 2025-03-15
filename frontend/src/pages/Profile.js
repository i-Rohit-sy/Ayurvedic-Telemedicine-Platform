import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Alert,
  Paper,
  Grid,
  Avatar,
  Divider,
} from "@mui/material";
import { Person as PersonIcon } from "@mui/icons-material";
import { updateProfile } from "../store/slices/authSlice";

const validationSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  phoneNumber: yup
    .string()
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
  address: yup.string().required("Address is required"),
  specialization: yup.string().when("role", {
    is: "practitioner",
    then: yup.string().required("Specialization is required"),
  }),
  experience: yup.number().when("role", {
    is: "practitioner",
    then: yup
      .number()
      .min(0, "Experience must be a positive number")
      .required("Experience is required"),
  }),
});

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const formik = useFormik({
    initialValues: {
      name: user?.name || "",
      email: user?.email || "",
      phoneNumber: user?.phoneNumber || "",
      address: user?.address || "",
      specialization: user?.specialization || "",
      experience: user?.experience || "",
      role: user?.role || "user",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await dispatch(updateProfile(values)).unwrap();
        if (response.success) {
          setSuccess("Profile updated successfully");
          setError("");
        }
      } catch (err) {
        setError(err.message || "An error occurred while updating profile");
        setSuccess("");
      }
    },
    enableReinitialize: true,
  });

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  return (
    <Container component="main" maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Avatar
            sx={{
              m: 1,
              bgcolor: "primary.main",
              width: 80,
              height: 80,
            }}
          >
            <PersonIcon sx={{ fontSize: 40 }} />
          </Avatar>
          <Typography component="h1" variant="h4">
            Profile
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}

        <Box component="form" onSubmit={formik.handleSubmit} noValidate>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="name"
                label="Full Name"
                name="name"
                autoComplete="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="phoneNumber"
                label="Phone Number"
                name="phoneNumber"
                autoComplete="tel"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.phoneNumber &&
                  Boolean(formik.errors.phoneNumber)
                }
                helperText={
                  formik.touched.phoneNumber && formik.errors.phoneNumber
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                disabled
                id="role"
                label="Role"
                name="role"
                value={
                  formik.values.role === "user" ? "Patient" : "Practitioner"
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="address"
                label="Address"
                name="address"
                multiline
                rows={3}
                value={formik.values.address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
              />
            </Grid>
            {formik.values.role === "practitioner" && (
              <>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="specialization"
                    label="Specialization"
                    name="specialization"
                    value={formik.values.specialization}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.specialization &&
                      Boolean(formik.errors.specialization)
                    }
                    helperText={
                      formik.touched.specialization &&
                      formik.errors.specialization
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="experience"
                    label="Years of Experience"
                    name="experience"
                    type="number"
                    value={formik.values.experience}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.experience &&
                      Boolean(formik.errors.experience)
                    }
                    helperText={
                      formik.touched.experience && formik.errors.experience
                    }
                  />
                </Grid>
              </>
            )}
          </Grid>

          <Box sx={{ mt: 4, textAlign: "center" }}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{ minWidth: 200 }}
            >
              Update Profile
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Profile;
