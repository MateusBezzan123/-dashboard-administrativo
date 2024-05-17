import { useEffect, useState } from "react";
import { Box, Button, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
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
  const router = useRouter();

  useEffect(() => {
    fetch("http://localhost:4000/api/employees")
      .then((res) => res.json())
      .then((data) => setEmployees(data));
  }, []);

  return (
    <Box>
      <Button onClick={() => router.push('/add-employee')}>Add Employee</Button>
      <Table>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Position</Th>
            <Th>Department</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {employees.map((employee) => (
            <Tr key={employee._id}>
              <Td>{employee.name}</Td>
              <Td>{employee.position}</Td>
              <Td>{employee.department}</Td>
              <Td>
                <Button onClick={() => router.push(`/edit-employee/${employee._id}`)}>Edit</Button>
                <Button onClick={() => {
                  fetch(`http://localhost:4000/api/employees/${employee._id}`, { method: 'DELETE' })
                    .then(() => setEmployees(employees.filter(e => e._id !== employee._id)));
                }}>Delete</Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}