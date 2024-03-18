import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { prodInfoApi } from '../api/API';

import Upload from './Upload';

const Edit = () => {
  const id = useParams().id;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const getProduct = () => {
      prodInfoApi.getProd(id).then((res) => {
        setTitle(res.data[0].prodNAME);
        setDescription(res.data[0].detail);
        setLink(res.data[0].link);
        setCategory(res.data[0].cateID);
      });

      prodInfoApi.getTag(id).then((res) => {
        setTags(res.data.map((tag) => tag.tagNAME));
      });

      prodInfoApi.getProdImgs(id).then((res) => {
        setImages(res.data.map((img) => img.img));
      });
    };

    getProduct();
  }, [id]);

  return (
    <div className='Edit'>
      <Upload
        isEdit={true}
        product={{ title, description, link, category, tags, images }}
        productId={id}
      />
    </div>
  );
};

export default Edit;
