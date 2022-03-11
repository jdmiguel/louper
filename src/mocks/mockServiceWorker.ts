const initMockServiceWorker = async () => {
  if (process.env.REACT_APP_MOCK_API) {
    const { worker } = await import('./browser');

    worker.start();
  }
};

export default initMockServiceWorker;
