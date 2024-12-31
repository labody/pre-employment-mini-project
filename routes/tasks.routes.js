import express from 'express';
import Joi from 'joi';
import { Task } from '../models/task.js'; 

const router = express.Router();

// Validation schema
const taskSchema = Joi.object({
  title: Joi.string().required(),
});
  

// Fetch a list of tasks
router.get('/', async (req, res) => {
  const tasks = await Task.findAll();
  res.send("You're live")
  res.json(tasks);
});

// Fetch a specific task by ID
router.get('/:id', async (req, res) => {
  const task = await Task.findByPk(req.params.id);
  if (task) {
    res.json(task);
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
});

// Create a new task
router.post('/', async (req, res) => {
    console.log(req.body);
  const { error } = taskSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const { title } = req.body;
  const newTask = await Task.create({ title });
  res.status(201).json(newTask);
});

// Update a specific task
router.put('/:id', async (req, res) => {
  const { error } = taskSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const task = await Task.findByPk(req.params.id);
  if (!task) return res.status(404).json({ error: 'Task not found' });

  const updatedTask = await task.update(req.body);
  res.json(updatedTask);
});

// Delete a task
router.delete('/:id', async (req, res) => {
  const task = await Task.findByPk(req.params.id);
  if (!task) return res.status(404).json({ error: 'Task not found' });

  await task.destroy();
  res.status(204).send();
});

export default router;
