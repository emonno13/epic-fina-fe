import * as XLSX from 'xlsx';
import xlsx, { WorkSheet } from 'xlsx';

export const EXCEL_TYPE_FILE = {
  XLS : 'application/vnd.ms-excel',
  XLSX: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
};

export const excelTypesFile = Object.values(EXCEL_TYPE_FILE);

export const importExcel = (file, setRawData) => {
  const fileReader = new FileReader();
  fileReader.onload = (e) => {
    const result = e?.target?.result;
    const workbook = XLSX.read(result, { type: 'binary' });
    const ws: WorkSheet = workbook.Sheets[workbook.SheetNames[0]];
    const rawData: any[] = xlsx.utils.sheet_to_json(ws, { header: 1, blankrows: false }) || [[]];
    setRawData(rawData);
  };
  return fileReader.readAsBinaryString(file);
};

export const normalizeDataImportListOfBeneficiaries = (rawData) => {
  const colsSkip = [0];
  const fields = {
    EMAIL: 'email',
  };
  if (!rawData.length) {
    return [];
  }
  const norData: any = [];
  for (let j = 1; j < rawData.length; ++j) {
    const norDocument: any = {};
    for (let i = 0; i < rawData[j].length; ++i) {
      if (colsSkip.includes(i)) {
        continue;
      }
      norDocument[Object.values(fields)?.[i]?.toString()?.trim()] = rawData?.[j]?.[i]?.toString()?.trim() || '';
    }

    norData.push(norDocument);
  }
  return norData;
};

