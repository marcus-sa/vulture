import { DynamicModule, Module } from '@nestjs/common';

import { Emulators, Emulator } from '@vulture/common';

@Module({})
export class EmulatorModule {
  private static async getEmulatorModule() {
    switch (<Emulator>process.env.EMULATOR) {
      case Emulators.Arcturus:
        return (await import('@vulture/arcturus')).ArcturusModule;

      case Emulators.Comet:
        return (await import('@vulture/comet')).CometModule;

      case Emulators.Plus:
        return (await import('@vulture/plus')).PlusModule;

      default:
        throw new Error(
          `No "EMULATOR" key/value was found in your environment variables`,
        );
    }
  }

  public static async forRoot(): Promise<DynamicModule> {
    const dynamicModule = await this.getEmulatorModule();

    return {
      module: EmulatorModule,
      imports: [dynamicModule!],
      exports: [dynamicModule!],
    };
  }
}
