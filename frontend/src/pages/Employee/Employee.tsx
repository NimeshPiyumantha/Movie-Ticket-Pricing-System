import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Footer from "../../components/Footer/Footer";
import EmployeeGrid from "../../components/EmployeeGrid/EmployeeGrid";

const Employee = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={6} md={8} lg={12}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: "32em",
              borderRadius: "1em",
              boxShadow: "0 0 10px rgba(0,0,0,0.5)",
            }}
          >
            <EmployeeGrid />
          </Paper>
        </Grid>
      </Grid>
      <Footer sx={{ pt: 4 }} />
    </Container>
  );
};

export default Employee;
