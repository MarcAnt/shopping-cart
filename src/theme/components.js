// Components

const Select = {
  variants: {
    outline: {
      bg: "white",
    },
    solid: {
      bg: "white",
    },
  },
};

const Button = {
  variants: {
    solid: {
      color: "white",
      bg: "brand.secondary",
      _hover: {
        color: "white",
        bg: "brand.secondary",
      },
      _active: {
        color: "white",
        bg: "brand.secondaryDark",
      },
    },
    outline: {
      color: "brand.700",
      bg: "white",
      borderColor: "brand.700",
      focusBorderColor: "brand.primary",
      //   _hover: {
      //     borderColor: "brand.",
      //     bg: "white",
      //   },
      //   _active: {
      //     borderSize: "1px",
      //     borderColor: "brand.primary",
      //     bg: "white",
      //   },
    },

    ghost: {
      _hover: {
        bg: "transparent",
      },
      _active: {
        bg: "transparent",
      },
    },
  },
};

const Input = {
  variants: {
    solid: {
      color: "brand.primary",
    },
    outline: {
      color: "brand.primary",
    },
  },
};

export const Components = { Input, Button, Select };
