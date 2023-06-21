import React, { useRef, useState } from 'react';
import { rowType } from '../constants/types';
import { Button, Col, Row, Tooltip } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { getAccount } from '../api/data';
import { useReactToPrint } from 'react-to-print';
import {
  LoadingOutlined,
  PrinterOutlined,
  ReloadOutlined,
} from '@ant-design/icons';

type viewAccountModalProps = {
  item: rowType;
};

const ViewAccountModal: React.FC<viewAccountModalProps> = ({ item }) => {
  const printRef = useRef<HTMLDivElement>(null);
  const [givenItem, setGivenItem] = useState<rowType>(item);
  const { isRefetching, refetch } = useQuery({
    queryKey: ['accounts', item.id],
    queryFn: () => getAccount(item.id),
    onError: (error: any) => {
      console.log(error);
    },
    onSuccess: (data: rowType) => {
      setGivenItem(data);
    },
  });
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });
  return (
    <div className='w-full mt-6'>
      <Row gutter={[16, 16]} ref={printRef} className='p-6'>
        <Col lg={12} xs={24}>
          <p className='font-semibold tetx-lg'>
            Account number:{' '}
            <span className='font-normal'>{givenItem.accountNumber}</span>
          </p>
        </Col>
        <Col lg={12} xs={24}>
          <p className='font-semibold tetx-lg'>
            Bank name: <span className='font-normal'>{givenItem.bankName}</span>
          </p>
        </Col>
        <Col lg={12} xs={24}>
          <p className='font-semibold tetx-lg'>
            Account type:{' '}
            <span className='font-normal'>{givenItem.accountType}</span>
          </p>
        </Col>
        <Col lg={12} xs={24}>
          <p className='font-semibold tetx-lg'>
            Country: <span className='font-normal'>{givenItem.country}</span>
          </p>
        </Col>
        <Col lg={12} xs={24}>
          <p className='font-semibold tetx-lg'>
            Currency: <span className='font-normal'>{givenItem.currency}</span>
          </p>
        </Col>
        <Col lg={12} xs={24}>
          <p className='font-semibold tetx-lg'>
            Starting balance:{' '}
            <span className='font-normal'>{givenItem.startingBalance}</span>
          </p>
        </Col>
        <Col lg={12} xs={24}>
          <p className='font-semibold tetx-lg'>
            Current balance:{' '}
            <span className='font-normal'>{givenItem.currentBalance}</span>
          </p>
        </Col>
        <Col lg={12} xs={24}>
          <p className='font-semibold tetx-lg'>
            Min. Balance Warning:{' '}
            <span className='font-normal'>{givenItem.minimum}</span>
          </p>
        </Col>
        <Col lg={12} xs={24}>
          <p className='font-semibold tetx-lg'>
            Date created:{' '}
            <span className='font-normal'>
              {new Date(givenItem.createdAt).toLocaleDateString()}
            </span>
          </p>
        </Col>
        <Col lg={12} xs={24}>
          <p className='font-semibold tetx-lg'>
            Last updated:{' '}
            <span className='font-normal'>
              {new Date(givenItem.updatedAt).toLocaleDateString()}
            </span>
          </p>
        </Col>
      </Row>
      <div className='w-full flex flex-row justify-end p-0 space-x-2'>
        <Tooltip title='Refresh'>
          <Button
            icon={!isRefetching ? <ReloadOutlined /> : <LoadingOutlined />}
            disabled={isRefetching}
            onClick={() => refetch()}
            className='flex justify-center items-center'
          />
        </Tooltip>
        <Tooltip title='Print'>
          <Button
            icon={<PrinterOutlined />}
            onClick={handlePrint}
            className='flex justify-center items-center'
          />
        </Tooltip>
      </div>
    </div>
  );
};
export default ViewAccountModal;
