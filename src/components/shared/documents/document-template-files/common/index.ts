export const UploadedDocumentUtils = {
  getUnclassifiedDocument: (documents = []) => {
    let index = 0;
    const result: any[] = [];
    documents.map((document: any) => {
      const unclassified = !(document.documentTemplateDetailId || document.documentId);
      if (unclassified) {
        document.orderNumber = index;
        index++;
        result.push(document);
      }
    });
    return result;
  },
  getDocumentByOrderNumber:  (orderNumber: number, documents: any[] = []) => {
    return documents.find((element: any) => element.orderNumber === orderNumber);
  },
};