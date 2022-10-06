import React, { useEffect } from "react";
import {
  Box,
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

import { BsFillCartPlusFill, BsCart } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { CartItem } from "./CartItem";
import {
  calculateTotals,
  clearCart,
  getItems,
  getQuantities,
  getTotal,
} from "@/redux/features/cartSlice";
import { currencyFormat } from "@/utilities";

export const Cart = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const total = useSelector(getTotal);
  const items = useSelector(getItems);
  const totalQuantity = useSelector(getQuantities);

  const openCart = () => {
    onOpen();
  };

  const handleclearCart = () => {
    dispatch(clearCart());
  };

  useEffect(() => {
    dispatch(calculateTotals());
  }, [items]);

  return (
    <>
      <Button
        rightIcon={<BsFillCartPlusFill />}
        variant={"solid"}
        onClick={() => openCart()}
        width={{ base: "100%", md: "auto", sm: "100%", lg: "auto" }}
        role={"button"}
      >
        {totalQuantity > 0 && (
          <Box
            mr={2}
            rounded={"full"}
            h={5}
            w={5}
            bg={"red.500"}
            color={"white"}
            fontSize={"sm"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            textAlign={"center"}
            data-testid="cart-counter"
          >
            {totalQuantity}
          </Box>
        )}
        Shopping Cart
      </Button>

      <Drawer
        onClose={onClose}
        isOpen={isOpen}
        size={{ base: "sm", md: "full", sm: "md", lg: "sm" }}
      >
        <DrawerOverlay />
        <DrawerContent color={"brand.primary"}>
          <DrawerCloseButton />
          <DrawerHeader>Your Shopping Cart</DrawerHeader>

          <DrawerBody>
            <Divider orientation="horizontal" />

            <HStack
              alignItems={"center"}
              justifyContent={"space-between"}
              my={5}
            >
              <HStack>
                <Text fontSize={"lg"}>Items: {items.length}</Text>
                <Text fontSize={"lg"}>Quantities: {totalQuantity}</Text>
              </HStack>
              <Text fontSize={"lg"} as={"strong"}>
                Total: {currencyFormat(total)}
              </Text>
            </HStack>

            {totalQuantity > 0 && (
              <HStack>
                <Button
                  rightIcon={<BsCart />}
                  variant={"solid"}
                  onClick={() => handleclearCart()}
                  w={"full"}
                  role={"button"}
                >
                  Clear Cart
                </Button>
              </HStack>
            )}

            <Divider orientation="horizontal" />

            {items.length ? (
              items.map((item, idx) => <CartItem key={idx} item={item} />)
            ) : (
              <Text textAlign={"center"} fontSize={"2xl"} my={5}>
                Hi! Your shopping cart is empty. Please, add some products.
              </Text>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
