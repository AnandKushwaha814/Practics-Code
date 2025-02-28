const express = require("express");
const app = express();
const fs = require("fs");
const users = require("./MOCK_DATA.json");
const PORT = 8000;

// Middleware-plugin
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
// Print all users
app.get("/users", (req, res) => {
  const html = `
    <ul>
      ${users
        .map(
          (user) => `
          <li>${user.id}</li>
          <li>${user.first_name} ${user.last_name}</li>
          <li>${user.email}</li>
          <li>${user.gender}</li>
          <li>${user.Job_title}</li>
        `
        )
        .join("")}
    </ul>
  `;
  res.send(html);
});

// Get All Users REST API
app.get("/api/users", (req, res) => {
  return res.json(users);
});

// Search user with ID
app.route("/api/users/:id").get((req, res) => {
  const id = Number(req.params.id);
  const user = users.find((user) => user.id === id);
  return res.json(user);
});

// Edit new user
app.patch("/api/users/:id", (req, res) => {
  const id = req.params.id;
  const updates = req.body;
  const userIndex = users.findIndex((user) => user.id === parseInt(id));

  if (userIndex === -1) {
    res.status(404).send({ message: "User Not found" });
  } else {
    Object.assign(users[userIndex], updates);
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (error, data) => {
      return res.status(200).json({ status: "Success" });
    });
  }
});

// Delete new user
app.delete("/api/users/:id", (req, res) => {
  const id = req.params.id;
  const userIndex = users.findIndex((user) => user.id === parseInt(id));

  if (userIndex === -1) {
    res.status(404).send({ message: "User Not found" });
  } else {
    users.splice(userIndex, 1);
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (error, data) => {
      return res.status(200).json({ status: "Success" });
    });
  }
});

// Create new user
app.post("/api/users", (req, res) => {
  const body = req.body;
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (error, data) => {
    return res.status(201).json({ status: "Success", id: users.length });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at port http://localhost:${PORT}`);
});
