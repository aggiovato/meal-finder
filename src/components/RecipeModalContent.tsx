import {
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  Image,
  Heading,
  Text,
  OrderedList,
  ListItem,
} from "@chakra-ui/react";
import { MealDetailsType } from "../types";

type RecipeModalContentProps = {
  data: MealDetailsType;
};

const joinIngredients = (data: MealDetailsType) => {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = data[`strIngredient${i}`];
    const measure = data[`strMeasure${i}`];

    if (ingredient !== "") {
      ingredients.push(`${ingredient} - ${measure}`);
    }
  }

  return ingredients;
};

const RecipeModalContent = ({ data }: RecipeModalContentProps) => {
  const ingredients = joinIngredients(data);
  return (
    <>
      <ModalHeader>{data.strMeal}</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Image
          width={"100%"}
          borderRadius={"lg"}
          src={data.strMealThumb}
          alt={data.strMeal}
        />
        <Heading mt={4} mb={4} size={"md"}>
          Ingredients
        </Heading>
        <OrderedList>
          {ingredients.map((i) => (
            <ListItem key={i}>{i}</ListItem>
          ))}
        </OrderedList>
        <Text whiteSpace={"pre-line"} mt={4}>
          {data.strInstructions}
        </Text>
      </ModalBody>
    </>
  );
};

export default RecipeModalContent;
