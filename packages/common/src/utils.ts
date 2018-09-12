export class Utils {
  public static setEnvironment(env: { [key: string]: string }) {
    Object.keys(env).forEach(key => {
      process.env[key] = env[key];
    });
  }
}
