type Generator<T> = (reset?: boolean) => T;

const generator = <T>(array: T[]): Generator<T> => {
  const arraySaved = array.concat();
  let i = 1;
  return (reset = false): T => {
    if (reset) i = 0;
    if (i === arraySaved.length) i = 0;
    return arraySaved[i++];
  };
};

export default generator;
