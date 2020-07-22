const Task = require('../model/TaskModel');
const TaskModel = require('../model/TaskModel');
const {
        startOfDay,
        endOfDay,
        startOfWeek,
        endOfWeek,
        startOfMonth,
        endOfMonth,
        startOfYear,
        endOfYear
      } = require('date-fns');

const current = new Date();

class TaskController {

    async create(req, res) {
        const task = new TaskModel(req.body);
    
        await task
              .save()
              .then(response => {
                return res.status(200).json(response);
              })
              .catch(error => {
                return res.status(500).json(error);
              });
    }

    async update(req, res) {
      // new: true, devolve a tarefa atualizada, se não colocar isso, devolve a tarefa como era antes da atualização
      await TaskModel.findByIdAndUpdate({ '_id': req.params.id }, req.body, { new: true }) 
        .then(response => {
          return res.status(200).json(response);
        }) 
        .catch(error => {
          return res.status(500).json(error);
        })
    }

    async delete(req, res) {
      await TaskModel.deleteOne({ '_id' : req.params.id })
      .then(response => {
        return res.status(200).json(response);
      })
      .catch(error => {
        return res.status(400).json(error);
      });
    }

    async show(req, res) {
      await TaskModel.findById(req.params.id)
        .then(response => {
          if ( response )
            return res.status(200).json(response);
          else
            return res.status(400).json({ error : 'Tarefa não encontrada' });
        })
        .catch(error => {
          return res.status(500).json(error);
        });
    }

    async all(req, res) {
      //traz as tarefas do mesmo usuario no mesmo dispositivo (macaddress)
      await TaskModel.find({ macaddress: { '$in': req.body.macaddress } }) 
        .sort('when')
        .then(response => {
          return res.status(200).json(response);
        })
        .catch(error => {
          return res.status(500).json(error);
        });
    }

    async done(req, res) {
      await TaskModel.findByIdAndUpdate(
        { '_id': req.params.id },
        { 'done': req.params.done },
        { new: true } //devolve os dados da tarefa atualizados
      )
      .then(response => {
        return res.status(200).json(response);
      })
      .catch(error => {
        return res.status(500).json(error);
      });
    }

    async late(req, res) {
      await TaskModel
        .find({
          'when': { '$lt' : current },
          'done': { '$eq' : 'false' },
          'macaddress' : { '$in' : req.body.macaddress }
        })
        .sort('when')
        .then(response => {
          return res.status(200).json(response);
        })
        .catch(error => {
          return res.status(500).json(error);
        });
    }

    async today(req, res) {
      await TaskModel
      .find({
        'macaddress' : { '$in' : req.body.macaddress },
        'when': { '$gte' : startOfDay(current), '$lt' : endOfDay(current) }
      })
      .sort('when')
      .then(response => {
        return res.status(200).json(response);
      })
      .catch(error => {
        return res.status(500).json(error);
      });
    }

    async week(req, res) {
      await TaskModel
      .find({
        'macaddress' : { '$in' : req.body.macaddress },
        'when': { '$gte' : startOfWeek(current), '$lt' : endOfWeek(current) }
      })
      .sort('when')
      .then(response => {
        return res.status(200).json(response);
      })
      .catch(error => {
        return res.status(500).json(error);
      });
    }

    async month(req, res) {
      await TaskModel
      .find({
        'macaddress' : { '$in' : req.body.macaddress },
        'when': { '$gte' : startOfMonth(current), '$lt' : endOfMonth(current) }
      })
      .sort('when')
      .then(response => {
        return res.status(200).json(response);
      })
      .catch(error => {
        return res.status(500).json(error);
      });
    }

    async year(req, res) {
      await TaskModel
      .find({
        'macaddress' : { '$in' : req.body.macaddress },
        'when': { '$gte' : startOfYear(current), '$lt' : endOfYear(current) }
      })
      .sort('when')
      .then(response => {
        return res.status(200).json(response);
      })
      .catch(error => {
        return res.status(500).json(error);
      });
    }
}

module.exports = new TaskController();