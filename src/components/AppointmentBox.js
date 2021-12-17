import { Box } from "@mui/material";
import React, { useMemo } from "react";
import {
  isActiveHour,
  isBetweenLunch,
  isSelected,
  isBusy,
} from "../helpers/dates";

export default function AppointmentBox({
  day,
  hour,
  handleSelect,
  userApointments,
  appointments,
}) {
  const activeHour = useMemo(() => {
    return isActiveHour(day, hour);
  }, [day, hour]);

  const busyHour = useMemo(() => {
    return isBusy(day, hour, appointments);
  }, [day, hour, appointments]);

  const cursorType = () => {
    if (busyHour) {
      return "initial";
    }

    if (activeHour) {
      return "pointer";
    }

    return "initial";
  };

  const bgColor = () => {
    if (!day.active) {
      return "divider";
    }

    if (busyHour) {
      return "#01579b";
    }

    if (isSelected(day, hour, userApointments)) {
      return "#448aff";
    }

    if (isBetweenLunch(day, hour)) {
      return "#ff5252";
    }

    if (activeHour) {
      return "#4db6ac";
    }

    return "divider";
  };

  const select = () => {
    if (activeHour && !isBetweenLunch(day, hour) && !busyHour) {
      handleSelect(day, hour);
    }
  };

  return (
    <Box
      onClick={select}
      sx={{
        height: 35,
        border: "1px solid",
        borderColor: "divider",
        textAlign: "center",
        cursor: cursorType(),
        bgcolor: bgColor(),
      }}
    ></Box>
  );
}
