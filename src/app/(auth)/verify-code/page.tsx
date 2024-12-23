'use client';
import HeaderAuthentication from '@/components/authentication/HeaderAuthentication';
import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function VerifyCodeReset() {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();
  const [code, setCode] = useState(['', '', '', '']);
  const [countDown, setCountDown] = useState(120);

  useEffect(() => {
    const id = setInterval(() => {
      setCountDown((pre) => {
        if (pre <= 1) {
          clearInterval(id);
          return 0;
        }
        return pre - 1;
      });
    }, 1000);

    return () => clearInterval(id);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    // Allow only numbers
    if (/^\d*$/.test(value)) {
      setCode((prevCode) => {
        const newCode = [...prevCode];
        newCode[index] = value;
        return newCode;
      });

      if (value !== '' && index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && index > 0 && code[index] === '') {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      handleSubmitBtn();
    } catch (error: any) {
      console.error(error);
    }
  };

  const handleSubmitBtn = async () => {
    console.log('OTP:', code.join(''));
    // Handle logic here
    router.push('/reset-password');
  };

  const handleResendOTP = async () => {
    // Implement logic for resending OTP here
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <div className="w-full max-w-[500px] bg-white rounded-lg shadow-md border border-gray-200 p-12">
        <HeaderAuthentication />
        <p className="text-center my-10 text-xl font-medium">Nhập mã OTP</p>
        <form onSubmit={onFormSubmit} className="space-y-4">
          <div className="flex justify-between">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(ref) => {
                  inputRefs.current[index] = ref;
                }}
                className="codeInput text-4xl text-center w-1/5 border-b border-gray-300 mx-1 text-primary focus:border-primary focus:outline-none"
                type="tel"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            ))}
          </div>
          <div className="flex justify-center gap-1">
            {countDown <= 0 ? (
              <p className=" text-gray-400">Mã OTP đã hết hạn. </p>
            ) : (
              <p className=" text-gray-400">
                Mã OTP sẽ hết hạn sau <span className="text-primary">{countDown}</span> giây.
              </p>
            )}
            <p
              className="text-primary hover:cursor-pointer hover:text-opacity-80"
              onClick={handleResendOTP}
            >
              Gửi lại mã?
            </p>
          </div>
          <div>
            <Button type="submit" color="primary" className="w-full mt-4 py-6 text-lg">
              Xác thực
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
