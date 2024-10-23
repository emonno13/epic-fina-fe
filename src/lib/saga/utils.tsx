export const SagaUtils = {
  sagaTaskToPromise: async (store: any) => {
    await store.sagaTask.toPromise();
  },
};