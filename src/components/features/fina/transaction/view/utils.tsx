import { notification } from 'antd';
import moment from 'moment';
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

export const excelDateToJSDate = (serial: number) => {
  const utcDays  = Math.floor(serial - 25569);
  const utcValue = utcDays * 86400;                                        
  const dateInfo = new Date(utcValue * 1000);
 
  const fractionalDay = serial - Math.floor(serial) + 0.0000001;
 
  let totalSeconds = Math.floor(86400 * fractionalDay);
 
  const seconds = totalSeconds % 60;
 
  totalSeconds -= seconds;
 
  const hours = Math.floor(totalSeconds / (60 * 60));
  const minutes = Math.floor(totalSeconds / 60) % 60;
 
  return new Date(dateInfo.getFullYear(), dateInfo.getMonth(), dateInfo.getDate(), hours, minutes, seconds);
};

export const normalizeDataImportListOfBeneficiaries = (rawData) => {
  const colsSkip = [0, 2, 3, 6, 7, 17, 19, 20, 21, 22, 23, 24, 25, 26, 27];
  const fields = {
    STT: 'stt',
    FULL_NAME: 'fullName',
    EMPLOYEE_NAME: 'employeeName',
    EMPLOYEE_ID: 'employeeId',
    DATE_OF_BIRTH: 'dateOfBirth',
    START_TIME: 'startTime',
    MONTH: 'month',
    YEAR: 'year',
    GENDER: 'gender',
    ID_NUMBER: 'idNumber',
    RELATIONSHIP: 'relationship',
    LEVEL: 'level',
    TYPE: 'type',
    PACKAGE: 'package',
    PRICE: 'price',
    EMAIL: 'email',
    TEL: 'tel',
    NOTE: 'note',
    ORG: 'org',
  };
  const MIN_AGE_STAFF = 18;
  const MIN_AGE_RELATIVE = 1;
  const MAX_AGE = 70;
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
      if (i == 4 || i == 5) {
        let date: any;
        const rawDate = rawData?.[j]?.[i];
        if (!rawData) {
          notification.error({ message: 'Không tìm thấy ngày sinh/ngày hiệu lực' });
        }
        if (typeof rawDate === 'number') {
          date = excelDateToJSDate(rawDate);
        }
        if (typeof rawDate === 'string') {
          const d = rawDate.split('/');
          date = new Date(d[2] + '/' + d[1] + '/' + d[0]);
        }

        norDocument[Object.values(fields)?.[i]?.toString()?.trim()] = date;
        continue;
      }
      norDocument[Object.values(fields)?.[i]?.toString()?.trim()] = rawData?.[j]?.[i]?.toString()?.trim() || '';
    }
    if (
      !norDocument[fields.TEL]
			|| !norDocument[fields.PRICE] 
			|| !norDocument[fields.PACKAGE] 
			|| !norDocument[fields.FULL_NAME] 
			|| !norDocument[fields.ID_NUMBER] 
			|| !norDocument[fields.DATE_OF_BIRTH]
    ) {
      notification.error({ message: 'Không thành công', description: `Not found tel or price or package of ${norDocument[fields.FULL_NAME]}` });
      return [];
    }
    const dateOfBirth = norDocument[fields.DATE_OF_BIRTH];
    const age = moment().diff(moment(dateOfBirth, 'DD-MM-YYYY'), 'years');
    const relationship = norDocument[fields.RELATIONSHIP];
    if (relationship) {
      if (age > MAX_AGE || age < MIN_AGE_RELATIVE) {
        notification.error({ message: 'Không thành công', description: `Age of ${norDocument[fields.FULL_NAME]} must be over ${MAX_AGE} and less than ${MIN_AGE_RELATIVE}` });
        return [];
      } 
    } else {
      if (age > MAX_AGE || age < MIN_AGE_STAFF) {
        notification.error({ message: 'Không thành công', description: `Age of ${norDocument[fields.FULL_NAME]} must be over ${MAX_AGE} and less than ${MIN_AGE_STAFF}` });
        return [];
      } 
    }
    norData.push(norDocument);
  }
  return norData;
};

