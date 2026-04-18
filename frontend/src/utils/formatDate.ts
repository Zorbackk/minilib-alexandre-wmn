import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc'
import 'dayjs/locale/fr' 

dayjs.extend(utc);

export function formatDate(date : string) : string {
  return dayjs.utc(date).locale('fr').format('dddd DD MMMM YYYY')
}

