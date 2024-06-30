import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  isSameDay,
  isSameHour,
  isSameMinute,
  isSameMonth,
  isSameYear,
} from 'date-fns';

export const calculateDate = (time: Date): string => {
  const now = new Date();
  if (isSameMinute(now, time)) {
    return 'a few seconds ago';
  } else if (isSameHour(now, time)) {
    const minutes = differenceInMinutes(now, time);
    if (minutes === 1) {
      return 'a minute ago';
    } else {
      return `${minutes} minutes ago`;
    }
  } else if (isSameDay(now, time)) {
    const hours = differenceInHours(now, time);
    if (hours === 1) {
      return 'a hour ago';
    } else {
      return `${hours} hours ago`;
    }
  } else if (isSameMonth(now, time)) {
    const days = differenceInDays(now, time);
    if (days === 1) {
      return 'a day ago';
    } else {
      return `${days} days ago`;
    }
  } else if (isSameYear(now, time)) {
    const months = differenceInMinutes(now, time);
    if (months === 1) {
      return 'a month ago';
    } else {
      return `${months} months ago`;
    }
  }
  return '';
};

export const formatAddress = (addr: string): string => {
  return addr.substr(0, 8) + '...' + addr.substr(addr.length - 8, 8);
};
