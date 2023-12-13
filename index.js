const express = require("express");
const bodyparser = require("body-parser");
const connection = require("./connection");
const Employee = require("./models/Employees");

connection();

const app = express();

const PORT = 3001;

app.use(bodyparser.json());

const allowCrossDomain = (req, res, next) => {
  res.header(`Access-Control-Allow-Origin`, `http://localhost:3000`);
  res.header(`Access-Control-Allow-Methods`, `GET,PUT,POST,DELETE`);
  res.header(`Access-Control-Allow-Headers`, `Content-Type`);
  next();
};


app.use(allowCrossDomain);

//GET All Employees
app.get("/", async (req, res) => {
  const employees = await Employee.find();
  res.json(employees);
});


//GET one Employee by email
app.get("/:email", async (req, res) => {
  const emp = await Employee.find({ email: req.params.email });
  if (emp.length == 0) res.json({ message: "Employee not found" });
  else res.json(emp);
});



//Create a new Employee
app.post("/", async (req, res) => {
  const emp = new Employee({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
  });

 emp.save().then(() => res.json(emp)).catch((err) => console.log(err));
});



//Update Employee
app.put("/:email", async (req, res) => {
    const emp = await Employee.findOneAndUpdate(
        { email: req.params.email },
        {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        },
        { new: true }
    );
    if (emp) {
        res.json({ message: "Employee not found" });
        return;
    } else res.json(emp);
});




//Delete Employee
app.delete("/:email", async (req, res) => {
  const emp = await Employee.findOneAndRemove({ email: req.params.email });
  if (emp.length == 0) {
    res.json({ message: "Employee not found" });
    return;
  } else res.json(emp);
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
