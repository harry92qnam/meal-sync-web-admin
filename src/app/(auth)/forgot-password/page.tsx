'use client';
import HeaderAuthentication from '@/components/authentication/HeaderAuthentication';
import AuthProvider from '@/configs/providers/AuthProvider';
import { Button, Input } from '@nextui-org/react';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .matches(/^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/, 'Email không hợp lệ!')
    .required('Vui lòng nhập email'),
});

export default function ForgotPassword() {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema,
    onSubmit: (values) => {
      console.log('Reset email:', values);
      // Handle logic here
      router.push('/verify-code');
    },
  });

  return (
    <AuthProvider role={'guest'}>
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
        <div className="w-full max-w-[500px] bg-white rounded-lg shadow-md border border-gray-200 p-12">
          <HeaderAuthentication />
          <p className="text-center my-10 text-xl font-medium">Nhập email để lấy lại mật khẩu</p>
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
            <div>
              <Button type="submit" color="primary" className="w-full mt-4 py-6 text-lg">
                Lấy lại mật khẩu
              </Button>
            </div>
          </form>
        </div>
      </div>
    </AuthProvider>
  );
}
