import express from 'express';
// import { v4 as uuidv4 } from 'uuid';
import { sequelize, Task } from './models/task.js';
import dotenv from 'dotenv';
import router from './routes/tasks.routes.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());


app.use('/tasks', router);

app.get('/', (req, res) => {
  res.send('Task API is running. Available endpoints: /tasks');
});

  
  // Initialize database and start server
  (async () => {
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`Task API is running at http://localhost:${PORT}`);
    });
  })();
  