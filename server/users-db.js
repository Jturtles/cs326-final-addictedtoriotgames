import 'dotenv/config';
import { MongoClient, ServerApiVersion } from 'mongodb';

export class UserDatabase {
  constructor(dburl) {
    this.dburl = dburl;
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
  async createUser(name, username, email, password, pictures ) {
    const res = await this.userCollection.insertOne({name, username, email, password, pictures });
    return res;
  }

  // READ a user from the database.
  async readUser(id) {
    const res = await this.userCollection.findOne({ _id: id });
    return res;
  }

  async readUserPosts(email) {
    const res = await this.userCollection.findOne({ email: email });
    return res;
  }

  // UPDATE a user in the database.
  async updateUser(email, post ) {
    const pictures = await this.userCollection.findOne({ email : email });
    pictures.push(post);
    const res = await this.userCollection.updateOne(
      { email: email },
      { $set: {pictures : pictures} }
    );
    return res;
  }

  // DELETE a user from the database.
  async deleteUser(id) {
    // Note: the result received back from MongoDB does not contain the
    // entire document that was deleted from the database. Instead, it
    // only contains the 'deletedCount' (and an acknowledged field).
    const res = await this.userCollection.deleteOne({ _id: id });
    return res;
  }

  // READ all people from the database.
  async readAllUsers() {
    const res = await this.userCollection.find({}).toArray();
    return res;
  }
}