import { extendTheme } from "@chakra-ui/react";
import { Components } from "./components";

const { Input, Select, Button } = Components;

const fonts = {
  heading: "PT Sans, sans-serif",
  body: "PT Sans, sans-serif",
};

const styles = {
  global: {
    "html, body": {
      color: "#03B2C8",
      bg: "#0F1829",
    },
  },
};

const breakpoints = {
  xs: "120px",
  sm: "320px",
  md: "900px",
  lg: "1024px",
  xl: "1200px",
  "2xl": "1536px",
};

const colors = {
  brand: {
    primary: "#0F1829",
    primaryCard: "#222e44",
    secondary: "#03B2C8",
    secondaryDark: "#008191",
  },
};

export const theme = extendTheme({
  styles,
  colors,
  fonts,
  breakpoints,
  components: { Button, Select, Input },
});
