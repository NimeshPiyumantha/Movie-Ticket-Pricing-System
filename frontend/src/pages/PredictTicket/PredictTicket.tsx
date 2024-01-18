import React, { FormEvent, useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  InputLabel,
} from "@mui/material";
import Footer from "../../components/Footer/Footer";
import { predictActions } from "../../redux/predict/predictSlice";
import { RootState, useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";

interface IPredictData {
  tickets_out: number;
  capacity: number;
  month: number;
  day: number;
}

const PredictTicket = () => {
  const [ticketsOut, setTicketsOut] = useState("");
  const [capacity, setCapacity] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");

  const ticket_price = useSelector(
    (state: RootState) => state.predictEntries.ticket_price
  );

  const dispatch = useAppDispatch();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const predictData: IPredictData = {
      tickets_out: parseInt(data.get("tickets_out") as string),
      capacity: parseInt(data.get("capacity") as string),
      month: parseInt(data.get("month") as string),
      day: parseInt(data.get("day") as string),
    };

    // Dispatch the action
    dispatch(predictActions.addPredictEntry(predictData));
  };

  const clearAll = () => {
    setTicketsOut("");
    setCapacity("");
    setMonth("");
    setDay("");
    dispatch(predictActions.clearTicketPrice());
  };

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
            <Box sx={{ mt: 3, p: 4 }} component="form" onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="tickets_out"
                    required
                    fullWidth
                    id="tickets_out"
                    label="Tickets Out"
                    value={ticketsOut}
                    onChange={(e) => setTicketsOut(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="capacity"
                    label="Capacity"
                    name="capacity"
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="month"
                    required
                    fullWidth
                    id="month"
                    label="Month"
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="day"
                    label="Day"
                    name="day"
                    value={day}
                    onChange={(e) => setDay(e.target.value)}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  p: 1,
                  fontSize: "1em",
                  fontWeight: "bold",
                }}
              >
                Predict Ticket
              </Button>
              <Button
                type="submit"
                onClick={clearAll}
                variant="contained"
                color="error"
                sx={{
                  mt: 3,
                  mb: 2,
                  p: 1,
                  ml: 2,
                  fontSize: "1em",
                  fontWeight: "bold",
                }}
              >
                Clear
              </Button>
              <Box sx={{ textAlign: "center" }}>
                <InputLabel
                  sx={{
                    mt: 3,
                    fontSize: "1em",
                    fontWeight: "bold",
                  }}
                >
                  Predicted Ticket Price
                </InputLabel>

                <TextField
                  id="ticket_price"
                  label="Ticket Price"
                  name="ticket_price"
                  disabled
                  value={"$" + ticket_price.toFixed(2)}
                  sx={{ mt: 2, fontSize: "1em" }}
                />
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      <Footer sx={{ pt: 4 }} />
    </Container>
  );
};

export default PredictTicket;
