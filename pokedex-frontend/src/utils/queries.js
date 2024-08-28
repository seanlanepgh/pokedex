export const areAnyLoading = (...queries) =>
  queries.some(({ isLoading }) => !!isLoading);
export const areAnyFailed = (...queries) =>
  queries.some(({ error }) => !!error);
export const areAllLoaded = (...queries) =>
  queries.every(
    ({isSuccess, error, data }) => isSuccess && !error && !!data
  );
