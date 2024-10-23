import { httpRequester } from '@lib/networks/http';
import Cookies from 'js-cookie';
const baseUrl = 'https://api.stringeex.com/v1/';

const getReport = {
  getReportCallIn: () => {
    const token = Cookies.get('stringeeTokenApi');
    return httpRequester.getDataFromApi({
      url: 'https://fina.stringeex.com/v1/statistics/call',
      params: {
        time: '31/03/2021 00:00-01/04/2021 00:00',
      },
      // ,
      // headers: {
      //   Accept: "application/json, text/plain, */*",
      //   "Content-Type": "application/json",
      //   "X-STRINGEE-AUTH": token,
      // },
    });
  },
};

export default getReport;
