import React, { useState } from "react";
import {
  Box,
  Button,
  Heading,
  HStack,
  Image,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";
import { isSameDay } from "date-fns";
import { currencyFormat, transformedDate } from "../utilities";

import { useSelector, useDispatch } from "react-redux";
import { addToCart, getMaxQuantity } from "../redux/features/cartSlice";

export const CardItem = ({ product }) => {
  const today = new Date();
  const compareDays = isSameDay(today, new Date(product.date));
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();
  const maxQuantity = useSelector(getMaxQuantity);

  const handleAddItems = () => {
    dispatch(addToCart({ product, quantity }));
  };

  return (
    <Box
      bg={"brand.primaryCard"}
      borderRadius={5}
      borderColor={"whiteAlpha.300"}
      borderWidth={"0.5px"}
      overflow={"hidden"}
      maxW="400px"
    >
      <Image
        src={product.image}
        width={"100%"}
        height="200px"
        objectFit={"cover"}
        alt={product.name}
        role={"img"}
      />

      <Box p={5}>
        <Heading as="h3" size="md" color={"white"} mb={5} role={"heading"}>
          {product.title}
        </Heading>

        <Text color={"white"}>{product.description}</Text>
        <HStack
          color={"white"}
          fontWeight={"bold"}
          justifyContent={"space-between"}
          mt={3}
        >
          <Text fontSize={"xl"}>{currencyFormat(product.price)} </Text>
          <Text fontSize={"xl"}>
            {transformedDate(product.date, "dd/MM/yyyy")}
          </Text>
        </HStack>
        <Stack my={5}>
          <Select
            variant={"solid"}
            placeholder="Add Quantity"
            color={"brand.primary"}
            onChange={(e) => setQuantity(Number(e.target.value))}
          >
            {Array.from({ length: maxQuantity }, (v, i) => i + 1).map((op) => (
              <option key={op} value={`${op}`}>
                {op}
              </option>
            ))}
          </Select>

          <Button
            variant={"solid"}
            textTransform={"uppercase"}
            onClick={handleAddItems}
            isDisabled={!compareDays}
          >
            Add to Cart +
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};
