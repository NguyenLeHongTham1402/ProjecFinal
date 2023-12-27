import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { catesActions, catesSelectors, catesSvc } from '@/store/modules/category'
import { Button, Space, Table, Form, Input, Checkbox, Modal } from 'antd';
import { Link } from 'react-router-dom';
import './styles.scss'
import {
  DeleteOutlined,
  EditOutlined

} from '@ant-design/icons';

function CategoryList() {
  const dispatch = useDispatch()
  const categories = useSelector(catesSelectors.selectCates)
  const parentCategories = useSelector(catesSelectors.selectParentCates)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isParent, setIsParent] = useState(false)
  const [title, setTitle] = useState('')
  const [cate, setCate] = useState({})
  const [form] = Form.useForm()

  useEffect(() => {
    dispatch(catesActions.get())
  }, [])

  useEffect(() => {
    if (Object.entries(cate).length > 0)
      form.setFieldsValue({
        name: cate.name,
        isParent: String(cate.isParent),
        parentId: String(cate.parentId)
      })
  }, [form, cate]);

  const showModal = (values, t) => {
    setTitle(t)
    setIsModalOpen(true);
    setCate(values)
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields()
  };

  const onFinish = async (values) => {
    let parentId = 0
    let isParent = true
    if (values.isParent !== undefined) {
      parentId = Number(values.parentId[0])
      isParent = false
    }

    if (title === 'Add') {
      const category = {
        name: values.name,
        parentId: parentId,
        isParent: isParent,
        isActive: true
      }
      // console.log(category)
      const data = await catesSvc.addCategory(category)
      if (Object.entries(data).length > 0) {
        window.alert('Add Success!')
        dispatch(catesActions.get())
        setIsModalOpen(false)
      }
    }
    else if (title === 'Update') {
      const c = {
        ...cate,
        name: values.name,
        parentId: parentId,
        isParent: isParent
      }
      const data = await catesSvc.updateCategory(c)
      if (Object.entries(data).length > 0) {
        window.alert('Update Success!')
        dispatch(catesActions.get())
        setIsModalOpen(false)
      }
    }
    form.resetFields()
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    setIsModalOpen(false)
  }

  const handleChangeValue = (e) => {
    setIsParent(!isParent)
  }

  const handleDelete = async (record) => {
    if (window.confirm('Do you want to delete this record?')) {
      const category = {
        ...record,
        isActive: false
      }
      const data = await catesSvc.updateCategory(category)
      if (Object.entries(data).length > 0) {
        window.alert('Delete Success!')
        dispatch(catesActions.get())
      }
    }
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      //   render: (text) => <a href='/' alt=''>{text}</a>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Link onClick={() => showModal(record, 'Update')}><EditOutlined /></Link>
          {record.isParent && (
            <Button type='link' onClick={() => handleDelete(record)} disabled><DeleteOutlined /></Button>
          )}
          {!record.isParent && (
            <Button type='link' onClick={() => handleDelete(record)}><DeleteOutlined /></Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <>
      <div>
        <Link onClick={() => showModal({}, 'Add')}>Create</Link>
      </div>

      <div>
        <Table columns={columns} dataSource={categories} rowKey="id"
          rowClassName={(record, index) => (record.isParent ? "bold" : "none")} />
      </div>

      <div>
        <Modal title={`${title} Category`} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
          style={{
            top: 20,
          }} footer={null}>
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            form={form}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Please input category name!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Is SubCategory?"
              name="isParent"
              
            >
              <Checkbox.Group style={{ width: '100%' }} >
                {title==='Update' && (
                  <Checkbox onChange={handleChangeValue} value="false" disabled></Checkbox>
                )}
                {title==='Add' && (
                  <Checkbox onChange={handleChangeValue} value="false"></Checkbox>
                )}
                
              </Checkbox.Group>
            </Form.Item>

            {
              (isParent || !cate.isParent) && (
                <Form.Item
                  label="Parent Category"
                  name="parentId"
                >
                  <Checkbox.Group style={{ width: '100%' }} >
                    {parentCategories.map(c => (
                      <Checkbox className='par' key={c.id} value={c.id} id={`par${c.id}`}>
                        {c.name}
                      </Checkbox>
                    ))}

                  </Checkbox.Group>
                </Form.Item>
              )
            }


            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>

            </Form.Item>
          </Form>
        </Modal>
      </div>
    </>
  );
}

export default CategoryList;