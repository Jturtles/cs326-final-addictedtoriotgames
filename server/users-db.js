import 'dotenv/config';
import { MongoClient, ServerApiVersion } from 'mongodb';

export class UserDatabase {
  constructor(dburl) {
    this.dburl = dburl;
    this.user = null;
  }

  async connect() {
    this.client = await MongoClient.connect(this.dburl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverApi: ServerApiVersion.v1,
    });

    // Get the database.
    this.db = this.client.db('FOTD');

    // Init the database.
    await this.init();
  }

  async init() {
    this.userCollection = this.db.collection('Users');
    this.postCollection = this.db.collection('Posts');
  }

  // Close the pool.
  async close() {
    this.client.close();
  }

  // CREATE a user in the database.
  async createUser(name, username, email, password) {
    let pictures = [];
    const res = await this.userCollection.insertOne({name, username, email, password, pictures });
    return res;
  }

  // READ a user from the database.
  async readUser(email) {
    const res = await this.userCollection.findOne({ email: email });
    return res;
  }

  async readUserPosts(email) {
    const res = await this.userCollection.findOne({ email: email });
    let posts = res.pictures;
    return posts;
  }

  // UPDATE a user in the database.
  async uploadPost(upload, type, Description) {

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;
    const data = await this.userCollection.findOne({ email : this.user.email });
    let pictures = data.pictures;
    const post = [upload, type, Description, this.user.name, today];
    pictures.push(post);
    await this.userCollection.updateOne(
      { email: this.user.email },
      { $set: {pictures} }
    );
    await this.postCollection.insertOne({post});
  }

  // DELETE a user from the database.
  async deleteUser() {
    // Note: the result received back from MongoDB does not contain the
    // entire document that was deleted from the database. Instead, it
    // only contains the 'deletedCount' (and an acknowledged field).
    await this.userCollection.deleteOne({ email: this.user.email });
    this.user = null;
  }

  // READ all people from the database.
  async readAllUsers() {
    const res = await this.userCollection.find({}).toArray();
    return res;
  }

  // READ all posts from the database.
  async readAllPosts() {
    const res = await this.postCollection.find({}).toArray();
    return res;
  }

  // Add a user to the "database".
  async addUser(email, realname, name, pwd) {
    if (await this.findUser(name)) {
      return false;
    }
    await this.userCollection.insertOne({name, realname, pwd, email, pictures:[]});
    return true;
  }

  async findUser(username) {
    const res = await this.userCollection.findOne({name:username});
    if(res != null){
      return true;
    } else {
      return false;
    }
  }

  // Returns true iff the password is the one we have stored (in plaintext = bad
  // but easy).
  async validatePassword(name, password) {
    const res = await this.userCollection.findOne({email:name});
    if(res === null){
      return false;
    } 
    if (res.pwd !== password) {
      return false; 
    }
    this.user = res;
    return true;
  }

  getUser(){
    return this.user;
  }

  logOut(){
    this.user = null;
  }
}