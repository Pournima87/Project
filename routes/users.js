import express from "express";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

let users = [];

router.get("/", (req, res) => {
  console.log(users);
  res.send(users);
});

router.post("/", (req, res) => {
  const user = req.body;
  users.push({ ...user, id: uuidv4() });
  res.send(`User with the name ${user.empName} added Successfully`);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const foundUser = users.find((user) => user.id === id);
  res.send(foundUser);
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  users = users.filter((user) => user.id !== id);
  res.json({ message: `User id with ${id} deleted Successfully` });
});

router.patch("/:id", (req, res) => {
  const { id } = req.params;
  const { empName, empId, empEmailId, role, mobile } = req.body;
  const usertoupdate = users.find((user) => user.id === id);
  if (empName) usertoupdate.empName = empName;
  if (empId) usertoupdate.empId = empId;
  if (empEmailId) usertoupdate.empEmailId = empEmailId;
  if (role) usertoupdate.role = role;
  if (mobile) usertoupdate.mobile = mobile;

  res.json(`User with ${id} has been Updated Successfully`);
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { empName, empId, empEmailId, role, mobile } = req.body;

  const userIndex = users.findIndex(user => user.id === id);

  if (userIndex === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  // Replace entire user object except id
  users[userIndex] = {
    id,
    empName,
    empId,
    empEmailId,
    role,
    mobile
  };

  res.json({ message: `User with id ${id} updated successfully`, user: users[userIndex] });
});

export default router;
