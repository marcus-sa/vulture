// @TODO: Find a way to create the docker-compose.yml in the user config directory
// @TODO: Should be used to generate docker-compose.yml templates for the docker images

import * as generatePassword from 'password-generator';
import * as inquirer from 'inquirer';
import * as fse from 'fs-extra';
import * as path from 'path';
import YAML from 'yaml';

import { Emulators, SetupOptions } from '@vulture/common';

const appService = 'app';
const dbService = 'db';

const prompt = inquirer.createPromptModule();

const validateInteger = (name: string) => (input: any) =>
  Number.isInteger(input) || `${name} must be an integer!`;
const validateString = (name: string) => (input: any) =>
  typeof input === 'string' || `${name} must be a string!`;
const validateMinLength = (minLength: number, name: string) => (input = '') =>
  input.length >= minLength ||
  `${name} must be at least ${minLength} characters`;

const createDockerComposeTemplate = (options: SetupOptions) => ({
  version: '3',
  services: {
    [dbService]: {
      image: 'mariadb:latest',
      restart: 'always',
      environment: {
        MYSQL_ROOT_PASSWORD: options.dbRootPass,
        MYSQL_DATABASE: options.dbName,
        MYSQL_USER: options.dbUser,
        MYSQL_PASSWORD: options.dbPass,
      },
      volumes: ['db_data:/var/lib/mysql/data'],
    },
    [appService]: {
      depends_on: [dbService],
      build: '.',
      volumes: ['.:/usr/app'],
      ports: [`${options.apiPort}:${options.apiPort}`],
      restart: 'always',
      environment: {
        EMULATOR: Emulators[<any>options.emulator],
        PORT: options.apiPort,
        DB_HOST: dbService,
        DB_NAME: options.dbName,
        DB_PORT: options.dbPort,
        DB_USER: options.dbUser,
        DB_PASS: options.dbRootPass,
      },
    },
  },
  volumes: {
    db_data: {},
  },
});

const questions: inquirer.Question[] = [
  {
    type: 'input',
    name: 'apiPort',
    message: 'Port for the API',
    default: 3000,
    validate: validateInteger('API port'),
  },
  {
    type: 'input',
    name: 'dbName',
    message: 'MySQL database name',
    default: 'vulture',
    validate: validateString('Database name'),
  },
  {
    type: 'input',
    name: 'dbUser',
    message: 'MySQL username',
    default: 'root',
    validate: validateString('Username'),
  },
  {
    type: 'input',
    name: 'dbPort',
    message: 'MySQL port',
    default: 3306,
    validate: validateInteger('MySQL port'),
  },
  {
    type: 'password',
    name: 'dbPass',
    message: 'MySQL user password',
    default: generatePassword(12, false),
    validate: validateMinLength(6, 'User password'),
  },
  {
    type: 'password',
    name: 'dbRootPass',
    message: 'MySQL root password',
    default: generatePassword(16, false),
    validate: validateMinLength(12, 'Root password'),
  },
  {
    type: 'list',
    name: 'emulator',
    message: 'Choose emulator',
    choices: Object.keys(Emulators),
  },
];

(async () => {
  const options = await prompt<SetupOptions>(questions);
  const dockerComposeTemplate = createDockerComposeTemplate(options);
  const dockerCompose = YAML.stringify(dockerComposeTemplate);
  const dockerComposeFile = path.join(process.cwd(), 'docker-compose.yml');
  await fse.writeFile(dockerComposeFile, dockerCompose, 'utf8');
})();
