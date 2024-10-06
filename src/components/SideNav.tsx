import { Heading, Link, SkeletonText, VStack } from "@chakra-ui/react";
import { Category } from "../types";

type SideNavProps = {
  categories: Category[];
  loading: boolean;
  selectedCategory: Category;
  setSelectedCategory: (category: Category) => void;
};

const selectedProps = {
  bgColor: "blue.400",
  color: "white",
  fontWeight: "bold",
};

const SideNav = ({
  loading,
  categories,
  selectedCategory,
  setSelectedCategory,
}: SideNavProps) => {
  return loading ? (
    <SkeletonText mt="1" noOfLines={8} spacing="6" skeletonHeight="2" />
  ) : (
    <>
      <Heading color={"blue.400"} fontSize={12} fontWeight={"bold"} mb={4}>
        CATEGORIES
      </Heading>

      <VStack align="stretch">
        {categories.map((c) => (
          <Link
            onClick={() => setSelectedCategory(c)}
            key={c.strCategory}
            px={2}
            py={1}
            borderRadius={5}
            _hover={{ textDecoration: "none" }}
            {...(selectedCategory.strCategory === c.strCategory &&
              selectedProps)}
          >
            {c.strCategory}
          </Link>
        ))}
      </VStack>
    </>
  );
};

export default SideNav;
