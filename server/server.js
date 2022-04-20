import express from 'express';
import { UserDatabase } from './user-db.js';

class UserServer {
  constructor(dburl) {
    this.dburl = dburl;
    this.app = express();
  }

  async initRoutes() {
    // Note: when using arrow functions, the "this" binding is lost.
    const self = this;

    this.app.get('/user/create', async (req, res) => {
      try {
        const { id, name, email, username, password } = req.query;
        const user = await self.db.createUser(id, name, email, username, password);
        res.send(JSON.stringify(user));
      } catch (err) {
        res.status(500).send(err);
      }
    });

    this.app.get('/user/read', async (req, res) => {
      try {
        const { id } = req.query;
        const user = await self.db.readUser(id);
        res.send(JSON.stringify(user));
      } catch (err) {
        res.status(500).send(err);
      }
    });

    this.app.get('/user/update', async (req, res) => {
      try {
        const { id, name, email, username, password } = req.query;
        const user = await self.db.updateUser(id, name, email, username, password);
        res.send(JSON.stringify(user));
      } catch (err) {
        res.status(500).send(err);
      }
    });

    this.app.get('/user/delete', async (req, res) => {
      try {
        const { id } = req.query;
        const user = await self.db.deleteUser(id);
        res.send(JSON.stringify(user));
      } catch (err) {
        res.status(500).send(err);
      }
    });

    this.app.get('/user/all', async (req, res) => {
      try {
        const user = await self.db.readAllUser();
        res.send(JSON.stringify(user));
      } catch (err) {
        res.status(500).send(err);
      }
    });
  }

  async initDb() {
    this.db = new UserDatabase(this.dburl);
    await this.db.connect();
  }

  async start() {
    await this.initRoutes();
    await this.initDb();
    const port = process.env.PORT || 3000;
    this.app.listen(port, () => {
      console.log(`UserServer listening on port ${port}!`);
    });
  }
}

const server = new UserServer(process.env.DATABASE_URL);
server.start();