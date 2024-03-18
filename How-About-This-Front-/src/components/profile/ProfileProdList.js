import { useState, useEffect } from 'react';
import axios from 'axios';
import { prodInfoApi } from '../../api/API';
import ProductBlock from '../ProductBlock';
import '../../styles/components/profile/_ProfileProdList.scss';

const ProfileProdList = ({ userId }) => {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    // axios.get(`http://localhost:5000/productAPI/user/${userId}`)
    prodInfoApi.getUserProd(userId).then((res) => {
      setProductList(res.data);
    });
  }, [userId]);

  if (productList.length) {
    return (
      <div className='ProfileProdList'>
        <section className='Profile-ProductList_content'>
          {productList.map((data) => (
            <ProductBlock key={data.prodID} data={data} />
          ))}
        </section>
      </div>
    );
  } else return null;
};
export default ProfileProdList;
