import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Text,
  Button,
  useToast,
} from '@chakra-ui/react';
import { useAuth } from '../hooks/useAuth';
import { api } from '../services/apiClient';

interface ModalDeleteUserProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ModalDeleteUser({
  isOpen,
  onClose,
}: ModalDeleteUserProps): JSX.Element {
  const { signOut } = useAuth();
  const toast = useToast();

  async function handleDeleteUser(): Promise<void> {
    try {
      await api.delete('/users');
      signOut();
    } catch (err) {
      toast({
        status: 'error',
        title: 'Algo deu errado!',
        description: err.response?.data.error,
      });
    }
  }
  return (
    <Modal size="xl" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader
          align="center"
          justifyContent="center"
          color="main.darkBlue"
          fontWeight="bold"
          fontSize="2xl"
        >
          Deletar Conta
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody align="center" justifyContent="center">
          <Text fontSize="xl" fontWeight="600">
            Você tem certeza que deseja deletar sua conta?
          </Text>
          <Text>
            Está ação é irreversível, você perderar todos os seus dados criados!
          </Text>
          <Button onClick={handleDeleteUser} my="8" size="lg" colorScheme="red">
            Apagar Conta
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
