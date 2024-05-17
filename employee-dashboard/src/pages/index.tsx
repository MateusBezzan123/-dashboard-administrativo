import { useEffect, useState } from "react";
import { Box, Button, Table, Thead, Tbody, Tr, Th, Td, useToast, Spinner, Center, Heading, VStack, HStack } from "@chakra-ui/react";
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
      <VStack spacing={4} align="start">
        <HStack justify="space-between" width="100%">
          <Heading size="lg">Dashboard de Funcionários</Heading>
          <Button colorScheme="teal" onClick={() => router.push('/add-employee')}>Adicionar Funcionário</Button>
        </HStack>
        <Table variant="striped" colorScheme="teal">
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
                  <Button colorScheme="yellow" mr={2} onClick={() => router.push(`/edit-employee/${employee._id}`)}>Editar</Button>
                  <Button colorScheme="red" onClick={() => deleteEmployee(employee._id)}>Deletar</Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </VStack>
    </Box>
  );
}