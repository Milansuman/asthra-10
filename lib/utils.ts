import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { DefinedError } from './error';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type TryResult<T> =
  | {
      error: null;
      data: T;
      isSuccess: true;
    }
  | {
      error: DefinedError;
      data: null;
      isSuccess: false;
    };

export const trys = <T>(func: () => T): TryResult<T> => {
  try {
    const data = func() as T;
    return { error: null, data, isSuccess: true };
  } catch (e) {
    return {
      error: DefinedError.convert(e),
      data: null,
      isSuccess: false,
    };
  }
};

export const triedAsync = <T, U = Error>(
  promise: Promise<T>,
  errorExt?: object
): Promise<
  | {
      data: undefined;
      error: U;
      isSuccess: false;
    }
  | {
      data: T;
      error: undefined;
      isSuccess: true;
    }
> =>
  promise
    .then((data: T) => ({
      data,
      error: undefined,
      isSuccess: true as true,
    }))
    .catch((err: U) => {
      if (errorExt) {
        const parsedError = Object.assign({}, err, errorExt);
        return {
          error: parsedError,
          data: undefined,
          isSuccess: false as false,
        };
      }

      return {
        error: err,
        data: undefined,
        isSuccess: false,
      };
    });
