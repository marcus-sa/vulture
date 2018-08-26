import * as generatePassword from 'password-generator';
import * as inquirer from 'inquirer';
import * as fse from 'fs-extra';
import YAML from 'yaml';

interface Options {
  docker: boolean;
  apiPort: number;
  dbName: string;
  dbPort: number;
  dbPass: string;
  dbUser: string;
  dbRootPass: string;
  emulator: 'plus' | 'comet' | 'arcturus'
}

const prompt = inquirer.createPromptModule();
const validateInteger = (input, name: string) => Number.isInteger(input) || name + ' must be an integer!';
const validateString = (input, name: string) => typeof input === 'string' || name + ' must be a string!';
const validateMinLength = (input, minLength: number, name: string) => input.length >= minLength || `${name} must be at least ${minLength} characters`;

const questions: inquirer.Question[] = [
  {
    type: 'confirm',
    name: 'docker',
    message: 'Should use Docker',
  },
  {
    type: 'input',
    name: 'apiPort',
    message: 'Port for the API',
    default: 3000,
    validate: (input) => validateInteger(input, 'API port'),
  },
  {
    type: 'input',
    name: 'dbName',
    message: 'MySQL database name',
    default: 'vulture',
    validate: (input) => validateString(input, 'Database name'),
  },
  {
    type: 'input',
    name: 'dbUser',
    message: 'MySQL username',
    default: 'root',
    validate: (input) => validateString(input, 'Username'),
  },
  {
    type: 'input',
    name: 'dbPort',
    message: 'MySQL port',
    default: 3306,
    validate: (input) => validateInteger(input, 'MySQL port'),
  },
  {
    type: 'password',
    name: 'dbPass',
    message: 'MySQL user password',
    default: generatePassword(12, false),
    validate: (input) => validateMinLength(input, 6, 'User password'),
  },
  {
    type: 'password',
    name: 'dbRootPass',
    message: 'MySQL root password',
    default: generatePassword(16, false),
    validate: (input) => validateMinLength(input, 12, 'Root password'),
  },
  {
    type: 'list',
    name: 'emulator',
    message: 'Choose emulator',
    choices: [
      'plus',
      'comet',
      'arcturus',
    ],
  },
];

const dockerComposeTemplate = {
  version: '3',
  services: {
    db: {
      image: 'mariadb:latest',
      restart: 'always',
      environment: {},
      volumes: [
        'db_data:/var/lib/mysql/data',
      ]
    },
    app: {
      depends_on: [
        'db',
      ],
      build: '.',
      ports: [],
      restart: 'always',
      environment: {},
    }
  },
  volumes: 'db_data:'
} as any;

(async () => {
  const options = await prompt<Options>(questions);

  dockerComposeTemplate.services.db.environment = {
    MYSQL_ROOT_PASSWORD: options.dbRootPass,
    MYSQL_DATABASE: options.dbName,
    MYSQL_USER: options.dbUser,
    MYSQL_PASSWORD: options.dbPass,
  };
  dockerComposeTemplate.services.app.ports.push(options.apiPort);
  dockerComposeTemplate.services.app.environment = {
    PORT: options.apiPort,
    DB_HOST: 'db',
    DB_NAME: options.dbName,
    DB_PORT: options.dbPort,
    DB_USER: options.dbUser,
    DB_PASS: options.dbPass,
  };

  const dockerCompose = YAML.stringify(dockerComposeTemplate);
  await fse.writeFile('./docker-compose.yml', dockerCompose, 'utf8');
})();