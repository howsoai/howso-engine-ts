export type Args = (...args: any[]) => void;

export type Logger = {
  fatal: Args;
  error: Args;
  warn: Args;
  info: Args;
  debug: Args;
};

export const nullLogger: Logger = {
  fatal: () => {},
  error: () => {},
  warn: () => {},
  info: () => {},
  debug: () => {},
};
