import { Database, Statement, open as openDatabase } from 'sqlite';
import sqlite3 from 'sqlite3';
import { AddUserParams, GetUserFilter, GetUserParams, GetUserSelect, IUserRepository, User } from './types';
import { config } from '../../common/config';

type x = keyof User;

export class SqliteUserRepo implements IUserRepository {
  private static _instance: SqliteUserRepo | undefined = undefined;
  // hacky but TS will shut up
  private _database: Database = undefined as unknown as Database;

  private constructor() {}

  // singleton
  static async instance() {
    if (SqliteUserRepo._instance) return SqliteUserRepo._instance;

    SqliteUserRepo._instance = new SqliteUserRepo();
    SqliteUserRepo._instance._database = await openDatabase({
      filename: config.DATABASE_FILE,
      driver: sqlite3.Database,
    });
    return SqliteUserRepo._instance;
  }

  async getUser<U extends Partial<User>>(params: GetUserParams): Promise<U | undefined> {
    let selectorStr = '*';
    if (params.select) {
      const selectors = Object.getOwnPropertyNames(params.select);
      selectorStr = selectors.join(',');
    }

    const filters = Object.getOwnPropertyNames(params.filter);
    if (!filters.length) return;
    const filterStr = filters.map((f) => `${f} = :${f}`).join(',');

    const placeholders = filters.reduce((acc, crtFilter) => {
      const placeholderName = `:${crtFilter}`;
      return {
        ...acc,
        [placeholderName]: params.filter[crtFilter as keyof User],
      };
    }, {});

    const query = `SELECT ${selectorStr} FROM Users WHERE ${filterStr}`;
    console.log(`SQL QUERY: ${query}`);
    const stmt = await this._database.prepare(query, placeholders);

    return stmt.get<U>();
  }

  addUser(params: AddUserParams): Promise<User | undefined> {
    throw new Error('Method not implemented.');
  }
}
