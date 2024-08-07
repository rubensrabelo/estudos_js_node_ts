
const Task = require("../models/Task");

module.exports = class TaskController {
   static async showAllTask(req, res) {
    const tasks = await Task.findAll({raw: true});

    res.render("task/home", {tasks});
   }
   
   static async createTask(req, res) {
    res.render("task/create");
   }

   static async createTaskPost(req, res) {
    const task = {
        title: req.body.title,
        status: false
    };

    await Task.create(task);

    res.redirect("/tasks");
   }

   static async editTask(req, res) {
    const id = req.params.id;

    const task = await Task.findOne({where: {id: id}, raw: true});

    console.log(task)

    res.render("task/edit", {task});
   }

   static async editTaskPost(req, res) {
    const id = req.body.id;

    const task = {
        title: req.body.title,
        status: req.body.status
    }

    await Task.update(task, {where: {id: id}});

    res.redirect("/tasks");
   }

   static async removeTask(req, res) {
    const id = req.body.id;

    await Task.destroy({where: {id: id}});

    res.redirect("/tasks");
   } 
}