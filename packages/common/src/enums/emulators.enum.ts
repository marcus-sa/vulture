// What a hassle because ts-jest doesn't support enums ...
export type Emulator = 'plus' | 'comet' | 'arcturus';
export type KEmulator = 'Plus' | 'Comet' | 'Arcturus';

export type IEmulators = { [name in KEmulator]: Emulator };

export const Emulators: IEmulators = {
  Plus: 'plus',
  Comet: 'comet',
  Arcturus: 'arcturus',
};
