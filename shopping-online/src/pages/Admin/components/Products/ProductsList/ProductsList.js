import React, { useEffect, useState } from 'react';
import { prodsSvc } from '@/store/modules/products'
import { Button, Space, Table, Modal, Form, Input, Checkbox } from 'antd';
import { Link } from 'react-router-dom';
import { numberFormat } from '@/utils/number'
import './styles.scss'
import {
  DeleteOutlined,
  EditOutlined

} from '@ant-design/icons';

const { TextArea } = Input;

function ProductsList() {
  const [products, setProducts] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [product, setProduct] = useState({})
  const [form] = Form.useForm();

  const showModal = (record) => {
    setIsModalOpen(true);
    setProduct({
      ...record,
      discounts:String(record.discounts)
    })
    // form.setFieldsValue({
      // name:product.name,
      // SKU:product.SKU,
      // description:product.description,
      // price:product.price,
      // discounts:product.discounts
    // })
  };

  useEffect(() => {
    if(Object.entries(product).length > 0)
      form.setFieldsValue({
        name:product.name,
        SKU:product.SKU,
        description:product.description,
        price:product.price,
        discounts:product.discounts
      })
  }, [form, product]);

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const loadData = async () => {
    const data = await prodsSvc.getProducts('', '', -1, -1)
    setProducts(data)
    
  }

  const handleDelete = async (values) => {
    if (window.confirm('Do you want delete this record')) {
      const product = {
        ...values,
        isActive: false
      }
      const data = await prodsSvc.editProduct(product)
      if (Object.entries(data).length > 0) {
        window.alert('Delete Success!')
        loadData()
      }
    }

  }

  const onFinish = async (values) => {
    const discount = values.discounts!==undefined ? Boolean(values.discounts[0]) : false
    const p = {
      ...product,
      name:values.name,
      price:Number(values.price),
      description:values.description,
      SKU:values.SKU,
      discounts:discount
    }
    const data = await prodsSvc.editProduct(p)
      if (Object.entries(data).length > 0) {
        window.alert('Update Success!')
        loadData()
        setIsModalOpen(false)
      }
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    setIsModalOpen(false)
  }

  useEffect(() => {
    loadData()
  }, [])

  const columns = [
    {
      title: '',
      key: 'Image',
      render: (_, record) => (
        <img width={80} src={record.images[0].path} alt={record.id} />
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      //   render: (text) => <a href='/' alt=''>{text}</a>,
    },
    {
      title: '',
      key: 'Image',
      render: (_, record) => (
        numberFormat(record.price) + ' đ'
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Link onClick={() => showModal(record)}><EditOutlined /></Link>
          <Button onClick={() => handleDelete(record)} type='link'><DeleteOutlined /></Button>
        </Space>
      ),
    },
  ];


  return (
    <>
      <div>
        <Link to={'../add-update'}>Create</Link>
      </div>

      <div>
        <Table columns={columns} dataSource={products} rowKey="id" />
      </div>

      <div>
        <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
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
                  message: 'Please input product name!',
                },
              ]}
            >
              <Input placeholder={product.name} />
            </Form.Item>

            <Form.Item
              label="SKU"
              name="SKU"
              rules={[
                {
                  required: true,
                  message: 'Please input product SKU!',
                },
              ]}
            >
              <Input placeholder={product.SKU} />
            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
              rules={[
                {
                  required: true,
                  message: 'Please input product description!',
                },
              ]}
            >
              <TextArea placeholder={product.description} rows={6} />
            </Form.Item>

            <Form.Item
              label="Price"
              name="price"
              rules={[
                {
                  required: true,
                  message: 'Please input product price!',
                },
              ]}
            >
              <Input placeholder={product.price} />
            </Form.Item>

            <Form.Item
              label="Is Discount"
              name="discounts"
            >
              <Checkbox.Group style={{ width: '100%' }} >
                <Checkbox value="true"></Checkbox>
              </Checkbox.Group>
            </Form.Item>

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

export default ProductsList;