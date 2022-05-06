import 'dotenv/config';
import express from 'express';
import { UserDatabase } from './users-db.js';
import expressSession from 'express-session';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import multer from 'multer';
import fs from 'fs';

// Session configuration
const sessionConfig = {
  // set this encryption key in Heroku config (never in GitHub)!
  secret: process.env.SECRET || 'SECRET',
  resave: false,
  saveUninitialized: false,
};

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './client/uploadImages')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "--"  + file.originalname)
  }
});
class UserServer {
  constructor(dburl) {
    const __filename = fileURLToPath(import.meta.url);
    this.__dirname = dirname(dirname(__filename));
    this.dburl = dburl;
    this.app = express();
    this.upload = multer({storage: fileStorageEngine});
    this.app.use('/', express.static('client'));
    this.app.use(express.json());
    this.app.use(express.urlencoded({extended:true}));
    this.app.use(expressSession(sessionConfig));
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

    this.app.get('/user/read/post', async (req, res) => {
      try {
        const { email } = req.body;
        const user = await self.db.readUserPosts(email);
        res.send(JSON.stringify(user));
      } catch (err) {
        res.status(500).send(err);
      }
    });
    this.app.post('/upload', this.upload.single('upload'), async (req, res) => {
      try {
        const img = fs.readFileSync(req.file.path);
        const encode_img = img.toString('base64');
        const {Description} = req.body;
        await self.db.uploadPost(encode_img, req.file.mimetype, Description);
        res.redirect('/feed');
      } catch (err) {
        res.status(500).send(err);
      }
    });

    this.app.delete('/user/delete', async (req, res) => {
      try {
        await self.db.deleteUser();
        res.status(200).send();
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

    this.app.get('/post/all', async (req, res) => {
      try {
        const post = await self.db.readAllPosts();
        res.send(JSON.stringify(post));
      } catch (err) {
        res.status(500).send(err);
      }
    });
    

    // Our own middleware to check if the user is authenticated
    function checkLoggedIn(req, res, next) {
      if (self.db.getUser() !== null) {
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
      async (req, res) => {
        const { Email, Password } = req.body;
        if (await this.db.validatePassword(Email, Password)) {
          res.redirect('/feed');
        } else {
          res.redirect('/login');
        }
      });

    // Handle logging out (takes us back to the login page).
    this.app.get('/logout', (req, res) => {
      this.db.logOut(); // Logs us out!
      res.redirect('/login'); // back to login
    });

    this.app.get('/getUser', (req, res) => {
      res.send(JSON.stringify(this.db.getUser()));
    });
    // Like login, but add a new user and password IFF one doesn't exist already.
    // If we successfully add a new user, go to /login, else, back to /register.
    // Use req.body to access data (as in, req.body['username']).
    // Use res.redirect to change URLs.
    this.app.post('/signup', async (req, res) => {
      const { email, Username, Password } = req.body;
      if (await this.db.addUser(email, Username, Password)) {
        res.redirect('/login');
      } else {
        res.redirect('/signup');
      }
    });

    this.app.get('/feed', checkLoggedIn, (req, res) => {
      res.sendFile('client/feedPage.html', { root: this.__dirname })
    });

    this.app.get('/profile', checkLoggedIn, (req, res) => {
      res.sendFile('client/profile.html', { root: this.__dirname })
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

  async start() {
    await this.initRoutes();
    await this.initDb();
    const port = process.env.PORT || 8080;
    this.app.listen(port, () => {
      console.log(`UserServer listening on port ${port}!`);
    });
  }
}

const server = new UserServer(process.env.MONGODB_URI);
server.start();