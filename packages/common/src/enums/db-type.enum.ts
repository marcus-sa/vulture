export type DbType = 'mariadb' | 'mysql' | 'mongodb';
export type KDbType = 'MariaDB' | 'MySQL' | 'MongoDB';

export type IDbType = { [name in KDbType]: DbType };

export const DbTypes: IDbType = {
  MySQL: 'mysql',
  MariaDB: 'mariadb',
  MongoDB: 'mongodb',
};
