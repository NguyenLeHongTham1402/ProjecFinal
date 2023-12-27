import React, { useCallback, useEffect, useState } from 'react';
import { SubNav } from '../styled';
import { catesSvc, catesSelectors } from "@/store/modules/category"
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

function SubNavigation({ cateId, w, x}) {
    const dispatch = useDispatch()
    const data = useSelector(catesSelectors.selectCates)

    const [subCates, setSubCates] = useState([])

    const getSubCategories = useCallback(() => {  
        const result = catesSvc.getSubCategories(data, cateId)
        setSubCates(result)
    },[])

    useEffect(()=>{
        getSubCategories()
    }, [getSubCategories])

    return (
        <SubNav id={`sub-cate${cateId}`} $width={w} $pos={x}>
            {(subCates || []).map(sc => (
                <li key={sc.id}>
                    <Link to={'/?category='+sc.name+'&n=SC'+sc.id} >{sc.name}</Link>
                </li>
            ))}
        </SubNav>
    );
}

export default SubNavigation