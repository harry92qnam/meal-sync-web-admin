import useRefetch from '@/hooks/states/useRefetch';
import apiClient from '@/services/api-services/api-client';
import { formatWeightForInput, toast } from '@/utils/MyUtils';
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react';
import { useFormik } from 'formik';
import React from 'react';
import * as yup from 'yup';

interface ContainerProps {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: (isOpen: boolean) => void;
}

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required('Vui lòng nhập tên vật đựng')
    .max(30, 'Tên vật đựng chỉ có tối đa 30 ký tự'),
  weight: yup.number().positive('Vui lòng nhập khối lượng'),
});

export default function ContainerCreateModal({ isOpen, onOpenChange }: ContainerProps) {
  const { setIsRefetch } = useRefetch();
  const formik = useFormik({
    initialValues: {
      name: '',
      weight: '',
    },
    validationSchema,
    onSubmit: (values) => {
      handleCreate(values);
    },
  });

  const handleCreate = async (values: any) => {
    try {
      const payload = {
        name: values.name,
        weight: values.weight,
      };
      const responseData = await apiClient.post('admin/food-packing-unit', payload);
      if (!responseData.data.isSuccess) {
        toast('error', responseData.data.error.message);
      } else {
        setIsRefetch();
        toast('success', 'Tạo mới vật đựng thành công');
      }
    } catch (error: any) {
      toast('error', error.response.data.error.message);
    }
    onOpenChange(false);
    formik.resetForm();
  };

  const handleCancel = (onClose: () => void) => {
    onClose();
    formik.resetForm();
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} hideCloseButton isDismissable={false}>
      <ModalContent>
        {(onClose) => (
          <React.Fragment>
            <ModalHeader className="flex flex-col text-2xl text-center">
              Tạo vật đựng mới
            </ModalHeader>
            <ModalBody>
              <form className="space-y-4">
                <Input
                  isRequired
                  type="text"
                  name="name"
                  label="Tên vật đựng"
                  placeholder="Nhập tên vật đựng"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.name && !!formik.errors.name}
                  errorMessage={formik.touched.name && formik.errors.name}
                />
                <Input
                  isRequired
                  type="text"
                  name="weight"
                  label="Khối lượng"
                  placeholder="Nhập khối lượng vật đựng"
                  value={
                    formik.values.weight
                      ? formatWeightForInput(formik.values.weight.toString())
                      : ''
                  }
                  onChange={(e) => {
                    const value = e.target.value;
                    const regex = /^\d*\.?\d{0,2}$/;
                    if (regex.test(value)) {
                      if (value.endsWith('.') && value.split('.').length > 2) {
                        return;
                      }
                      formik.setFieldValue('weight', value);
                    }
                  }}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.weight && !!formik.errors.weight}
                  errorMessage={formik.touched.weight && formik.errors.weight}
                  endContent={'kg'}
                />
              </form>
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="faded"
                onClick={() => handleCancel(onClose)}
                className="hover:text-danger-500 hover:border-danger-500"
              >
                Đóng
              </Button>
              <Button type="button" color="primary" onClick={() => formik.handleSubmit()}>
                Tạo
              </Button>
            </ModalFooter>
          </React.Fragment>
        )}
      </ModalContent>
    </Modal>
  );
}
