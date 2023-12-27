import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import { catesSelectors } from '@/store/modules/category'
import {
    Form,
    Input,
    Checkbox,
    Radio
} from 'antd';
import { useSelector } from 'react-redux';

function AddUpd() {

    const [category, setCategory] = useState()
    const catesParent = useSelector(catesSelectors.selectParentCates)


    return (
        <></>
    );
}

export default AddUpd;