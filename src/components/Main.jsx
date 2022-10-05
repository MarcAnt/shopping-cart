import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { SimpleGrid, Text } from "@chakra-ui/react";
import { CardItem } from "./CardItem";
import FilterBar from "./FilterBar";
import {
  fetchProducts,
  getProductsStatus,
  getProductsError,
  LIMIT_PRODUCTS,
  getFilteredProducts,
  filtersBy,
} from "@/redux/features/productsSlice";

export const Main = () => {
  const dispatch = useDispatch();
  const productStatus = useSelector(getProductsStatus);
  const error = useSelector(getProductsError);
  const filterProducts = useSelector(getFilteredProducts);

  useEffect(() => {
    if (productStatus === "idle") {
      dispatch(fetchProducts(LIMIT_PRODUCTS));
    }
  }, [productStatus, dispatch]);

  if (productStatus === "loading") {
    return <Text textAlign={"center"}>Loading products...</Text>;
  }

  if (productStatus === "error") {
    return <Text textAlign={"center"}>{error}</Text>;
  }

  return (
    <>
      <FilterBar />

      <SimpleGrid
        minChildWidth={{ base: "100%", sm: "400px", md: "400px" }}
        spacing={5}
        justifyItems={"center"}
        alignItems={"start"}
      >
        {filterProducts
          .slice()
          .sort((a, b) => a[filtersBy.title].localeCompare(b[filtersBy.title]))
          .map((product, idx) => (
            <CardItem key={idx} product={product} />
          ))}
      </SimpleGrid>
    </>
  );
};
