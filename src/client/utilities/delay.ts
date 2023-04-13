export async function delay(ms: number, signal?: AbortSignal): Promise<void> {
  let timeout: ReturnType<typeof setTimeout>;
  return new Promise((resolve, reject) => {
    const cancel = () => {
      clearTimeout(timeout);
      signal?.removeEventListener("abort", reject);
      reject();
    };
    signal?.addEventListener("abort", cancel);
    timeout = setTimeout(() => {
      signal?.removeEventListener("abort", reject);
      resolve();
    }, ms);
  });
}
