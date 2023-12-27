const express = require('express');
const fs = require('node:fs');
const app = express();
const PORT = 8080;
const exec = require('child_process').exec;

app.get('/check-version', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  const appVersionFile= req.query.versionFile;
  const command = `cat ${appVersionFile}.txt`;
  exec(command, (err, output) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.send({version: output.trim()});
  });
});

const messages = [];

app.get('/messages', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  const myUser = req.query.username;
  const myPassword = req.query.password;
  if (!myUser || !myPassword) {
    res.status(500).send({error: 'username and password are required'});
    return;
  }

  const userLines = fs.readFileSync('users.txt', 'utf8')
    .split('\n');

  let result = [];
  for (let line of userLines) {
    const [user, password] = line.split(':');
    if (user === myUser && password === myPassword) {
      result = messages.filter(message => message.username === myUser);
      break;
    }
  }

  res.send(result);
});

app.listen(PORT,()=>console.log(`server started on port ${PORT}`));
