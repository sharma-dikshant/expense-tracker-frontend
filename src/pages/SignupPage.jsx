import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Link,
  Alert,
  IconButton,
  InputAdornment,
} from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { signup } from "../services/authApi";
import toast from "react-hot-toast";

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.passwordConfirm
    ) {
      setError("Please fill in all fields");
      return;
    }

    if (formData.password !== formData.passwordConfirm) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await signup(formData);
      //TODO refactor the api response in the backend to use api responjse class
      toast.success(`welcome! ${res.data.data?.user.name}`);
      localStorage.setItem("token", res.data.token);
      navigate("/app");
    } catch (error) {
      toast.error("Error in signup");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Box sx={{ mb: 3 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/")}
          sx={{ mb: 2 }}
        >
          Back to Home
        </Button>
      </Box>

      <Paper sx={{ p: 4 }}>
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography
            variant="h4"
            component="h1"
            sx={{ fontWeight: 600, mb: 1 }}
          >
            Create Account
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Sign up to start tracking your expenses
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            margin="normal"
            required
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
            required
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            margin="normal"
            required
            sx={{ mb: 2 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword((prev) => !prev)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            label="Confirm Password"
            name="passwordConfirm"
            type={showPasswordConfirm ? "text" : "password"}
            value={formData.passwordConfirm}
            onChange={handleChange}
            margin="normal"
            required
            sx={{ mb: 3 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPasswordConfirm((prev) => !prev)}
                    edge="end"
                  >
                    {showPasswordConfirm ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            sx={{ mb: 3 }}
          >
            Create Account
          </Button>

          <Box sx={{ textAlign: "center" }}>
            <Typography variant="body2" color="text.secondary">
              Already have an account?{" "}
              <Link
                component="button"
                variant="body2"
                onClick={() => navigate("/login")}
                sx={{ textDecoration: "none" }}
              >
                Sign in
              </Link>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default SignupPage;
