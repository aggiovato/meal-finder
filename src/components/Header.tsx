import {
  Button,
  Container,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { IoMdSearch } from "react-icons/io";
import { SearchFormType } from "../types";

type HeaderProps = {
  onSubmit: (data: SearchFormType) => void;
};

const Header = ({ onSubmit }: HeaderProps) => {
  const { register, formState, handleSubmit } = useForm<SearchFormType>();
  return (
    <Container maxW={"3xl"} mt={2}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <IoMdSearch color="gray" />
          </InputLeftElement>
          <Input
            mr={2}
            focusBorderColor={
              /* eslint-disable no-extra-boolean-cast */
              !!formState.errors.search ? "crimson" : "blue.400"
              /* eslint-disable no-extra-boolean-cast */
            }
            isInvalid={!!formState.errors.search}
            {...register("search", { required: true })}
            type="text"
            placeholder="Try with 'chicken' or 'beans'..."
          />

          <Button type="submit" color={"white"} bgColor={"blue.400"}>
            Search
          </Button>
        </InputGroup>
      </form>
    </Container>
  );
};

export default Header;
