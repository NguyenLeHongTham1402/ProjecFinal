import React, { useEffect, useState } from 'react';
import { userSvc } from '@/store/modules/user'
import { Button, Space, Table } from 'antd';
import { Link } from 'react-router-dom';
import { numberFormat } from '@/utils/number'
import './styles.scss'
import {
  DeleteOutlined,
  EditOutlined

} from '@ant-design/icons';

function UsersList() {
  const [users, setUsers] = useState([])

  const loadData = async () => {
    const data = await userSvc.getUsers()
    setUsers(data)
  }

  const handleDelete = async (record) => {
    if (window.confirm('Do you want to delete this record?')) {
      const user = {
        ...record,
        isActive: false
      }
      const data = await userSvc.updateUser(user)
      if (Object.entries(data).length > 0) {
        window.alert('Delete Success!')
        loadData()
      }
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const columns = [
    {
      title: '',
      key: 'avatar',
      render: (_, record) => (
        <img width={80} src={record.avatar} alt={record.id} />
      ),
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      //   render: (text) => <a href='/' alt=''>{text}</a>,
    },
    {
      title: 'Fullname',
      dataIndex: 'fullname',
      key: 'fullname',
      //   render: (text) => <a href='/' alt=''>{text}</a>,
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone'
    },
    {
      title: 'action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Link to={`../edit/${record.id}`}><EditOutlined /></Link>
          <Button onClick={() => handleDelete(record)} type='link'><DeleteOutlined /></Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div>
        <Link to={'/register'}>Create</Link>
      </div>
      <div>
        <Table columns={columns} dataSource={users} rowKey="id" />
      </div>
    </>
  );
}

export default UsersList;