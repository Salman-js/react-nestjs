import React, { useRef, useState } from 'react';
import { Table, Dropdown, Button, Modal, Space, Input } from 'antd';
import { rowType } from '../constants/types';
import {
  MoreOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import ToastController from '../controllers/ToastController';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteAccount } from '../api/data';
import ViewAccountModal from './viewAccountModal';
import type { ColumnType, ColumnsType } from 'antd/es/table';
import { FilterConfirmProps } from 'antd/es/table/interface';
import type { InputRef } from 'antd';
import Highlighter from 'react-highlight-words';

type DataTableProps = {
  dataSource: rowType[];
  loading: boolean;
  handleEdit: (item: rowType) => void;
};
interface DataType {
  id: number;
  accountNumber: number;
  bankName: string;
  accountType: string;
  minimum: number;
  country: string;
  date: string;
  currency: 'ETB' | '$';
  startingBalance: number | string;
  currentBalance: number | string;
  updatedAt: Date;
  createdAt: Date;
}
const DataTable: React.FC<DataTableProps> = ({
  dataSource,
  loading,
  handleEdit,
}) => {
  const toastController = ToastController();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<null | rowType>(null);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

  type DataIndex = keyof DataType;

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): ColumnType<DataType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type='primary'
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size='small'
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size='small'
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type='link'
            size='small'
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type='link'
            size='small'
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columns: ColumnsType<DataType> = [
    {
      title: 'Number',
      dataIndex: 'number',
      key: 'number',
      render: (_: number, record: rowType, index: number) => (
        <span>{index + 1}</span>
      ),
    },
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      sorter: (a: rowType, b: rowType) => a.id - b.id,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Account number',
      dataIndex: 'accountNumber',
      key: 'accountNumber',
      ...getColumnSearchProps('accountNumber'),
    },
    {
      title: 'Bank name',
      dataIndex: 'bankName',
      key: 'bankName',
      ...getColumnSearchProps('bankName'),
    },
    {
      title: 'Account type',
      dataIndex: 'accountType',
      key: 'accountType',
      render: (_: number, record: rowType) => (
        <span>
          {record.accountType.charAt(0).toUpperCase() +
            record.accountType.slice(1)}
        </span>
      ),
      filters: [
        {
          text: 'Checking',
          value: 'checking',
        },
        {
          text: 'Saving',
          value: 'saving',
        },
      ],
      onFilter: (value: string | number | boolean, record: DataType) =>
        record.accountType === String(value),
    },
    {
      title: 'Country',
      dataIndex: 'country',
      key: 'country',
    },
    {
      title: 'Currency',
      dataIndex: 'currency',
      key: 'currency',
    },
    {
      title: 'Starting balance',
      dataIndex: 'startingBalance',
      key: 'startingBalance',
      render: (_: number, record: rowType) => (
        <span>
          {record.startingBalance
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        </span>
      ),
    },
    {
      title: 'Current balance',
      dataIndex: 'currentBalance',
      key: 'currentBalance',
      render: (_: number, record: rowType) => (
        <span>
          {record.currentBalance
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        </span>
      ),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'tags',
      render: (_: number, record: rowType) => (
        <Dropdown
          menu={{
            items: [
              {
                key: '1',
                label: 'View',
                icon: <EyeOutlined />,
                onClick: () => {
                  setSelectedItem(record);
                  setIsModalOpen(true);
                },
              },
              {
                key: '2',
                label: 'Edit',
                icon: <EditOutlined />,
                onClick: () => handleEdit(record),
              },
              {
                key: '3',
                label: 'Delete',
                icon: <DeleteOutlined />,
                onClick: () => handleDelete(record.id),
              },
            ],
          }}
          placement='bottomRight'
          arrow={{ pointAtCenter: true }}
          trigger={['click']}
        >
          <Button
            type='text'
            icon={<MoreOutlined />}
            className='flex justify-center items-center'
          />
        </Dropdown>
      ),
    },
  ];

  const queryClient = useQueryClient();
  const removeMutation = useMutation({
    mutationFn: deleteAccount,
    onSuccess: () => {
      toastController.remove();
      queryClient.invalidateQueries(['accounts'], { exact: true });
    },
    onError: (error: any) => {
      if (error.response) {
        error.response.data.errors.map((err: string) => {
          toastController.error(err.split(':')[0]);
        });
      } else {
        toastController.error('Network error. Please, try again');
      }
      console.log(error);
    },
  });

  const handleDelete = (id: number) => {
    removeMutation.mutate(id);
  };

  return (
    <>
      <Table dataSource={dataSource} columns={columns} loading={loading} />
      <Modal
        title='Bank Account'
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        afterClose={() => setSelectedItem(null)}
        onCancel={() => setIsModalOpen(false)}
        footer={[]}
        width={700}
      >
        {selectedItem && <ViewAccountModal item={selectedItem} />}
      </Modal>
    </>
  );
};
export default DataTable;
