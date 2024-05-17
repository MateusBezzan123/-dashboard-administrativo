import { useEffect, useState } from "react";
import { Box, Button, Table, Thead, Tbody, Tr, Th, Td, useToast, Spinner, Center, Heading, VStack, HStack, IconButton } from "@chakra-ui/react";
import { AddIcon, EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";

interface Employee {
  _id: string;
  name: string;
  position: string;
  department: string;
  dateOfJoining: string;
}

export default function Home() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    fetch("http://localhost:4000/api/employees")
      .then((res) => res.json())
      .then((data) => {
        setEmployees(data);
        setLoading(false);
      });
  }, []);

  const deleteEmployee = async (id: string) => {
    const response = await fetch(`http://localhost:4000/api/employees/${id}`, { method: 'DELETE' });
    if (response.ok) {
      setEmployees(employees.filter(e => e._id !== id));
      toast({
        title: "Funcionário deletado.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Erro ao deletar funcionário.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  if (loading) {
    return (
      <Center height="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    <Box p={8}>
      <VStack spacing={4} align="start" width="full">
        <HStack justify="space-between" width="full">
          <Heading size="lg">Dashboard de Funcionários</Heading>
          <Button colorScheme="teal" leftIcon={<AddIcon />} onClick={() => router.push('/add-employee')}>
            Adicionar Funcionário
          </Button>
        </HStack>
        <Table variant="simple" colorScheme="teal" width="full">
          <Thead>
            <Tr>
              <Th>Nome</Th>
              <Th>Cargo</Th>
              <Th>Departamento</Th>
              <Th>Ações</Th>
            </Tr>
          </Thead>
          <Tbody>
            {employees.map((employee) => (
              <Tr key={employee._id}>
                <Td>{employee.name}</Td>
                <Td>{employee.position}</Td>
                <Td>{employee.department}</Td>
                <Td>
                  <HStack spacing={2}>
                    <IconButton
                      colorScheme="yellow"
                      aria-label="Editar funcionário"
                      icon={<EditIcon />}
                      onClick={() => router.push(`/edit-employee/${employee._id}`)}
                    />
                    <IconButton
                      colorScheme="red"
                      aria-label="Deletar funcionário"
                      icon={<DeleteIcon />}
                      onClick={() => deleteEmployee(employee._id)}
                    />
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </VStack>
    </Box>
  );
}