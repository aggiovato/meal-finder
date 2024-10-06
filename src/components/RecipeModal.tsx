import {
  Button,
  Modal,
  ModalContent,
  ModalFooter,
  ModalOverlay,
} from "@chakra-ui/react";
import RecipeModalSkeleton from "./RecipeModalSkeleton";
import { MealDetailsType } from "../types";
import RecipeModalContent from "./RecipeModalContent";

type RecipeModalProps = {
  isOpen: boolean;
  onClose: () => void;
  loading: boolean;
  data: MealDetailsType | undefined;
};

const RecipeModal = ({ isOpen, onClose, loading, data }: RecipeModalProps) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          {loading ? (
            <RecipeModalSkeleton />
          ) : (
            data && <RecipeModalContent data={data} />
          )}
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default RecipeModal;
