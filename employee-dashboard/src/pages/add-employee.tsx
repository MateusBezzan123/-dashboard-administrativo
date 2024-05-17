import { useState } from "react";
import { useRouter } from "next/router";
import { Box, Button, FormControl, FormLabel, Input, useToast, VStack, Heading } from "@chakra-ui/react";

export default function AddEmployee() {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [department, setDepartment] = useState("");
  const [dateOfJoining, setDateOfJoining] = useState("");
  const toast = useToast();
  const router = useRouter();

  const handleSubmit = async () => {
    if (!name || !position || !department || !dateOfJoining) {
      toast({
        title: "Por favor, preencha todos os campos.",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    const response = await fetch("http://localhost:4000/api/employees", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, position, department, dateOfJoining }),
    });

    if (response.ok) {
      toast({
        title: "Funcionário adicionado.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      router.push("/");
    } else {
      toast({
        title: "Erro ao adicionar funcionário.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={8}>
      <VStack spacing={4} align="start">
        <Heading size="lg">Adicionar Funcionário</Heading>
        <FormControl isRequired>
          <FormLabel>Nome</FormLabel>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Cargo</FormLabel>
          <Input value={position} onChange={(e) => setPosition(e.target.value)} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Departamento</FormLabel>
          <Input value={department} onChange={(e) => setDepartment(e.target.value)} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Data de Admissão</FormLabel>
          <Input type="date" value={dateOfJoining} onChange={(e) => setDateOfJoining(e.target.value)} />
        </FormControl>
        <Button colorScheme="teal" onClick={handleSubmit}>Adicionar Funcionário</Button>
      </VStack>
    </Box>
  );
}