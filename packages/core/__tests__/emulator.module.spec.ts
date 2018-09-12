import { DynamicModule } from '@nestjs/common';
import { EmulatorModule } from '@vulture/core';

import { ArcturusModule } from '@vulture/arcturus';
import { CometModule } from '@vulture/comet';
import { PlusModule } from '@vulture/plus';
import { Emulator } from '@vulture/common';

import { setEnvironment } from './test-utils';

describe('EmulatorModule', () => {
  /*describe('getEmulatorModule', () => {
    it('should get correct comet module', async () => {
      setEmulatorEnv('comet');

      EmulatorModule.getEmulatorModule();
    });
  });*/

  describe('forRoot', () => {
    it('should return dynamic module containing comet', async () => {
      setEnvironment({ EMULATOR: 'comet' });
      const emulatorModule = await EmulatorModule.forRoot();

      expect(emulatorModule).toMatchObject({
        module: EmulatorModule,
        imports: [CometModule],
        exports: [CometModule],
      } as DynamicModule);
    });
  });
});
