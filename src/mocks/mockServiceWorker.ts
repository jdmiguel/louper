const initMockServiceWorker = async () => {
  if (import.meta.env.VITE_MOCK_API) {
    const { worker } = await import('./browser');

    worker.start();
  }
};

export default initMockServiceWorker;
