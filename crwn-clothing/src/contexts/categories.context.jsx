import React, {createContext, useState, useEffect} from 'react';
import SHOP_DATA from "../shop-data";
import { addCollectionAndDocuments } from '../utils/firebase/firebase.utils';
import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils';


export const CategoriesContext = createContext({
    categoriesMap: {},
});


export const CategoriesProvider = ({children}) => {
    const [categoriesMap, setCategoriesMap] = useState({});

    // useEffect(() => {
    //     addCollectionAndDocuments('collections', SHOP_DATA);
    // }, []);

    useEffect(async () => {
        const categoryMap = await getCategoriesAndDocuments('categoriesMap');
        console.log(categoryMap);
    }, []);




    const value = {categoriesMap};


    return (
        <CategoriesContext.Provider value={value}> {children}</CategoriesContext.Provider>
    )
}


export default CategoriesContext;