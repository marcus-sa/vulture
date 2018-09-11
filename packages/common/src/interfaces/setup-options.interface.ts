import { Emulators } from '../enums';

export interface SetupOptions {
  apiPort: number;
  dbName: string;
  dbPort: number;
  dbPass: string;
  dbUser: string;
  dbRootPass: string;
  emulator: Emulators;
}
