import { DynamicModule, forwardRef, Module } from '@nestjs/common';

// import { CommonModule } from './common';

import CometModule from './comet';

@Module({})
export class EmulatorModule {
  public static forRoot(): DynamicModule {
    // const dynamicModule = (await import(`./${process.env.EMULATOR || 'comet'}`)).default;

    return {
      module: EmulatorModule,
      // exports: [CometModule],
      imports: [CometModule],
    };
  }
}
