import 'dotenv/config';
import pg from 'pg';

// Get the Pool class from the pg module.
const { Pool } = pg;

export class UserDatabase {
  constructor(dburl) {
    this.dburl = dburl;
  }

  async connect() {
    // Create a new Pool. The Pool manages a set of connections to the database.
    // It will keep track of unused connections, and reuse them when new queries
    // are needed. The constructor requires a database URL to make the
    // connection. You can find the URL of your database by looking in Heroku
    // or you can run the following command in your terminal:
    //
    //  heroku pg:credentials:url -a APP_NAME
    //
    // Replace APP_NAME with the name of your app in Heroku.
    this.pool = new Pool({
      connectionString: this.dburl,
      ssl: { rejectUnauthorized: false }, // Required for Heroku connections
    });

    // Create the pool.
    this.client = await this.pool.connect();
  }

  // Close the pool.
  async close() {
    this.client.release();
    await this.pool.end();
  }

  // CREATE a user in the database.
  async createUser(id, name, email, username, password) {
    const queryText =
      'INSERT INTO user (id, name, email, username, password) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    const res = await this.client.query(queryText, [id, name, email, username, password]);
    return res.rows;
  }

  // READ a user from the database.
  async readUser(id) {
    const queryText = 'SELECT * FROM user WHERE id = $1';
    const res = await this.client.query(queryText, [id]);
    return res.rows;
  }

  // UPDATE a user in the database.
  async updateUser(id, name, email, username, pictures) {
    const queryText =
      'UPDATE user SET name = $2, email = $3, username = $4, password = $5 WHERE id = $1 RETURNING *';
    const res = await this.client.query(queryText, [id, name, email, username, password]);
    return res.rows;
  }

  // DELETE a user from the database.
  async deleteUser(id) {
    const queryText = 'DELETE FROM user WHERE id = $1 RETURNING *';
    const res = await this.client.query(queryText, [id]);
    return res.rows;
  }

  // READ all people from the database.
  async readAllUser() {
    const queryText = 'SELECT * FROM user';
    const res = await this.client.query(queryText);
    return res.rows;
  }
}