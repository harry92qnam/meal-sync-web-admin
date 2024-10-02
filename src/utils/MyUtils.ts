import Swal from 'sweetalert2';

export const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const formatTimeToSeconds = (dateString: string) => {
  const d = new Date(dateString);
  return `${d.toTimeString().slice(0, 8)} - ${d.toLocaleDateString('en-GB')}`;
};

export const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('en-GB');

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

export const toast = (icon: 'success' | 'error', content: string) =>
  Swal.fire({
    position: 'center',
    icon,
    text: content,
    showConfirmButton: true,
    timer: 2000,
  });

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
