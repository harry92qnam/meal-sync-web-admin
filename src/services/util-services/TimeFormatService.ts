export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function formatTimeToSeconds(dateString: string) {
  const dateObj = new Date(dateString); // Parse the date string
  const hours = dateObj.getHours().toString().padStart(2, '0'); // Add leading zero for single-digit hours
  const minutes = dateObj.getMinutes().toString().padStart(2, '0');
  const seconds = dateObj.getSeconds().toString().padStart(2, '0');
  const day = dateObj.getDate().toString().padStart(2, '0');
  const month = (dateObj.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed (January is 0)
  const year = dateObj.getFullYear();

  return `${hours}:${minutes}:${seconds} - ${day}/${month}/${year}`;
}

export function formatDateString(dateString: string) {
  const dateObj = new Date(dateString); // Parse the date string
  const day = dateObj.getDate().toString().padStart(2, '0');
  const month = (dateObj.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed (January is 0)
  const year = dateObj.getFullYear();

  return `${day}/${month}/${year}`;
}

export const formatDateStringYYYYMMDD = (dateString: string): string => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
};

export const formatDateStringYYYYMMDD_HHMM = (dateString: string): string => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  const hours = ('0' + date.getHours()).slice(-2);
  const minutes = ('0' + date.getMinutes()).slice(-2);
  return `${year}-${month}-${day} ${hours}:${minutes}`;
};

export function formatDate(date: Date) {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed (January is 0)
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

export const convertDateTimeToISO = (timeString: string) => {
  const date = new Date(timeString);

  return date.toISOString();
};

export const formatCurrency = (value: number | string) => {
  // Handle undefined, null, or empty values
  if (value === undefined || value === null) {
    value = 0;
  }

  // Format the number as Vietnamese dong (VND)
  return value.toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });
};

export const formatNumber = (value: number | string) => {
  if (value === undefined || value === null) {
    value = 0;
  }

  return value.toLocaleString('en-US');
};

export const formatPhoneNumber = (phone: string) => {
  const cleaned = ('' + phone).replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return match[1] + '-' + match[2] + '-' + match[3];
  }
  return null;
};
