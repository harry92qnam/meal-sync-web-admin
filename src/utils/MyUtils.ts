import Swal from 'sweetalert2';

export const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const formatTimeToSeconds = (dateString: string): string => {
  const date = new Date(dateString);
  const localDate = new Date(date.getTime());
  const time = localDate.toTimeString().slice(0, 8);
  const formattedDate = localDate.toLocaleDateString('en-GB');

  return `${time} - ${formattedDate}`;
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const localDate = new Date(date.getTime());
  return localDate.toLocaleDateString('en-GB');
};

export function formatWeightForInput(value: string) {
  const [integerPart, decimalPart] = value.split('.');

  // Format integer part with thousand separators
  const formattedInteger = integerPart.replace(/[^\d]/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  // Limit the decimal part to 2 digits
  const formattedDecimal = decimalPart ? decimalPart.substring(0, 2) : '';

  // If there's a decimal part, combine it with the integer part
  return formattedDecimal ? `${formattedInteger}.${formattedDecimal}` : formattedInteger;
}

export const formatTimeAgo = (date: Date) => {
  const now = new Date();
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / 60000);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} phút trước`;
  } else if (diffInMinutes < 1440) {
    // 60 minutes * 24 hours
    const diffInHours = Math.floor(diffInMinutes / 60);
    return `${diffInHours} giờ trước`;
  } else if (diffInMinutes < 43200) {
    // 60 minutes * 24 hours * 30 days
    const diffInDays = Math.floor(diffInMinutes / 1440);
    return `${diffInDays} ngày trước`;
  } else if (diffInMinutes < 525600) {
    // 60 minutes * 24 hours * 365 days
    const diffInMonths = Math.floor(diffInMinutes / 43200); // 30 days
    return `${diffInMonths} tháng trước`;
  } else {
    const diffInYears = Math.floor(diffInMinutes / 525600); // 60 * 24 * 365
    return `${diffInYears} năm trước`;
  }
};

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('vi-VI', {
    style: 'currency',
    currency: 'VND',
  }).format(amount);
};

export const formatNumber = (value: number | string | undefined | null) =>
  Number(value || 0).toLocaleString('en-US');

export const formatPhoneNumber = (phone: string) => {
  const match = phone.replace(/\D/g, '').match(/^(\d{3})(\d{3})(\d{4})$/);
  return match ? `${match[1]}-${match[2]}-${match[3]}` : null;
};

export function formatTimeFrame(startTime?: number, endTime?: number): string {
  const formatTime = (time: number): string => {
    const hours = Math.floor(time / 100);
    const minutes = time % 100;

    // Ensure hours and minutes are two digits
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}`;
  };

  const formattedStartTime = formatTime(startTime!);
  const formattedEndTime = formatTime(endTime!);

  return `${formattedStartTime} - ${formattedEndTime}`;
}

export const toast = (icon: 'success' | 'error', content: string) =>
  Swal.fire({
    position: 'center',
    icon,
    text: content,
    showConfirmButton: true,
    timer: 2000,
  });

export function getBangkokDate() {
  const now = new Date();
  // Create a new date object adjusted for Bangkok's time zone
  const bangkokDate = new Date(now.getTime() + 7 * 60 * 60 * 1000); // +7 hours

  // Format the date as YYYY-MM-DD
  const formattedDate = bangkokDate.toISOString().split('T')[0];
  return formattedDate;
}

export function getFormattedCurrentTime() {
  const now = new Date();
  const hours = now.getHours();
  let minutes = now.getMinutes();

  // Round the minutes to either 00 or 30
  if (minutes < 30) {
    minutes = 0;
  } else {
    minutes = 30;
  }

  const currentTime = hours * 100 + minutes;
  return currentTime;
}

export const numberFormatUtilService = {
  hashId: (id: number): number => {
    let hash = 5381;
    const strId = id.toString();

    for (let i = 0; i < strId.length; i++) {
      hash = (hash * 33) ^ strId.charCodeAt(i);
    }

    // Convert to a positive 32-bit integer
    return hash >>> 0;
  },
  formatNumberWithDotEach3digits: (number: number): string => {
    return number.toLocaleString('vi-VN', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  },
  formatThousandNumberWithDotEach3digits: (number: number): string => {
    number = number / 1_000;
    return number.toLocaleString('vi-VN', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  },
  formatMillionNumberWithDotEach3digits: (number: number): string => {
    number = number / 1_000_000;
    return number.toLocaleString('vi-VN', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  },
};

export const isLocalImage = (uri: string) => {
  return (
    uri.toLocaleLowerCase().startsWith('file://') ||
    uri.toLocaleLowerCase().startsWith('content://')
  );
};

export const calculateNumberOfDays = (createdDate: string | Date) => {
  const created = new Date(createdDate); // Parse the createdDate
  const now = new Date(); // Get the current date
  const differenceInMs = now.getTime() - created.getTime(); // Calculate the difference in milliseconds
  return Math.floor(differenceInMs / (1000 * 60 * 60 * 24)); // Convert to days
};
