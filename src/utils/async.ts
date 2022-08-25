// polling technique
export const waitFor = (conditionFn: () => boolean): Promise<void> => {
  const poll = (resolve: () => void) => {
    if (conditionFn()) resolve();
    else setTimeout(() => poll(resolve), 400);
  };

  return new Promise(poll);
};
