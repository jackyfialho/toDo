const Task = require('../model/TaskModel');
const TaskModel = require('../model/TaskModel');

class TaskController {

    async create(request, response) {
        const task = new TaskModel(request.body);
        await task
                .save()
                .then(response => {
                    return response.status(200).json(response);
                })
                .catch(error => {
                    return response.status(500).json(error);
                })
    }
}

module.exports = new TaskController();