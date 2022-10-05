import React from "react";
import { Heading, HStack, Text, Box, Button, Image } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { removeItem } from "../../redux/features/cartSlice";
import { currencyFormat } from "../../utilities";

export const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const hanldeRemoveItem = (id) => {
    dispatch(removeItem(id));
  };

  return (
    <Box my={2} bg={"gray.100"} p={5} borderRadius={5}>
      <Heading as={"h3"} size={"md"}>
        {item.title}
      </Heading>
      <Image
        src={item.image}
        width={"100%"}
        height={"100px"}
        objectFit={"contain"}
        alt={item.title}
      />
      <HStack justifyContent={"space-between"}>
        <HStack>
          <Text fontWeight={"bold"}>Quantity: {item.quantity}</Text>
          <Text fontWeight={"bold"}>
            Unit Price: {currencyFormat(item.price)}
          </Text>
        </HStack>
        <Text fontWeight={"bold"}>
          {/* Total: €{(item.quantity * item.price).toFixed(2)} */}
          Total: {currencyFormat(item.quantity * item.price)}
        </Text>
        {/* <Text fontWeight={"bold"}>Price: €15.99</Text>
        <Text fontWeight={"bold"}>Total: €31.98</Text> */}
      </HStack>
      <Button onClick={() => hanldeRemoveItem(item.id)} role={"button"}>
        Remove
      </Button>
    </Box>
  );
};
