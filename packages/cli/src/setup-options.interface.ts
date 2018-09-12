import { KEmulator } from '@vulture/common';

export interface SetupOptions {
  useDocker: boolean;
  apiPort: number;
  dbName: string;
  dbPort: number;
  dbPass: string;
  dbUser: string;
  dbRootPass: string;
  emulator: KEmulator;
}
