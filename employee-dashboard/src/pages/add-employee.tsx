import { useState } from "react";
import { useRouter } from "next/router";
import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";

export default function AddEmployee() {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [department, setDepartment] = useState("");
  const [dateOfJoining, setDateOfJoining] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    const response = await fetch("http://localhost:4000/api/employees", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, position, department, dateOfJoining }),
    });

    if (response.ok) {
      router.push("/");
    }
  };

  return (
    <Box>
      <FormControl>
        <FormLabel>Name</FormLabel>
        <Input value={name} onChange={(e) => setName(e.target.value)} />
      </FormControl>
      <FormControl>
        <FormLabel>Position</FormLabel>
        <Input value={position} onChange={(e) => setPosition(e.target.value)} />
      </FormControl>
      <FormControl>
        <FormLabel>Department</FormLabel>
        <Input value={department} onChange={(e) => setDepartment(e.target.value)} />
      </FormControl>
      <FormControl>
        <FormLabel>Date of Joining</FormLabel>
        <Input type="date" value={dateOfJoining} onChange={(e) => setDateOfJoining(e.target.value)} />
      </FormControl>
      <Button onClick={handleSubmit}>Add Employee</Button>
    </Box>
  );
}