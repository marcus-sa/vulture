// @TODO: Find a way to create the docker-compose.yml in the user config directory
// @TODO: Should be used to generate docker-compose.yml templates for the docker images or without using docker

import * as generatePassword from 'password-generator';
import { DbTypes, Emulators } from '@vulture/common';
import * as inquirer from 'inquirer';

import { validateInteger, validateMinLength, validateString } from './util';
import { createDockerTemplate } from './create-docker-template';
import { SetupOptions } from './setup-options.interface';

(async () => {
  const prompt = inquirer.createPromptModule();

  const messages = {
    database: {
      name: 'Database name',
      port: 'Database port',
      root: 'Database root password',
      username: 'Database username',
      password: 'Database user password',
    },
  };

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
      default: 'vulture',
      message: messages.database.name,
      validate: validateString(messages.database.name),
    },
    {
      type: 'input',
      name: 'dbUser',
      default: 'root',
      message: messages.database.username,
      validate: validateString(messages.database.username),
    },
    {
      type: 'input',
      name: 'dbPort',
      message: messages.database.port,
      default: 3306,
      validate: validateInteger(messages.database.port),
    },
    {
      type: 'password',
      name: 'dbPass',
      message: messages.database.password,
      default: generatePassword(12),
      validate: validateMinLength(6, messages.database.password),
    },
    {
      type: 'password',
      name: 'dbRootPass',
      message: messages.database.root,
      default: generatePassword(16),
      validate: validateMinLength(12, messages.database.root),
    },
    {
      type: 'list',
      name: 'emulator',
      message: 'Choose emulator',
      choices: Object.keys(Emulators),
    },
    {
      type: 'list',
      name: 'dbType',
      message: 'Choose database type',
      choices: Object.keys(DbTypes),
    },
  ];

  const options = await prompt<SetupOptions>(questions);

  return options.useDocker ? await createDockerTemplate(options) : '';
})();
