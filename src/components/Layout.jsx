import React from "react";
import { Box, Container } from "@chakra-ui/react";
import { Header } from "./Header";
import { Footer } from "./Footer";

export const Layout = ({ children }) => {
  return (
    <Container
      maxWidth="container.xl"
      alignSelf="center"
      height="100%"
      paddingX={5}
      bgPosition="center"
      bgRepeat="repeat"
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Box w={"100%"}>
        <Header />
        <Box as={"main"}>{children}</Box>
        <Footer />
      </Box>
    </Container>
  );
};
