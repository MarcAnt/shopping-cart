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
import { filtersBy, filterTitle } from "../redux/features/productsSlice";
import { debounce } from "@/utilities/index";

const filters = Object.keys(filtersBy);

const Search = ({ placeholder, label }) => {
  const [search, setSearch] = useState({
    type: filters,
    value: "",
  });

  const dispatch = useDispatch();

  const handleSearch = debounce((e) => {
    setSearch({ type: filters, value: e.target.value });
  }, 1000);

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
          onChange={handleSearch}
          role={"searchbox"}
        />
      </InputGroup>
    </Flex>
  );
};

export default memo(Search);
