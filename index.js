const express = require("express");
const app = express();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
app.use(express.json());

app.get("/", async (req, res) => {
  const allStudents = await prisma.student.findMany();
  res.json(allStudents);
});

app.post("/", async (req, res) => {
  const newStudent = await prisma.student.create({ data: req.body });
  res.json(newStudent);
});

app.put("/:id", async (req, res) => {
  const id = req.params.id;
  const newEmail = req.body.email;
  const updatedStudent = await prisma.student.update({
    where: { id: parseInt(id) },
    data: { email: newEmail },
  });
  res.json(updatedStudent);
});

app.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const deletedStudent = await prisma.student.delete({
    where: { id: parseInt(id) },
  });
  res.json(deletedStudent);
});

app.listen(3000, () => console.log(`Server is running on PORT ${3000}`));
