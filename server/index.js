import express from 'express';
import { UserDatabase } from './users-db.js';

class UserServer {
  constructor(dburl) {
    this.dburl = dburl;
    this.app = express();
    this.app.use('/', express.static('client'));
    this.app.use(express.json());
    this.app.use(express.urlencoded({extended:true}));
  }

  async initRoutes() {
    // Note: when using arrow functions, the "this" binding is lost.
    const self = this;

    this.app.post('/user/create', async (req, res) => {
      try {
        const {name, username, email, password } = req.body;
        const user = await self.db.createUser(name, username, email, password);
        res.send(JSON.stringify(user));
      } catch (err) {
        res.status(500).send(err);
      }
    });

    this.app.get('/user/read', async (req, res) => {
      try {
        const { id } = req.body;
        const user = await self.db.readUser(id);
        res.send(JSON.stringify(user));
      } catch (err) {
        res.status(500).send(err);
      }
    });

    this.app.get('/user/update', async (req, res) => {
      try {
        const {id , name, username, email, password } = req.body;
        const user = await self.db.updateUser(id, name, username, email, password );
        res.send(JSON.stringify(user));
      } catch (err) {
        res.status(500).send(err);
      }
    });

    this.app.get('/user/delete', async (req, res) => {
      try {
        const { id } = req.body;
        const user = await self.db.deleteUser(id);
        res.send(JSON.stringify(user));
      } catch (err) {
        res.status(500).send(err);
      }
    });

    this.app.get('/user/all', async (req, res) => {
      try {
        const user = await self.db.readAllUsers();
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
    const port = process.env.PORT || 8080;
    this.app.listen(port, () => {
      console.log(`UserServer listening on port ${port}!`);
    });
  }
}

const server = new UserServer(process.env.DATABASE_URL);
server.start();