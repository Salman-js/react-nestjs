import React from 'react';
import { Input, Form, InputNumber } from 'antd';

type customInputProps = {
  name: string;
  label: string;
  placeholder: string;
  onChange: (value: string | null) => void;
};

export const CustomInput: React.FC<customInputProps> = ({
  name,
  label,
  placeholder,
  onChange,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onChange(value);
  };
  return (
    <Form.Item
      name={name}
      label={label}
      rules={[{ required: true, message: 'This field is required' }]}
    >
      <Input placeholder={placeholder} onChange={handleChange} />
    </Form.Item>
  );
};

export const CustomNumberInput: React.FC<customInputProps> = ({
  name,
  label,
  placeholder,
  onChange,
}) => {
  return (
    <Form.Item
      name={name}
      className='w-full'
      label={label}
      rules={[{ required: true, message: 'This field is required' }]}
    >
      <InputNumber
        placeholder={placeholder}
        onChange={onChange}
        className='w-full'
        controls={false}
      />
    </Form.Item>
  );
};
