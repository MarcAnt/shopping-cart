import { memo, useState, useEffect } from "react";
import {
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";

import { BiSearchAlt2 } from "react-icons/bi";
import { filterTitle } from "../redux/features/productsSlice";

const Search = ({ placeholder, label }) => {
  const [search, setSearch] = useState({ type: [], value: "" });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(filterTitle(search));
  }, [search]);

  return (
    <Flex
      direction={"column"}
      width={{ base: "auto", md: "auto", sm: "100%", lg: "auto" }}
    >
      <Text>{label}</Text>
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<BiSearchAlt2 color="gray.300" />}
        />
        <Input
          type="text"
          placeholder={placeholder}
          bg={"white"}
          variant={"outline"}
          color={"brand.primary"}
          _placeholder={{
            color: "brand.primary",
          }}
          value={search.value}
          // onChange={(e) => setSearch({ ...search, value: e.target.value })}
          onChange={(e) =>
            setSearch({ type: ["title", "description"], value: e.target.value })
          }
          role={"searchbox"}
        />
      </InputGroup>
    </Flex>
  );
};

export default memo(Search);
