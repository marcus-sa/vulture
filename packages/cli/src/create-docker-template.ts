import { Emulators } from '@vulture/common';
import * as fse from 'fs-extra';
import * as path from 'path';
import YAML from 'yaml';

import { SetupOptions } from './setup-options.interface';

export async function createDockerTemplate(options: SetupOptions) {
  const dockerComposeTemplate = createDockerComposeTemplate(options);
  const dockerCompose = YAML.stringify(dockerComposeTemplate);
  const dockerComposeFile = path.join(process.cwd(), 'docker-compose.yml');
  await fse.writeFile(dockerComposeFile, dockerCompose, 'utf8');
}

const createDockerComposeTemplate = (options: SetupOptions) => ({
  version: '3',
  services: {
    db: {
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
    app: {
      depends_on: 'db',
      build: '.',
      volumes: ['.:/usr/app'],
      ports: [`${options.apiPort}:${options.apiPort}`],
      restart: 'always',
      environment: {
        EMULATOR: Emulators[options.emulator],
        PORT: options.apiPort,
        DB_HOST: 'db',
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
