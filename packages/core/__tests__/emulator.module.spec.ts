import { DynamicModule } from '@nestjs/common';
import { EmulatorModule } from '@vulture/core';
import { Utils } from '@vulture/common';

import { ArcturusModule } from '@vulture/arcturus';
import { CometModule } from '@vulture/comet';
import { PlusModule } from '@vulture/plus';
import { Emulator } from '@vulture/common';

describe('EmulatorModule', () => {
  /*describe('getEmulatorModule', () => {
    it('should get correct comet module', async () => {
      setEmulatorEnv('comet');

      EmulatorModule.getEmulatorModule();
    });
  });*/

  describe('forRoot', () => {
    it('should return dynamic module with comet', async () => {
      Utils.setEnvironment({ EMULATOR: 'comet' });
      const emulatorModule = await EmulatorModule.forRoot();

      expect(emulatorModule).toMatchObject({
        module: EmulatorModule,
        imports: [CometModule],
        exports: [CometModule],
      } as DynamicModule);
    });
  });
});
