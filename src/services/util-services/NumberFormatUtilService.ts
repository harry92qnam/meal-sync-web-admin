const numberFormatUtilService = {
  hashId: (id: number): number => {
    let hash = 5381;
    let strId = id.toString();

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
export default numberFormatUtilService;
