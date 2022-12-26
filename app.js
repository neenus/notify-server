import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import axios from 'axios';


import dotenv from 'dotenv';
dotenv.config();

const PUSHOVER_API_TOKEN = process.env.PUSHOVER_API_TOKEN;
const PUSHOVER_USER_KEY = process.env.PUSHOVER_USER_KEY;

const app = express();

app.use(cors());
app.use(morgan(":method :url :status :res[content-length] - :response-time ms"));
app.use(express.json());

// handle form submissions
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send({ message: "Welcome to Notify API", status: "Success" })
});

app.post('/notify', (req, res) => {

  const monitorName = req.body.monitor.name;
  const monitorHostname = req.body.monitor.hostname;
  const time = new Date(req.body.heartbeat.time).toLocaleString('en-US', { timeZone: 'America/Toronto' });
  const status = req.body.heartbeat.status === 1 ? '✅ Online' : '🔴 Offline';
  const title = `Monitor Robot - ${monitorName} - ${monitorHostname} - ${status}`;
  const msg = `${monitorName} has gone ${status} at ${time}`;

  const data = {
    token: PUSHOVER_API_TOKEN,
    user: PUSHOVER_USER_KEY,
    title,
    message: msg,
  };

  axios.post('https://api.pushover.net/1/messages.json', data, {
    headers: {
      'Content-Type': 'application/json',
    },
  })


  res.json({ message: "Notification received and will be handled shortly" });
});

app.post("/notifycallback", (req, res) => {
  res.json({ message: "Notification status callback received and will be handled shortly" });
});

export default app;