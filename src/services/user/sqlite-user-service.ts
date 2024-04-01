import { CreateUserIn, IUserService, User } from './types';
import sqlite3 from 'sqlite3';
import { Database, open as openDatabase } from 'sqlite';
import { config } from '../../common/config';
import { exists } from 'fs';

const CREATE_TABLE =
  'CREATE TABLE IF NOT EXISTS Users\
    (username TEXT NOT NULL PRIMARY KEY,\
    password TEXT NOT NULL,\
    firstName TEXT NOT NULL,\
    lastName TEXT NOT NULL,\
    age int NOT NULL)';

export class SqliteUserService implements IUserService {
  private static _instance: SqliteUserService | undefined = undefined;
  // hacky but TS will shut up
  private _database: Database = undefined as unknown as Database;

  private constructor() {}

  // singleton
  static async instance() {
    if (SqliteUserService._instance) return SqliteUserService._instance;

    SqliteUserService._instance = new SqliteUserService();
    SqliteUserService._instance._database = await openDatabase({
      filename: config.DATABASE_FILE,
      driver: sqlite3.Database,
    });
    await SqliteUserService._instance._database.run(CREATE_TABLE);
    return SqliteUserService._instance;
  }

  async createUser(params: CreateUserIn): Promise<User | undefined> {
    const { username, password, firstName, lastName, age } = params;
    const existsStmt = await this._database.prepare('SELECT username FROM Users where username = :username');
    await existsStmt.bind({ ':username': username });
    const exisingUser = await existsStmt.get<User>();
    if (exisingUser) return undefined;

    const createStmt = await this._database.prepare(
      'INSERT INTO Users (username, password, firstName, lastName, age) VALUES (?,?,?,?,?) RETURNING *'
    );
    await createStmt.bind({
      1: username,
      2: password,
      3: firstName,
      4: lastName,
      5: age,
    });
    const user = await createStmt.get<User>();
    return user;
  }

  async validateUser(username: string, password: string): Promise<User | undefined> {
    const user = await this._database.get<User>('SELECT username, password FROM Users WHERE username = :username', {
      ':username': username,
    });
    // use a comparison that's not vulnerable to timing attacks w/ bcrypt or smthing + store hashed instead
    if (!user || user.password !== password) return;
    return user;
  }
}
