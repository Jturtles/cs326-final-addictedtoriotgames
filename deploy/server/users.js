import 'dotenv/config';
import { MongoClient, ServerApiVersion } from 'mongodb';
export class Users {

  constructor(dburl) {
    this.dburl = dburl;
  }
  
  // Returns true iff the user exists.

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
    this.collection = this.db.collection('Users');
  }

  async findUser(username) {
    const res = await this.collection.findOne({name:username});
    if(res != null){
      return true;
    } else {
      return false;
    }
  }

  // Returns true iff the password is the one we have stored (in plaintext = bad
  // but easy).
  async validatePassword(name, password) {
    const res = await this.collection.findOne({email:name});
    if(res === null){
      return false;
    } 
    if (res.pwd !== password) {
      return false; 
    }
    console.log('here');
    return true;
  }

  // Add a user to the "database".
  async addUser(email, name, pwd) {
    if (await this.findUser(name)) {
      return false;
    }
    await this.collection.insertOne({name, pwd, email});
    return true;
  }
}


  
