import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import DataTable from '../components/DataTable';
import {
  LoadingOutlined,
  PlusOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import { rowType } from '../constants/types';
import PostAccountModal from '../components/postAccountModal';
import { Toaster } from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import ToastController from '../controllers/ToastController';
import { getAccounts } from '../api/data';

const DataTableContainer: React.FC = () => {
  const toastController = ToastController();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<null | rowType>(null);
  const { data, isRefetching, isInitialLoading, refetch } = useQuery<rowType[]>(
    {
      queryKey: ['accounts'],
      queryFn: () => getAccounts(),
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
    }
  );
  const showModal = () => {
    setIsModalOpen(true);
    setSelectedRow(null);
  };

  const handleOk = () => {
    setSelectedRow(null);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedRow(null);
  };
  const handleEdit = (item: rowType) => {
    setSelectedRow(item);
    setIsModalOpen(true);
  };
  return (
    <div className='main-container'>
      <Toaster
        position='top-right'
        toastOptions={{
          duration: 4000,
          position: 'top-right',
        }}
      />
      <p className='text-lg font-bold text-left mb-2'>Bank Accounts</p>
      <div className='w-full flex flex-col space-y-3'>
        <div className='w-full flex lg:justify-end justify-start space-x-2'>
          <Button
            icon={<PlusOutlined className='m-auto' />}
            onClick={showModal}
          >
            New Bank Account
          </Button>
          <Button
            icon={!isRefetching ? <ReloadOutlined /> : <LoadingOutlined />}
            disabled={isRefetching}
            onClick={() => refetch()}
            className='flex justify-center items-center'
          />
        </div>
        <div className='w-full'>
          <DataTable
            dataSource={data ? data : []}
            loading={isInitialLoading}
            handleEdit={handleEdit}
          />
        </div>
      </div>

      <Modal
        title={selectedRow ? 'Update Account' : 'New Account'}
        open={isModalOpen}
        onOk={handleOk}
        afterClose={() => setSelectedRow(null)}
        onCancel={handleCancel}
        footer={[]}
        className='w-4/5'
        width={900}
      >
        <PostAccountModal item={selectedRow} handleCancel={handleCancel} />
      </Modal>
    </div>
  );
};
export default DataTableContainer;
