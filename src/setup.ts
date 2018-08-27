import * as generatePassword from 'password-generator';
import * as inquirer from 'inquirer';
import * as fse from 'fs-extra';
import * as path from 'path';
import YAML from 'yaml';

enum Emulators {
  Plus = 'plus',
  Comet = 'comet',
  Arcturus = 'arcturus',
}

interface Options {
  apiPort: number;
  dbName: string;
  dbPort: number;
  dbPass: string;
  dbUser: string;
  dbRootPass: string;
  emulator: Emulators;
}

const prompt = inquirer.createPromptModule();
const validateInteger = (name: string) => input =>
  Number.isInteger(input) || `${name} must be an integer!`;
const validateString = (name: string) => input =>
  typeof input === 'string' || `${name} must be a string!`;
const validateMinLength = (minLength: number, name: string) => (input = '') =>
  input.length >= minLength ||
  `${name} must be at least ${minLength} characters`;

function createDockerCompose(options: Options) {
  const dockerComposeTemplate = {
    version: '3',
    services: {
      db: {
        image: 'mariadb:latest',
        restart: 'always',
        environment: {},
        volumes: ['db_data:/var/lib/mysql/data'],
      },
      app: {
        depends_on: ['db'],
        build: '.',
        volumes: ['.:/usr/app'],
        ports: [],
        restart: 'always',
        environment: {},
      },
    },
    volumes: { db_data: {} },
  } as any;

  dockerComposeTemplate.services.db.environment = {
    MYSQL_ROOT_PASSWORD: options.dbRootPass,
    MYSQL_DATABASE: options.dbName,
    MYSQL_USER: options.dbUser,
    MYSQL_PASSWORD: options.dbPass,
  };
  dockerComposeTemplate.services.app.ports.push(
    `${options.apiPort}:${options.apiPort}`,
  );
  dockerComposeTemplate.services.app.environment = {
    PORT: options.apiPort,
    DB_HOST: 'db',
    DB_NAME: options.dbName,
    DB_PORT: options.dbPort,
    DB_USER: options.dbUser,
    DB_PASS: options.dbRootPass,
  };

  return dockerComposeTemplate;
}

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
  const options = await prompt<Options>(questions);
  const dockerComposeTemplate = createDockerCompose(options);
  const dockerCompose = YAML.stringify(dockerComposeTemplate);
  const dockerComposeFile = path.join(process.cwd(), 'docker-compose.yml');
  await fse.writeFile(dockerComposeFile, dockerCompose, 'utf8');
})();
