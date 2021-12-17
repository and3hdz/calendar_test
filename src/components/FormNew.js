import React, { useState } from "react";

import {
  Box,
  Divider,
  TextField,
  Typography,
  Paper,
  Stack,
  IconButton,
  Button,
} from "@mui/material";
import { toast } from "react-toastify";

import CloseIcon from "@mui/icons-material/Close";
import moment from "moment";
import "moment/locale/es";

moment.locale("es");

const inputStyles = {
  mb: 2,
};

const initialValues = {
  name: "",
  email: "",
  phone: "",
};

export default function FormNew({
  userApointments,
  setUserApointments,
  saveAppointments,
}) {
  const [newData, setNewData] = useState(initialValues);

  const handleAdd = () => {
    if (newData.name === "" || newData.email === "" || newData.phone === "") {
      toast.error("Completa el formulario", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return false;
    }

    saveAppointments();
    setNewData(initialValues);
  };

  const generateInputProps = (name) => ({
    value: newData[name],
    onChange: (e) => {
      setNewData({ ...newData, [name]: e.target.value });
    },
  });

  const handleDelete = (deleteItem) => {
    setUserApointments(
      userApointments.filter((item) => {
        return !moment(item).isSame(deleteItem, "minutes");
      })
    );
  };

  const renderAppointments = () => {
    // const

    return userApointments
      .sort((a, b) => (a < b ? -1 : 1))
      .map((item, index) => {
        return (
          <Paper
            key={`appointment-${index}`}
            sx={{ bosShadow: 1, pt: 1, pb: 1, pl: 2, pr: 2, mb: 1 }}
          >
            <Stack
              direction="row"
              alignItems={"center"}
              justifyContent="space-between"
            >
              <Typography variant="body1">
                {moment(item).format("dddd, DD MMMM YYYY, HH:mm")}
              </Typography>
              <IconButton
                aria-label="delete"
                onClick={() => handleDelete(item)}
              >
                <CloseIcon />
              </IconButton>
            </Stack>
          </Paper>
        );
      });
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5">¡Bienvenido!</Typography>
      <Typography variant="body2" mt={1} mb={3}>
        Completa el formulario y selecciona tu citas en el calendario. Puedes
        agendar hasta 2 citas por semana y solo 1 por día.
      </Typography>
      <Divider />
      {/* FORM NEW APPOINTMENT */}
      <Box mt={3}>
        <TextField
          {...generateInputProps("name")}
          id="patient-name"
          label="Nombre completo"
          type="text"
          variant="standard"
          fullWidth
          sx={inputStyles}
        />
        <TextField
          {...generateInputProps("email")}
          id="patient-email"
          label="Correo eléctronico"
          type="email"
          variant="standard"
          fullWidth
          sx={inputStyles}
        />
        <TextField
          {...generateInputProps("phone")}
          id="patient-phone"
          label="Teléfono de contacto"
          type="tel"
          variant="standard"
          inputProps={{ maxLength: 10 }}
          fullWidth
          sx={inputStyles}
        />
        <Typography variant="subtitle2" sx={{ mb: 2, mt: 3 }}>
          Citas seleccioadas:
        </Typography>

        {renderAppointments()}

        <Stack alignItems={"flex-end"} sx={{ mt: 4 }}>
          <Button
            variant="contained"
            onClick={handleAdd}
            disabled={userApointments.length === 0}
          >
            Agendar cita{userApointments.length > 1 ? "s" : ""}
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
