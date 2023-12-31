const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const PORT = 8080;
const exec = require('child_process').exec;

app.get('/check-updates', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  const appVersionFile= req.query.versionFile;
  const command = `cat ${appVersionFile}.txt`;
  console.log(command);
  exec(command, (err, output) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.send({version: output.trim()});
  });
});

const db = new sqlite3.Database('server.db');

app.get('/login', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  const myUser = req.query.username;
  const myPassword = req.query.password;
  if (!myUser || !myPassword) {
    res.status(500).send({error: 'username and password are required'});
    return;
  }
  const sql = `SELECT * FROM users WHERE username='${myUser}' AND password='${myPassword}'`;
  console.log(sql);
  db.get(sql, (err, row) => {
    if (err) {
      res.status(500).send({error: err});
    } else if (!row) {
      res.status(500).send({error: 'user not found'});
    } else {
      res.send(row);
    }
  });
});

app.get('/messages', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  const myUser = req.query.userId;
  if (!myUser) {
    res.status(500).send({error: 'user id not provided'});
    return;
  }

  const sql = `SELECT * FROM messages WHERE user_id='${myUser}'`;
  console.log(sql);
  db.all(sql, (err, rows) => {
    if (err) {
      res.status(500).send({error: err});
    } else {
      res.send(rows);
    }
  });
});

app.listen(PORT,()=>console.log(`Server started on port ${PORT}`));
