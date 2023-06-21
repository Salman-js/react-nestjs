import React, { useEffect, useMemo } from 'react';
import { rowType } from '../constants/types';
import { Row, Col, Form, Button, Select, DatePicker } from 'antd';
import { CustomInput, CustomNumberInput } from './customInputs';
import dayjs from 'dayjs';
import { createAccount, updateAccount } from '../api/data';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import ToastController from '../controllers/ToastController';

type postAccountModalProps = {
  item: rowType | null;
  handleCancel: () => void;
};
const PostAccountModal: React.FC<postAccountModalProps> = ({
  item,
  handleCancel,
}) => {
  const toastController = ToastController();
  const [form] = Form.useForm();
  const fieldData = useMemo(() => {
    if (item) {
      return {
        ...item,
        date: dayjs(dayjs(item.date).format('DD/MM/YYYY'), 'DD/MM/YYYY'),
      };
    } else {
      return {
        bankName: '',
        accountNumber: '',
        accountType: '',
        startingBalance: '',
        date: dayjs(dayjs(new Date()).format('DD/MM/YYYY'), 'DD/MM/YYYY'),
        minimum: '',
        country: '',
        currency: '',
      };
    }
  }, [item]);
  const queryClient = useQueryClient();
  const postMutation = useMutation({
    mutationFn: item ? updateAccount : createAccount,
    onSuccess: () => {
      if (item) {
        toastController.update();
        queryClient.invalidateQueries(['accounts', item.id], { exact: true });
      } else {
        toastController.create();
      }
      queryClient.invalidateQueries(['accounts'], { exact: true });
      handleCancel();
    },
    onError: (error: any) => {
      if (error.response) {
        if (error.response.data.errors) {
          error.response.data.errors.map((err: string) => {
            toastController.error(err.split(':')[0]);
          });
        } else {
          toastController.error(error.response.data.message);
        }
      } else {
        toastController.error('Network error. Please, try again');
      }
      console.log(error);
    },
  });

  const handleFormSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        if (item) {
          postMutation.mutate({ ...values, id: item.id });
        } else {
          postMutation.mutate({
            ...values,
            currentBalance: values.startingBalance,
          });
        }
      })
      .catch((error) => {
        console.error('Form Validation Error:', error);
      });
  };

  useEffect(() => {
    form.setFieldsValue(fieldData);
  }, [form, fieldData]);
  return (
    <div className='w-full mt-6'>
      <Form
        layout='vertical'
        form={form}
        name='control-hooks'
        className='w-full'
      >
        <Row gutter={[16, 0]}>
          <Col lg={8} xs={12}>
            <CustomInput
              name='bankName'
              label='Bank Name'
              placeholder='bank name'
              onChange={(value: string | null) =>
                form.setFieldsValue({ bankName: value })
              }
            />
          </Col>
          <Col lg={8} xs={12}>
            <CustomInput
              name='accountNumber'
              label='Account Number'
              placeholder='account number'
              onChange={(value: string | null) =>
                form.setFieldsValue({ accountNumber: value })
              }
            />
          </Col>
          <Col lg={8} xs={12}>
            <Form.Item
              name='accountType'
              label='Account Type'
              rules={[{ required: true, message: 'This field is required' }]}
            >
              <Select
                onChange={(value: string) =>
                  form.setFieldsValue({ accountType: value })
                }
                options={[
                  {
                    value: 'checking',
                    label: 'Checking',
                  },
                  {
                    value: 'saving',
                    label: 'Saving',
                  },
                ]}
                placeholder='Account type'
                allowClear
              />
            </Form.Item>
          </Col>
          <Col lg={8} xs={12}>
            <CustomNumberInput
              name='startingBalance'
              label='Starting balance'
              placeholder='starting balance'
              onChange={(value: string | null) =>
                form.setFieldsValue({ startingBalance: value })
              }
            />
          </Col>
          <Col lg={8} xs={12}>
            <Form.Item
              name='date'
              label='Date'
              rules={[{ required: true, message: 'This field is required' }]}
            >
              <DatePicker
                className='w-full'
                placeholder='Date'
                onChange={(date, dateString) =>
                  form.setFieldsValue({ date: date })
                }
                format='DD/MM/YYYY'
              />
            </Form.Item>
          </Col>
          <Col lg={8} xs={12}>
            <CustomNumberInput
              name='minimum'
              label='Minimum balance warning'
              placeholder='minimum balance warning'
              onChange={(value: string | null) =>
                form.setFieldsValue({ minimum: value })
              }
            />
          </Col>
          <Col lg={8} xs={12}>
            <Form.Item
              name='country'
              label='Country'
              rules={[{ required: true, message: 'This field is required' }]}
            >
              <Select
                onChange={(value: string) =>
                  form.setFieldsValue({ country: value })
                }
                options={[
                  {
                    value: 'Ethiopia',
                    label: 'Ethiopia',
                  },
                  {
                    value: 'other',
                    label: 'Other',
                  },
                ]}
                placeholder='Country'
                allowClear
              />
            </Form.Item>
          </Col>
          <Col lg={8} xs={12}>
            <Form.Item
              name='currency'
              label='Currency'
              rules={[{ required: true, message: 'This field is required' }]}
            >
              <Select
                onChange={(value: string) =>
                  form.setFieldsValue({ currency: value })
                }
                options={[
                  {
                    value: 'ETB',
                    label: 'ETB',
                  },
                  {
                    value: '$',
                    label: '$',
                  },
                ]}
                placeholder='Currency'
                allowClear
              />
            </Form.Item>
          </Col>
        </Row>
        <div className='w-full flex flex-row space-x-2 justify-end'>
          <Form.Item>
            <Button
              type='primary'
              loading={postMutation.isLoading}
              htmlType='submit'
              className='bg-blue-500'
              onClick={handleFormSubmit}
            >
              {item ? 'Update' : 'Submit'}
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};
export default PostAccountModal;
