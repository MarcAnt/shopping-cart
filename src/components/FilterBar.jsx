import { memo, useState, useEffect } from "react";

import { Flex, Select, HStack, Text } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAllProducts,
  filterTitle,
  filtersBy,
} from "../redux/features/productsSlice";
import { addEllipses } from "../utilities";

const FilterBar = () => {
  const [filtered, setFiltered] = useState({ type: [], value: "" });

  const products = useSelector(selectAllProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(filterTitle(filtered));
  }, [filtered]);

  return (
    <HStack my={5} py={5} justifyContent="flex-end">
      <Flex
        alignItems={"center"}
        w={{ base: "100%", sm: "100%", md: "100%", lg: "65%", xl: "60%" }}
        gap={"5"}
      >
        <Text as={"span"} fontWeight={"bold"} fontSize={"lg"}>
          Filter:
        </Text>
        <Select
          variant={"solid"}
          placeholder="Description"
          color={"brand.primary"}
          _hover={{
            cursor: "pointer",
          }}
          onChange={(e) =>
            setFiltered({
              type: [filtersBy.description],
              value: e.target.value,
            })
          }
          role={"listbox"}
        >
          {Array.isArray(products) &&
            products.length &&
            products.map(({ id, description }) => (
              <option key={id} value={description}>
                {addEllipses(description.toString(), 20)}
              </option>
            ))}
        </Select>
        <Select
          variant={"solid"}
          placeholder="Title"
          color={"brand.primary"}
          _hover={{
            cursor: "pointer",
          }}
          onChange={(e) =>
            setFiltered({ type: [filtersBy.title], value: e.target.value })
          }
          role={"listbox"}
        >
          {Array.isArray(products) &&
            products.length &&
            products.map(({ id, title }) => (
              <option key={id} value={title}>
                {title}
              </option>
            ))}
        </Select>
      </Flex>
    </HStack>
  );
};

export default memo(FilterBar);
