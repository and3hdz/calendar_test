import React, { useEffect, useState } from "react";

import { createWeek, isSelected } from "../helpers/dates";
import { Grid, IconButton, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import moment from "moment";
import AppointmentBox from "./AppointmentBox";
import { toast } from "react-toastify";

export default function Week({
  userApointments,
  setUserApointments,
  appointments,
}) {
  const [numOfWeek, setNumOfWeek] = useState(1);
  const [datesOfWeek, setDaysOfWeek] = useState([]);
  const [hours, setHours] = useState([]);

  useEffect(() => {
    createHours();
  }, []);

  useEffect(() => {
    setDaysOfWeek(createWeek(numOfWeek));
  }, [numOfWeek]);

  const nextWeek = () => {
    setNumOfWeek(numOfWeek + 1);
  };
  const prevWeek = () => {
    setNumOfWeek(numOfWeek - 1);
  };

  const createHours = () => {
    const hours = [];
    let hour = 8;

    for (hour; hour <= 18; hour++) {
      hours.push({
        fullHour: `${hour}:00`,
        hour: hour,
        minutes: 0,
      });
      hours.push({
        fullHour: `${hour}:30`,
        hour: hour,
        minutes: 30,
      });
    }

    setHours(hours);
  };

  const handleSelect = (day, hour) => {
    const newDataA = moment(day.date).set({
      hours: hour.hour,
      minutes: hour.minutes,
      seconds: 0,
    });

    let next = userApointments;

    // same day, hour and minutes
    const overlappingMinutes = userApointments.some((item) => {
      return moment(item).isSame(newDataA, "minutes");
    });

    // delete if exist
    if (overlappingMinutes) {
      return setUserApointments(
        userApointments.filter((item) => {
          return !moment(item).isSame(newDataA, "minutes");
        })
      );
    }

    // max 1 per day
    const overlappingDay = next.some((item) => {
      return moment(item).isSame(newDataA, "days");
    });

    if (overlappingDay) {
      next = userApointments.filter((item) => {
        return !moment(item).isSame(newDataA, "days");
      });
    }

    const appointmentWeek = newDataA.isoWeeks();

    const sameWeek = next.filter(
      (item) => moment(item).isoWeeks() === appointmentWeek
    );

    if (sameWeek.length === 2) {
      toast.error("Solo puedes agendar 2 citas por semana", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return false;
    }

    setUserApointments([...next, newDataA.toDate()]);
  };

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between">
        <Stack direction="row">
          <Stack alignItems={"center"} sx={{ mr: 3}}>
            <Box
              sx={{
                bgcolor: "divider",
                width: 15,
                height: 15,
                borderRadius: 10,
              }}
            ></Box>
            <Typography variant="subtitle2">Día inhabil</Typography>
          </Stack>

          <Stack alignItems={"center"} sx={{ mr: 3}}>
            <Box
              sx={{
                bgcolor: "#ff5252",
                width: 15,
                height: 15,
                borderRadius: 10,
              }}
            ></Box>
            <Typography variant="subtitle2">Descanso</Typography>
          </Stack>

          <Stack alignItems={"center"} sx={{ mr: 3}}>
            <Box
              sx={{
                bgcolor: "#01579b",
                width: 15,
                height: 15,
                borderRadius: 10,
              }}
            ></Box>
            <Typography variant="subtitle2">Cita ocupada</Typography>
          </Stack>

          <Stack alignItems={"center"} sx={{ mr: 3}}>
            <Box
              sx={{
                bgcolor: "#4db6ac",
                width: 15,
                height: 15,
                borderRadius: 10,
              }}
            ></Box>
            <Typography variant="subtitle2">Cita disponible</Typography>
          </Stack>

          <Stack alignItems={"center"} sx={{ mr: 3}}>
            <Box
              sx={{
                bgcolor: "#448aff",
                width: 15,
                height: 15,
                borderRadius: 10,
              }}
            ></Box>
            <Typography variant="subtitle2">Selección</Typography>
          </Stack>
        </Stack>
        <Stack direction="row" justifyContent="flex-end">
          <IconButton aria-label="previous" onClick={prevWeek}>
            <NavigateBeforeIcon fontSize="large" />
          </IconButton>
          <IconButton
            aria-label="reset"
            onClick={() => {
              setNumOfWeek(1);
            }}
          >
            <FiberManualRecordIcon fontSize="small" />
          </IconButton>
          <IconButton aria-label="next" onClick={nextWeek}>
            <NavigateNextIcon fontSize="large" />
          </IconButton>
        </Stack>
      </Stack>
      {/* NAME DAYS ROW */}
      <Grid container columns={16}>
        <Grid item xs={2} />
        {datesOfWeek.map((item) => {
          return (
            <Grid
              key={`day-${item.date.format("dddd-mm")}`}
              item
              xs={2}
              sx={{ bgcolor: item.active ? "white" : "divider" }}
            >
              <DayBox day={item} />
            </Grid>
          );
        })}
      </Grid>
      <Grid container columns={16}>
        {/* HOURS COLUMN */}
        <Grid item xs={2}>
          <Grid container direction="column" colums={22}>
            {hours.map((item, i) => {
              return <HourTitleBox key={`titleHour-${i}`} data={item} />;
            })}
          </Grid>
        </Grid>
        {/* HOURS/DAY COLUMN */}
        {datesOfWeek.map((day) => {
          return (
            <Grid key={`hour-${day.date.format("dddd-mm")}`} item xs={2}>
              {hours.map((hour, hIndex) => {
                return (
                  <AppointmentBox
                    appointments={appointments}
                    userApointments={userApointments}
                    handleSelect={handleSelect}
                    key={hIndex}
                    day={day}
                    hour={hour}
                  />
                );
              })}
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}

const DayBox = ({ day }) => {
  return (
    <Box
      sx={{
        border: "1px solid",
        borderColor: "divider",
        p: 2,
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Typography
        variant="subtitle1"
        color="text.grey"
        fontWeight="bold"
        sx={{ textTransform: "capitalize" }}
      >
        {day.date.format("ddd DD")}
      </Typography>
    </Box>
  );
};

const HourTitleBox = ({ data }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: "1px solid",
        borderColor: "divider",
        textAlign: "center",
        height: 35,
        userSelect: "none",
      }}
    >
      <Typography>{data.fullHour}</Typography>
    </Box>
  );
};
