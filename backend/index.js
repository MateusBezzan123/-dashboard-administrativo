const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://mateusbhn998:OBxXldOuHyByJRJV@cluster0.m7ztvcz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const employeeSchema = new mongoose.Schema({
  name: String,
  position: String,
  department: String,
  dateOfJoining: Date,
});

const Employee = mongoose.model('Employee', employeeSchema);

app.get('/api/employees', async (req, res) => {
  const employees = await Employee.find();
  res.json(employees);
});

app.get('/api/employees/:id', async (req, res) => {
  const employee = await Employee.findById(req.params.id);
  res.json(employee);
});

app.post('/api/employees', async (req, res) => {
  const employee = new Employee(req.body);
  await employee.save();
  res.status(201).json(employee);
});

app.put('/api/employees/:id', async (req, res) => {
  const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(employee);
});

app.delete('/api/employees/:id', async (req, res) => {
  await Employee.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

app.listen(4000, () => {
  console.log('Server is running on port 4000');
});