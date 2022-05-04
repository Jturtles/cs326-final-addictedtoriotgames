import 'dotenv/config';
import express from 'express';
import { UserDatabase } from './users-db.js';
import expressSession from 'express-session';
import {Users} from './users.js';
import auth from './auth.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Session configuration
const sessionConfig = {
  // set this encryption key in Heroku config (never in GitHub)!
  secret: process.env.SECRET || 'SECRET',
  resave: false,
  saveUninitialized: false,
};

class UserServer {
  constructor(dburl) {
    const __filename = fileURLToPath(import.meta.url);
    this.__dirname = dirname(dirname(__filename));
    this.dburl = dburl;
    this.app = express();
    this.app.use('/', express.static('client'));
    this.app.use(express.json());
    this.app.use(express.urlencoded({extended:true}));
    this.app.use(expressSession(sessionConfig));
    auth.configure(this.app);
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

    // Our own middleware to check if the user is authenticated
    function checkLoggedIn(req, res, next) {
      if (req.isAuthenticated()) {
        // If we are authenticated, run the next route.
        next();
      } else {
        // Otherwise, redirect to the login page.
        res.redirect('/login');
      }
    }

    // this.app.get('/', checkLoggedIn, (req, res) => {
    //   res.send('hello world');
    // });

    // Handle the URL /login (just output the login.html file).
    this.app.get('/login', (req, res) => {
      res.sendFile('client/index.html', { root: this.__dirname })
    });

    // Handle post data from the login.html form.
    this.app.post(
      '/login',
      auth.authenticate('local', {
        // use username/password authentication
        successRedirect: '/private', // when we login, go to /private
        failureRedirect: '/login', // otherwise, back to login
      })
    );

    // Handle logging out (takes us back to the login page).
    this.app.get('/logout', (req, res) => {
      req.logout(); // Logs us out!
      res.redirect('/login'); // back to login
    });

    // Like login, but add a new user and password IFF one doesn't exist already.
    // If we successfully add a new user, go to /login, else, back to /register.
    // Use req.body to access data (as in, req.body['username']).
    // Use res.redirect to change URLs.
    this.app.post('/signup', async (req, res) => {
      const { email, Username, Password } = req.body;
      if (await this.users.addUser(email, Username, Password)) {
        res.redirect('/login');
      } else {
        res.redirect('/signup');
      }
    });

    // Register URL
    this.app.get('/signup', (req, res) =>
      res.sendFile('client/signUp.html', { root: this.__dirname })
    );

    // Private data
    this.app.get(
      '/private',
      checkLoggedIn, // If we are logged in (notice the comma!)...
      (req, res) => {
        // Go to the user's page.
        res.redirect('/private/' + req.user);
      }
    );

    // A dummy page for the user.
    this.app.get(
      '/private/:userID/',
      checkLoggedIn, // We also protect this route: authenticated...
      (req, res) => {
        // Verify this is the right user.
        if (req.params.userID === req.user) {

        } else {
          res.redirect('/private/');
        }
      }
    );

    this.app.get('*', (req, res) => {
      res.send('Error');
    });
  }

  async initDb() {
    this.db = new UserDatabase(this.dburl);
    await this.db.connect();
  }

  async initUser(){
    this.users = new Users(this.dburl);
    await this.users.connect();
  }

  async start() {
    await this.initRoutes();
    await this.initDb();
    await this.initUser();
    const port = process.env.PORT || 8080;
    this.app.listen(port, () => {
      console.log(`UserServer listening on port ${port}!`);
    });
  }
}

const server = new UserServer(process.env.MONGODB_URI);
server.start();