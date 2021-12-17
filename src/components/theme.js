import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#46a1fb",
    },
    text: {
      primary: "#000",
      secondary: "#28285a",
      accent: "#EB2C88",
      subtitle: "#42526EDB",
      grey: "#6e6e6e",
      placeholder: "#b3b3b3",
      ghost: "#D8D8D8",
      disabled: "#ededed",
      link: "#0072E5",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: 13,
        },
        contained: {
          fontWeight: "600",
          color: "#fff",
          whiteSpace: "nowrap",
          padding: "0.7em 2.5em",
        },
      },
    },
  },
  //   palette: {
  //     primary: {
  //       main: "#28285a",
  //     },
  //     secondary: {
  //       main: "#EB2C88",
  //     },
  //     active: {
  //       main: "#FFF4F9",
  //     },
  //     text: {
  //       primary: "#000",
  //       secondary: "#28285a",
  //       accent: "#EB2C88",
  //       subtitle: "#42526EDB",
  //       grey: "#6e6e6e",
  //       placeholder: "#b3b3b3",
  //       ghost: "#D8D8D8",
  //       disabled: "#ededed",
  //       link: "#0072E5",
  //     },
  //     grey: {
  //       main: "#6e6e6e",
  //     },
  //     marketplaces: {
  //       shopify: "#95be46",
  //       magento: "#ff5700",
  //       prestashop: "#2c0a47",
  //       woocommerce: "#a55692",
  //       epages: "#C50000",
  //       massive: "#714DF6",
  //     },
  //     state: {
  //       success: "#00BC71",
  //       error: "#D0021B",
  //       warning: "#FCBB3D",
  //       info: "#4949d1",
  //     },
  //     trackingStatus: {
  //       scanned: "rgb(204, 204, 204)",
  //       collected: "rgb(255, 215, 71)",
  //       delivered: "rgba(45, 202, 124, 1)",
  //       on_the_way: "rgba(71, 211, 255, 1)",
  //       incidents: "rgba(228, 17, 17)",
  //     },
  //     background: {
  //       paper: "#fff",
  //       default: "#fff",
  //       transparent: "rgba(250,250,250,0.0)",
  //     },
  //     customActive: {
  //       main: "linear-gradient(45deg, #FFF4F9 30%, #FFF4F9 90%)",
  //     },
  //     contrastThreshold: 3,
  //     tonalOffset: 0.2,
  //   },
  //   typography: {
  //     fontFamily: "Roboto",
  //     fontSize: 15,
  //     caption: {
  //       color: "#9CA6B3",
  //     },
  //   },
  //   components: {
  //     MuiButton: {
  //       styleOverrides: {
  //         root: {
  //           fontSize: 12,
  //         },
  //         outlined: {
  //           borderColor: "#28285a",
  //           fontWeight: "600",
  //           color: "#28285a",
  //           whiteSpace: "nowrap",
  //           borderRadius: 20,
  //         },
  //         contained: {
  //           borderColor: "#28285a",
  //           fontWeight: "600",
  //           color: "#fff",
  //           whiteSpace: "nowrap",
  //           padding: "0.7em 2.5em",
  //           borderRadius: "2em",
  //         },
  //       },
  //     },
  //     MuiChip: {
  //       styleOverrides: {
  //         root: {
  //           fontSize: 12,
  //         },
  //         outlined: {
  //           borderColor: "#28285a",
  //           fontWeight: "600",
  //           color: "#28285a",
  //           whiteSpace: "nowrap",
  //         },
  //       },
  //     },
  //     MuiListItemText: {
  //       styleOverrides: {
  //         root: {},
  //         primary: {
  //           fontSize: 14,
  //           fontWeight: "500",
  //         },
  //       },
  //     },
  //     MuiMenuItem: {
  //       styleOverrides: {
  //         root: {
  //           fontSize: 14,
  //           fontWeight: "500",
  //           "&:hover": {
  //             backgroundColor: "#FFF4F9",
  //           },
  //         },
  //       },
  //     },
  //     MuiListItem: {
  //       styleOverrides: {
  //         root: {
  //           "&:hover": {
  //             backgroundColor: "#FFF4F9",
  //           },
  //           "&:active": {
  //             backgroundColor: "#FFF4F9",
  //           },
  //         },
  //       },
  //     },
  //     MuiCheckbox: {
  //       styleOverrides: {
  //         root: {
  //           "&.Mui-checked": {
  //             color: "#EB2C88",
  //           },
  //         },
  //       },
  //     },
  //     MuiTableRow: {
  //       styleOverrides: {
  //         root: {
  //           "&.Mui-selected, &.Mui-selected:hover": {
  //             backgroundColor: "#FFF4F9",
  //           },
  //         },
  //       },
  //     },
  //     MuiFab: {
  //       styleOverrides: {
  //         root: {
  //           "&:hover": {
  //             backgroundColor: "#EB2C88",
  //           },
  //         },
  //       },
  //     },
  //     MuiTextField: {
  //       styleOverrides: {
  //         root: {
  //           "& input::placeholder": {
  //             fontSize: "14px",
  //           },
  //         },
  //       },
  //     },
  //   },
});

export default theme;
