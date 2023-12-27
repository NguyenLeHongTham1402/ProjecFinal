import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Col, Checkbox, Row, Radio } from 'antd';
import { Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { catesActions, catesSelectors } from '@/store/modules/category'
import {userSvc} from '@/store/modules/user'
import {prodsSvc} from '@/store/modules/products'

function CreateUpdate() {
    const dispatch = useDispatch()
    const { Title } = Typography;
    const { TextArea } = Input;
    const categories = useSelector(catesSelectors.selectCates)
    const [imgs, setImgs]=useState([])
    const [form] = Form.useForm()

    const onFinish = async (values) => {
        
        const sizes = []
        const cates = []
        const discount = values.discounts!==undefined ? Boolean(values.discounts[0]) : false
        let quantity = 0
        let note=''
        let image = 'https://res.cloudinary.com/dp50hyprx/image/upload/v1689932558/default-product_jtohaf.jpg'
        

        if(values.images!==undefined){
            const result = await userSvc.UploadFile(imgs)
            // console.log(result)
            image = result.secure_url
        }

        if(values.sizes!==undefined)
        {
            quantity=values.sizes.length*30;
            for(let i=0; i < values.sizes.length ; i++){
                const size = {
                    sizeId:i+1,
                    name:values.sizes[i],
                    quantity:30
                }
                sizes.push(size)
            }
        }
        
        if(values.cates!==undefined){
            for(let i=0; i <values.cates.length ; i++){
                const category = values.cates[i].split('#');
                if(category[1] > 0){
                    const cate = {
                        cateId:category[2],
                        desc:category[0]
                    }
                    cates.push(cate)     
                    note=note+'#C'+category[1]+'#SC'+category[2]              
                }
                else{
                    note=note+'#C'+category[2]
                }
                
            }
        }

        
        const product = {
            ...values,
            cates:cates,
            price:Number(values.price),
            discounts:discount,
            images:[
                {
                    imageId:1,
                    path:image
                }
            ],
            sizes:sizes,
            quantity:quantity,
            note:note,
            colors:[],
            isActive:true
        }
        // console.log(product)

        const response = await prodsSvc.addProduct(product)
        if(Object.entries(response).length > 0){
            window.alert('Add Product Success!')
        }
        form.resetFields()
    };

    const changeHandler=(e)=>{
        if (e.target.files.length > 0) {
         let files = e.target.files;
          console.log(files)
          setImgs(files)
        }
      }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        dispatch(catesActions.get())
    },[])

    return (
        <>
            <Title level={2}></Title>
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
                form={form}
                autoComplete="off"
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
                    <Input />
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
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Image"
                    name="images"
                    rules={[
                        {
                            required: true,
                            message: 'Please choose product images!',
                        },
                    ]}
                >
                    <Input type='file' onChange={changeHandler}/>
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
                    <TextArea rows={6} />
                </Form.Item>

                <Form.Item
                    label="Size"
                    name="sizes"
                    rules={[
                        {
                            required: true,
                            message: 'Please input choose size!',
                        },
                    ]}
                >
                    <Checkbox.Group style={{ width: '100%' }}>
                        <Row>
                            <Col span={8}>
                                <Checkbox value="S">S</Checkbox>
                            </Col>
                            <Col span={8}>
                                <Checkbox value="M">M</Checkbox>
                            </Col>
                            <Col span={8}>
                                <Checkbox value="L">L</Checkbox>
                            </Col>
                            <Col span={8}>
                                <Checkbox value="XL">XL</Checkbox>
                            </Col>
                            <Col span={8}>
                                <Checkbox value="2XL">2XL</Checkbox>
                            </Col>
                            <Col span={8}>
                                <Checkbox value="FS">Free Size</Checkbox>
                            </Col>
                        </Row>
                    </Checkbox.Group>
                </Form.Item>

                <Form.Item
                    label="Price"
                    name="price"
                    rules={[
                        {
                            required: true,
                            message: 'Please input product price!'
                        },
                        {
                            pattern:/^([0-9]*[1-9][0-9]*(\.[0-9]+)?|[0]+\.[0-9]*[1-9][0-9]*)$/,
                            message:'Please input number greater than 0!'
                        }
                    ]}
                >
                    <Input />
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
                    label="Categories"
                    name="cates"
                    rules={[
                        {
                            required: true,
                            message: 'Please choose product category!',
                        },
                    ]}
                >
                    <Checkbox.Group style={{ width: '100%' }}>
                        <Row>
                            {categories.map(c => (
                                <Col key={c.id} span={10}>
                                    <Checkbox value={`${c.name}#${c.parentId}#${c.id}`}>
                                        {c.name}
                                    </Checkbox>
                                </Col>
                            ))}
                        </Row>
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
        </>
    );
}

export default CreateUpdate;