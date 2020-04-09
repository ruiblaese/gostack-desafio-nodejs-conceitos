const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {

  response.json(repositories);

});

app.post("/repositories", (request, response) => {

  const { title, url, techs } = request.body;
  const id = uuid();

  const repository = {
    id,
    title,
    url,
    techs,
    likes: 0
  }  

  repositories.push(repository);

  response.json(repository)
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repositoryIndex = repositories.findIndex(repo => repo.id === id);

  if (repositoryIndex < 0) {
    return response.status(400).json({ error: "Repository not found." });
  }

  const repository = {
    id,
    title,
    url,
    techs,
    likes: 0
  }

  repositories[repositoryIndex] = repository;

  return response.json(repository);


});

app.delete("/repositories/:id", (req, res) => {
  const { id } = req.params;

  const repositoryIndex = repositories.findIndex(repo => repo.id === id);

  if (repositoryIndex < 0) {
    return res.status(400).json({ error: "Repository not found." });
  }

  repositories.splice(repositoryIndex, 1);

  return res.status(204).send();

});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  
  const repositoryIndex = repositories.findIndex(repo => repo.id === id);

  if (repositoryIndex < 0) {
    return response.status(400).json({ error: "Repository not found." });
  }  
  
  repositories[repositoryIndex].likes++;

  return response.json(repositories[repositoryIndex]);

});

module.exports = app;
