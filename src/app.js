const express = require("express");
const cors = require("cors");

 const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  // List Route
  return response.json(repositories);
});
app.post("/repositories", (request, response) => {
  //Creation route
  //get the title, url and techs from the body,
  //for that , use the request.body
  const { title , url , techs} = request.body;


  //const to create the array
  const arrayOfRepository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  }

  //add the in the arrayOfRepository
  repositories.push(arrayOfRepository)

  //Return the array
return response.json(arrayOfRepository);

});

app.put("/repositories/:id", (request, response) => {
  //Update Route

  //get the title, url and techs from the body,
  //for that , use the request.body
  const { title, url, techs } = request.body;
  //get the id from the params,
  //for that , use the request.params
  const { id } = request.params;


  //to find the index , we use findIndex
  const findArrayOfRepositoryIndex = repositories.findIndex(arrayOfRepository => arrayOfRepository.id === id);

  //if the index does not exists , will return -1
  if(findArrayOfRepositoryIndex === -1){
    return response.status(400).json({ error: "Repository does not exists."})
  }

  const arrayOfRepository = {
    id, 
    title,
    url,
    techs,
    likes: repositories[findArrayOfRepositoryIndex].likes,
  }


  //to update we find the repositories.Index to recive arrayOfRepository
  repositories[findArrayOfRepositoryIndex] = arrayOfRepository


  //return the json
  return response.json(arrayOfRepository);

});

app.delete("/repositories/:id", (request, response) => {
  // Delete Route
  //get the id from the params,
  //for that , use the request.params
  const { id } = request.params;

    //to find the index , we use findIndex
    const findArrayOfRepositoryIndex = repositories.findIndex(arrayOfRepository => arrayOfRepository.id === id);

    //if exist: 
      if(findArrayOfRepositoryIndex != -1){
        repositories.splice(findArrayOfRepositoryIndex, 1);
      }
      else{
        return response.status(400).json({error: "Repository does not exists."});
      }


      //return with status
      return response.status(204).send()
});

app.post("/repositories/:id/like", (request, response) => {
  // Like Route
  //get the id from the params,
  //for that , use the request.params
  const { id } = request.params;


  //search the ID
  const findArrayOfRepositoryIndex = repositories.findIndex(arrayOfRepository => arrayOfRepository.id === id);


  //if does not exists then:
  if(findArrayOfRepositoryIndex === -1){
    return response.status(400).json({ error: "Repository does not exists."})
  }

  //add plus 1
  repositories[findArrayOfRepositoryIndex].likes++;

  //return
  return response.json(repositories[findArrayOfRepositoryIndex])  

});

module.exports = app;

app.listen(() => {
  console.log(" 👍🏻 Project Working 🤓")
})
