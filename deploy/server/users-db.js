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

  // upload post to user in user collection and add a post in post collection
  async uploadPost(email, upload, type, Description) {

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;
    const data = await this.userCollection.findOne({ email : email });
    let pictures = data.pictures;
    const post = [upload, type, Description, data.name, today];
    pictures.push(post);
    await this.userCollection.updateOne(
      { email: email },
      { $set: {pictures} }
    );
    await this.postCollection.insertOne({post, email});
  }

  // upload profile pic of user to usercollection
  async uploadPFP(email, upload, type){
    const pfp = [type, upload];
    await this.userCollection.updateOne(
      { email: email },
      { $set: {pfp} }
    );
  }

  // delete an entire user and all of their posts from the post collection
  async deleteUser(email) {
    // Note: the result received back from MongoDB does not contain the
    // entire document that was deleted from the database. Instead, it
    // only contains the 'deletedCount' (and an acknowledged field).
    await this.postCollection.deleteMany({email:email});
    await this.userCollection.deleteOne({ email: email });
  }

  // read all posts from the post collection
  async readAllPosts() {
    const res = await this.postCollection.find({}).toArray();
    return res;
  }

  // create a new user and add it to the user collection
  async addUser(email, realname, name, pwd) {
    if (await this.findUser(name)) {
      return false;
    }
    await this.userCollection.insertOne({name, realname, pwd, email, pictures:[], pfp:null});
    return true;
  }

  // if the user exists in the user collection
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
      return [];
    } 
    if (res.pwd !== password) {
      return []; 
    }
    return res;
  }

  // gets the user info given an email
  async getUser(email){
    const res = await this.userCollection.findOne({email:email});
    return res;
  }
}