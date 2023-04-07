const express = require('express');
const router = express.Router();
const Task = require('../models/task');

// Create a new task
router.post('/tasks', (req, res) => {
  const { name, dueDate } = req.body;
  const task = new Task({ name, dueDate });
  task.save()
    .then(result => {
      res.status(201).json(result);
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error });
    });
});

// Get a list of all tasks
router.get('/tasks', (req, res) => {
  Task.find()
    .then(tasks => {
      res.json(tasks);
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error });
    });
});

// Filter tasks by name
router.get('/tasks/name/:name', (req, res) => {
  const { name } = req.params;
  Task.find({ name: { $regex: name, $options: 'i' } })
    .then(tasks => {
      res.json(tasks);
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error });
    });
});

// Filter tasks by status
router.get('/tasks/status/:status', (req, res) => {
  const { status } = req.params;
  Task.find({ status })
    .then(tasks => {
      res.json(tasks);
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error });
    });
});

// Filter tasks by due date
router.get('/tasks/dueDate/:dueDate', (req, res) => {
  const { dueDate } = req.params;
  Task.find({ dueDate })
    .then(tasks => {
      res.json(tasks);
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error });
    });
});

// Delete a task
router.delete('/tasks/:taskId', (req, res) => {
  const { taskId } = req.params;
  Task.findByIdAndDelete(taskId)
    .then(result => {
      res.json(result);
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error });
    });
});

// Update a task
router.patch('/tasks/:taskId', (req, res) => {
  const { taskId } = req.params;
  Task.findByIdAndUpdate(taskId, req.body, { new: true })
    .then(result => {
      res.json(result);
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error });
    });
});

// Change the status of a task
router.put('/tasks/:taskId/status', (req, res) => {
  const { taskId } = req.params;
  const { status } = req.body;
  Task.findByIdAndUpdate(taskId, { status }, { new: true })
    .then(result => {
      res.json(result);
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error });
    });
});

module.exports = router;