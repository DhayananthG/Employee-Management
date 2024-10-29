const express = require('express');
const cors = require('cors');
const DBConnection = require('./databaseConnection');
const Employee = require('./EmployeeModel')
const PORT = 8000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : true}));
DBConnection();


// To display all the employee [ Working ]
app.get('/employees', async (req, res, next) => {
    try 
    {
        const employees = await Employee.find({});
        res.status(201).json(employees);  
    } 
    catch (error) 
    {
        res.status(404).json({ error: 'Error fetching employees' });  
    }
});


// To find the Employee by ID [ Working ]
app.get('/searchEmp/:id', async (req, res) => {
  try 
  {
    const Eid = req.params.id;
    const employee = await Employee.findOne({ EmployeeID : Eid });
      if (!employee) 
      {
          return res.status(404).json({ message: "Employee not found" });
      }
      res.status(200).json(employee);
  } 
  catch (error) 
  {
      res.status(500).json({ error: "An error occurred while searching for the employee." });
  }
});


// To Add a new employee data into the database [ Working ]
app.post('/addEmployee', async (req, res, next) => {
    const newEmployee = new Employee(req.body); 
    try 
    {
        await newEmployee.save();
        res.status(201).json({ message: "Employee added successfully" });
    } 
    catch (error) {
        console.error('Error adding employee:', error);
        res.status(404).json({ error: 'Error adding employee to the database' });
    }
});


// To update an employee [ Working ]
app.put('/updateEmp/:id', async (req, res) => {
    try {
      const Eid = req.params.id;
      const data = req.body;
      const updatedEmployee = await Employee.findOneAndUpdate({EmployeeID: Eid}, data, {new : true});
  
      if (!updatedEmployee) {
        return res.status(404).json({ message: 'Employee not found' });
      }
  
      res.status(201).json({ message: 'Designation updated successfully', employee: updatedEmployee });
    } catch (error) {
      res.status(500).json({ message: 'Error updating designation', error });
    }
  });


// To Delete an Employee [ Working ]
app.delete('/deleteEmp/:id', async (req, res) => {
    try 
    {
        const Eid = req.params.id;
        const deletedEmployee = await Employee.findOneAndDelete(Eid);
      
        if (!deletedEmployee) 
        {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(201).json({ message: 'Employee deleted successfully', employee: deletedEmployee });
    } 
    catch (error) 
    {
        res.status(500).json({ message: 'Error deleting employee', error });
    }
  });
  
  

app.listen(PORT, ()=> {
    console.log(`\nServer is Running on Port ${PORT}`); 
});