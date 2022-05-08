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
    
    //route to upload pictures to the database from the user
    this.app.post('/upload', this.upload.single('upload'), async (req, res) => {
      try {
        const img = fs.readFileSync(req.file.path);
        const encode_img = img.toString('base64');
        const {email, Description} = req.body;
        await self.db.uploadPost(email, encode_img, req.file.mimetype, Description);
        res.redirect('/profile');
      } catch (err) {
        res.status(500).send(err);
      }
    });

    //route to delete an entire user, delete part of our CRUD
    this.app.delete('/user/delete', async (req, res) => {
      try {
        const {email} = req.body;
        await self.db.deleteUser(email);
        res.status(200).send();
      } catch (err) {
        res.status(500).send(err);
      }
    });

    //route to get all the posts for the feed page
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
        const { email, password } = req.body;
        const val = await this.db.validatePassword(email, password);
        res.send(val);
      });


    this.app.post('/getUser', async (req, res) => {
      const {email} = req.body;
      const user = await this.db.getUser(email);
      res.send(JSON.stringify(user));
    });
    // Like login, but add a new user and password IFF one doesn't exist already.
    // If we successfully add a new user, go to /login, else, back to /register.
    // Use req.body to access data (as in, req.body['username']).
    // Use res.redirect to change URLs.
    this.app.post('/signup', async (req, res) => {
      const { email, Name, Username, Password } = req.body;
      if (await this.db.addUser(email, Name, Username, Password)) {
        res.redirect('/login');
      } else {
        res.redirect('/signup');
      }
    });

    //route to send user to feedpage
    this.app.get('/feed', (req, res) => {
      res.sendFile('client/feedPage.html', { root: this.__dirname })
    });

    //route to send user to profile page
    this.app.get('/profile', (req, res) => {
      res.sendFile('client/profile.html', { root: this.__dirname })
    });

    // Register URL
    this.app.get('/signup', (req, res) =>
      res.sendFile('client/signUp.html', { root: this.__dirname })
    );

    //upload posts to user database
    this.app.post('/upload/pfp', this.upload.single('uploadpfp'), async (req, res) => {
      try {
        const img = fs.readFileSync(req.file.path);
        const encode_img = img.toString('base64');
        const {email} = req.body;
        await self.db.uploadPFP(email, encode_img, req.file.mimetype);
        res.redirect('/profile');
      } catch (err) {
        res.status(500).send(err);
      }
    });

    //in case of error
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