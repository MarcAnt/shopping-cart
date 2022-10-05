import React, { useState } from "react";
import { Flex } from "@chakra-ui/react";

import Search from "./Search";
import { Cart } from "./cart/Cart";

export const Header = () => {
  return (
    <Flex
      justifyContent={"space-between"}
      alignItems={"flex-end"}
      my={3}
      direction={{ base: "column", sm: "column", md: "row", lg: "row" }}
      rowGap={5}
    >
      <Search label={"Search products"} placeholder={"Ex: Red bag"} />

      <Cart />
    </Flex>
  );
};
