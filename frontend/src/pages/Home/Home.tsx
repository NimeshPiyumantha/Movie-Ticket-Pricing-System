import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Chart from "../../components/Chart/Chart";
import Deposits from "../../components/Income/Income";
import Footer from "../../components/Footer/Footer";
import Orders from "../../components/Orders/Orders";

const Home = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Chart */}
        <Grid item xs={12} md={8} lg={9}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 240,
              borderRadius: "1em",
              boxShadow: "0 0 10px rgba(0,0,0,0.5)",
            }}
          >
            <Chart />
          </Paper>
        </Grid>
        {/* Recent Deposits */}
        <Grid item xs={12} md={4} lg={3}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 240,
              borderRadius: "1em",
              boxShadow: "0 0 10px rgba(0,0,0,0.5)",
            }}
          >
            <Deposits />
          </Paper>
        </Grid>
        {/* Recent Orders */}
        <Grid item xs={12}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              borderRadius: "1em",
              boxShadow: "0 0 10px rgba(0,0,0,0.5)",
            }}
          >
            <Orders />
          </Paper>
        </Grid>
      </Grid>
      <Footer sx={{ pt: 4 }} />
    </Container>
  );
};

export default Home;
