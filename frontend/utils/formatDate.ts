import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc);

export function formatDate(date : string) : string {
  return dayjs.utc(date).format('DD MM YYYY')
}