// @TODO: Find a way to create the docker-compose.yml in the user config directory
// @TODO: Should be used to generate docker-compose.yml templates for the docker images or without using docker

import * as generatePassword from 'password-generator';
import { Emulators } from '@vulture/common';
import * as inquirer from 'inquirer';

import { validateInteger, validateMinLength, validateString } from './util';
import { createDockerTemplate } from './create-docker-template';
import { SetupOptions } from './setup-options.interface';

(async () => {
  const prompt = inquirer.createPromptModule();

  const questions: inquirer.Question[] = [
    {
      type: 'confirm',
      name: 'useDocker',
      message: 'Use Docker?',
      default: true,
    },
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
      default: generatePassword(12),
      validate: validateMinLength(6, 'User password'),
    },
    {
      type: 'password',
      name: 'dbRootPass',
      message: 'MySQL root password',
      default: generatePassword(16),
      validate: validateMinLength(12, 'Root password'),
    },
    {
      type: 'list',
      name: 'emulator',
      message: 'Choose emulator',
      choices: Object.keys(Emulators),
    },
  ];

  const options = await prompt<SetupOptions>(questions);

  return options.useDocker ? await createDockerTemplate(options) : '';
})();
