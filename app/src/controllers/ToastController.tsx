import {
  CloseCircleFilled,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { Popover } from 'antd';
import toast from 'react-hot-toast';

const ToastController = () => {
  const create = async () => {
    toast.success('Data submitted');
  };
  const update = async () => {
    toast.success('Data updated');
  };
  const remove = () => {
    toast.success('Data removed');
  };
  const serverError = (error: string) => {
    toast(
      () => (
        <div className='flex flex-col'>
          <div className='flex flex-row justify-between space-x-4'>
            <div className='flex flex-row space-x-3'>
              <CloseCircleFilled className='text-red-500 my-auto' />
              <div>
                <p className='font-semibold text-red-400'>
                  {error.split(':')[0]}
                </p>
              </div>
            </div>
            <Popover
              content={<div className='w-32'>{error}</div>}
              title='Detail'
              className='m-3'
            >
              <ExclamationCircleOutlined className='text-red-500 my-auto' />
            </Popover>
          </div>
        </div>
      ),
      { duration: 15000 }
    );
  };
  const error = (error: string) => {
    toast.error(error);
  };
  return {
    create,
    update,
    remove,
    serverError,
    error,
  };
};

export default ToastController;
