import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import { Meal } from "../types";

type MealCardProps = {
  meal: Meal;
  key?: string;
  openRecipe: () => void;
};

const MealCard = ({ meal, openRecipe }: MealCardProps) => {
  return (
    <Card boxShadow={"lg"}>
      <CardBody>
        <Image src={meal.strMealThumb} alt={meal.strMeal} borderRadius="lg" />

        <Heading size="md" color={"blue.400"}>
          <Text mt={4}>{meal.strMeal}</Text>
        </Heading>
      </CardBody>
      <CardFooter pt={0}>
        <Button
          onClick={openRecipe}
          variant="solid"
          color={"white"}
          bgColor={"blue.400"}
        >
          See Recipe
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MealCard;
