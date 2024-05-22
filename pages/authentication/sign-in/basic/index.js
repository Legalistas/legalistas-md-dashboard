import { useState } from "react";

import Link from "next/link";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

// NextJS Material Dashboard 2 PRO components
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import MDInput from "/components/MDInput";
import MDButton from "/components/MDButton";

// Authentication layout components
import BasicLayout from "/pagesComponents/authentication/components/BasicLayout";
import { useAuth } from "../../../../context/AuthContext";

// Images
import bgImage from "/assets/images/bg-sign-in-basic.jpeg";
import { button } from "/assets/theme-dark/components/button";
import Api from "../../../../services/api";
import { useRouter } from "next/router";

function Basic() {
  const [rememberMe, setRememberMe] = useState(false);
  const { setUser } = useAuth();
  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const { push } = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const resp = await Api.post("/login", { email, password }); // Enviar datos de inicio de sesión al backend
      if (resp.status === 200) {
        const { user, token } = resp.data;
        localStorage.setItem("token", token); // Guardar el token en localStorage
        setUser(user); // Establecer el usuario en el contexto de autenticación
        push("/dashboards/analytics"); // Redirigir al usuario a la página de perfil
        console.log(user, token);
      }
    } catch (error) {
      // Manejar errores de inicio de sesión
      console.log(error);
    }
  };

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="dark"
          borderRadius="lg"
          coloredShadow="dark"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
          <Grid
            container
            spacing={3}
            justifyContent="center"
            sx={{ mt: 1, mb: 2 }}
          >
            <Grid item xs={2}>
              <MDTypography
                component={MuiLink}
                href="#"
                variant="body1"
                color="white"
              >
                <FacebookIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography
                component={MuiLink}
                href="#"
                variant="body1"
                color="white"
              >
                <GitHubIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography
                component={MuiLink}
                href="#"
                variant="body1"
                color="white"
              >
                <GoogleIcon color="inherit" />
              </MDTypography>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                label="Email"
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                label="Password"
                fullWidth
              />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton
                variant="gradient"
                color="dark"
                fullWidth
                onClick={handleSubmit}
              >
                sign in
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <Link href="/authentication/sign-up/cover">
                  <MDTypography
                    variant="button"
                    color="dark"
                    fontWeight="medium"
                    textGradient
                  >
                    Sign up
                  </MDTypography>
                </Link>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
