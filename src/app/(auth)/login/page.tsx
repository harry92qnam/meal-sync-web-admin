'use client';
import AuthProvider from '@/configs/providers/AuthProvider';
import apiClient from '@/services/api-services/api-client';
import sessionService from '@/services/session-service';
import AuthDTO from '@/types/dtos/AuthDTO';
import { Button, Image, Input } from '@nextui-org/react';
import { useFormik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import * as yup from 'yup';

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .matches(/^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/, 'Email không hợp lệ!')
    .required('Vui lòng nhập email'),
  password: yup
    .string()
    .min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
    .max(25, 'Mật khẩu chỉ có tối đa 25 ký tự')
    .matches(/[0-9]/, 'Mật khẩu phải chứa ít nhất một ký tự số (0-9)')
    .matches(/[a-z]/, 'Mật khẩu phải chứa ít nhất một chữ cái in thường (a-z)')
    .matches(/[A-Z]/, 'Mật khẩu phải chứa ít nhất một chữ cái in hoa (A-Z)')
    .matches(
      /[^\w]/,
      'Mật khẩu phải chứa ít nhất một ký tự đặc biệt (`, ~, !, @, #, $, %, ^, &, *, ?)',
    )
    .required('Vui lòng nhập mật khẩu'),
});

export default function Login() {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const router = useRouter();

  const toggleVisibility = () => setIsVisible(!isVisible);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log('Form submitted with values:', values);
      setIsSubmitting(true);
      setServerError(null); // Reset error before making API call
      try {
        const response = await apiClient.post('auth/login', {
          loginContext: 4,
          ...values,
        });
        const token = response.data?.value?.tokenResponse?.accessToken || '';
        // console.log(response.data);
        const role =
          response.data?.value?.accountResponse?.roleName?.toLowerCase() == 'admin'
            ? 'admin'
            : 'moderator';
        const authDTO = response.data?.value?.accountResponse
          ? (response.data?.value?.accountResponse as AuthDTO)
          : null;
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
        if (authDTO) sessionService.setAuthDTO(authDTO);
        // console.log('token - role', token, role);
        setServerError(null);
        // Handle logic here
        if (role == 'moderator') router.push('/orders');
        else router.push('/dashboard');
      } catch (error: any) {
        console.log(error);
        if (error.response && error.response.status === 403) {
          setServerError('Email hoặc mật khẩu không đúng');
        } else {
          setServerError(
            error?.response?.data?.error?.message || 'Hệ thống đang bảo trì, vui lòng thử lại sau!',
          );
        }
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <AuthProvider role={'guest'}>
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
        <div className="w-full max-w-[500px] bg-white rounded-lg shadow-md border border-gray-200 p-12">
          <div className="flex items-center mb-8 justify-center gap-4">
            <Image alt="MealSync Logo" height={32} radius="md" src="./images/logo.png" width={32} />
            <div className="flex flex-col">
              <h1 className="text-2xl font-medium">MealSync</h1>
            </div>
          </div>

          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <Input
              type="email"
              name="email"
              label="Email"
              placeholder="Nhập email của bạn"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.email && !!formik.errors.email}
              errorMessage={formik.touched.email && formik.errors.email}
            />
            <Input
              type={isVisible ? 'text' : 'password'}
              name="password"
              label="Mật khẩu"
              placeholder="Nhập mật khẩu của bạn"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.password && !!formik.errors.password}
              errorMessage={formik.touched.password && formik.errors.password}
              endContent={
                <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                  {isVisible ? (
                    <FaEye className="text-2xl text-default-400" />
                  ) : (
                    <FaEyeSlash className="text-2xl text-default-400" />
                  )}
                </button>
              }
            />
            <div className="flex justify-end">
              <Link href={'forgot-password'}>
                <p className="underline text-primary text-sm w-28">Quên mật khẩu?</p>
              </Link>
            </div>
            {!(formik.touched.password && formik.errors.password ? formik.errors.password : '') &&
              !(formik.touched.email && formik.errors.email ? formik.errors.email : '') &&
              serverError && (
                <p className="text-red-500 text-center mt-3 font-semibold">{serverError}</p>
              )}

            <Button
              type="submit"
              color="primary"
              className="w-full py-6 text-lg"
              isLoading={isSubmitting}
            >
              Đăng nhập
            </Button>
          </form>
        </div>
      </div>
    </AuthProvider>
  );
}
