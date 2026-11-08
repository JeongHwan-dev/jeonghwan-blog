const MAX_RETRY_COUNT = 3;

const DEFAULT_RETRY_AFTER_SECONDS = 1;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchWithRetry: typeof fetch = async (input, init) => {
  for (let attempt = 0; ; attempt++) {
    const response = await fetch(input, init);

    if (response.status !== 429 || attempt >= MAX_RETRY_COUNT) {
      return response;
    }

    const retryAfterSeconds =
      Number(response.headers.get('retry-after')) || DEFAULT_RETRY_AFTER_SECONDS;

    await sleep(retryAfterSeconds * 1000);
  }
};
