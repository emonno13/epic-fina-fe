const API_SERVER_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;
export const endpoints = {
  generateNodeEndpoint: (nodeName, documentId?:string) => `${API_SERVER_ENDPOINT}/${nodeName}${documentId ? `/${documentId}` : ''}`,
  endpointWithApiDomain: (url) => `${API_SERVER_ENDPOINT}${url}`,
};