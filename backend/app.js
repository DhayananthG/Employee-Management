const express = require('express');
const cors = require('cors');
const DBConnection = require('./databaseConnection');
const Employee = require('./EmployeeModel')
const PORT = 8000;

const app = express();
app.use(cors());
app.use(express.json());
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
        res.status(500).json({ error: 'Error fetching employees' });  
    }
});


// To Add a new employee data into the database [ Working ]
app.post('/employee', async (req, res, next) => {
    try {
        const newEmployee = new Employee(req.body); 
        await newEmployee.save();
        res.status(201).json({ message: "Employee added successfully" });
    } 
    catch (error) {
        console.error('Error adding employee:', error);
        res.status(500).json({ error: 'Error adding employee to the database' });
    }
});


// To find the Employee by ID 
app.post('/searchEmployee', async (req, res) => {
    try {
        const { EmployeeID } = req.body;

        // Find employee by EmployeeID
        const employee = await Employee.findOne({ EmployeeId: EmployeeID });
        
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        res.status(200).json(employee);
    } 
    catch (error) {
        res.status(500).json({ error: "An error occurred while searching for the employee." });
    }
});


// To update an employee 
app.put('/updateEmployee', async (req, res) => {
    try 
    {
        const { EmployeeID, newDesignation } = req.body;
        const updatedEmployee = await Employee.findOneAndUpdate(
            { employeeId: EmployeeID },
            { designation: newDesignation },
            { new: true }
        );

        if (!updatedEmployee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        res.status(200).json({ message: "Designation updated successfully", employee: updatedEmployee });
    } 
    catch (error) 
    {
        res.status(500).json({ error: "An error occurred while updating the designation." });
    }
});

  

app.listen(PORT, ()=> {
    console.log(`\nServer is Running on Port ${PORT}`); 
})