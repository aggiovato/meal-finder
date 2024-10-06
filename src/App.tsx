// THIS IS LAYOUT COMPONENT

import { Grid, GridItem, useDisclosure } from "@chakra-ui/react";
import Header from "./components/Header";
import SideNav from "./components/SideNav";
import MainContent from "./components/MainContent";
import { Category, Meal, MealDetailsType, SearchFormType } from "./types";
import useHttpData from "./hooks/useHttpData";
import { useState } from "react";
import axios from "axios";
import RecipeModal from "./components/RecipeModal";
import useFetch from "./hooks/useFetch";

const baseUrl = "https://www.themealdb.com/api/json/v1/1/";
const url = `${baseUrl}list.php?c=list`;
const makeMealUrl = (category: Category) =>
  `${baseUrl}filter.php?c=${category.strCategory}`;

const defaultCategory = {
  strCategory: "Beef",
};

const App = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [selectedCategory, setSelectedCategory] =
    useState<Category>(defaultCategory);

  const { loading, data } = useHttpData<Category>(url);

  const {
    loading: loadingMeal,
    data: dataMeal,
    setData: setMeals,
    setLoading: setLoadingMeal,
  } = useHttpData<Meal>(makeMealUrl(defaultCategory));

  const searchApi = (searchForm: SearchFormType) => {
    setLoadingMeal(true);
    const url = `${baseUrl}search.php?s=${searchForm.search}`;
    axios
      .get<{ meals: Meal[] }>(url)
      .then(({ data }) => setMeals(data.meals))
      .finally(() => setLoadingMeal(false));
  };

  const {
    fetch,
    loading: loadingMealDetails,
    data: mealDetailsData,
  } = useFetch<MealDetailsType>();

  const searchMealDetails = (meal: Meal) => {
    onOpen();
    fetch(`${baseUrl}lookup.php?i=${meal.idMeal}`);
  };

  return (
    <>
      <Grid
        templateAreas={`"header header"
                  "nav main"`}
        gridTemplateRows={"60px 1fr"}
        gridTemplateColumns={{ sm: `0 1fr`, md: `250px 1fr` }}
        fontSize={14}
      >
        <GridItem
          zIndex={1}
          boxShadow={"lg"}
          bg={"white"}
          pos={"sticky"}
          top={0}
          pl="2"
          area={"header"}
        >
          <Header onSubmit={searchApi} />
        </GridItem>
        <GridItem
          pos={"sticky"}
          top={"60px"}
          left={0}
          p="5"
          area={"nav"}
          height={"calc(100vh - 60px)"}
          overflowY={"auto"}
        >
          <SideNav
            categories={data}
            loading={loading}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </GridItem>
        <GridItem p="4" bg="gray.100" area={"main"}>
          <MainContent
            openRecipe={searchMealDetails}
            loading={loadingMeal}
            meals={dataMeal}
          />
        </GridItem>
      </Grid>

      <RecipeModal
        data={mealDetailsData}
        isOpen={isOpen}
        onClose={onClose}
        loading={loadingMealDetails}
      />
    </>
  );
};

export default App;
