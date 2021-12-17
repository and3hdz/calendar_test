import React, { useState, useEffect } from "react";
import { Grid, Box } from "@mui/material";

import Container from "../components/Container";
import FormNew from "../components/FormNew";
import Week from "../components/Week";
import { toast } from "react-toastify";

import { createInitialAppointments } from "../helpers/dates";

export default function CalendarView() {
  const [appointments, setAppointments] = useState([]);
  const [userApointments, setUserApointments] = useState([]);

  useEffect(() => {
    const initial = createInitialAppointments();

    setAppointments(initial);
  }, []);

  const saveAppointments = () => {
    setAppointments([...appointments, ...userApointments]);
    setUserApointments([]);

    toast.success("Citas agendadas", {
      position: "top-right",
      autoClose: 2300,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <Container>
      <Grid container sx={{ height: "100%" }}>
        <Grid item xs={12} sm={7} md={8}>
          <Box sx={{ width: "100%", height: "100%" }}>
            <Week
              appointments={appointments}
              setUserApointments={setUserApointments}
              userApointments={userApointments}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={5} md={4}>
          <FormNew
            userApointments={userApointments}
            setUserApointments={setUserApointments}
            saveAppointments={saveAppointments}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
