
import axios from 'axios';
// import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Input from '../../components/Input';
import './index.scss';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Tambah = () => {
  // let [name, setName] = useState('');  
  // let [price, setPrice] = useState('');  
  // let [stock, setStock] = useState('');  
  // let [status, setStatus] = useState('');  
  // let stats = (status) ? true : false;
  let history = useHistory();

  const formik = useFormik({
    initialValues:{
      name:'',
      price:'',
      stock:'',
      status:false
    },
    validationSchema: Yup.object({
      name:Yup.string()
      .min(2,"Minimal 2 Karakter")
      .required('Silahkan masukan nama anda'),
      price:Yup.number('Harus angka')
      .required('Harga harus di isi')
      .moreThan(999,'Harga minimal 1000')
      .integer('Harus Angka'),
      stock:Yup.number()
      .min(1,"minimal 1 digit")
      .required('Stock harus di isi')
      .positive('Tidak boleh kurang dari satu')
    }),
    onSubmit: value =>{
      storeProduct(value);
    }   
  });
  
  const storeProduct = async (value) => {
    // e.preventDefault();
    try{
      // await axios.post('http://localhost:3009/v2/product/store', 
      await axios.post('https://backend-rofi.herokuapp.com/v2/product/store', 
      // {name,price:parseInt(price),stock:parseInt(stock),status:stats})
      value)
      .then(() => {
        history.push('/');
        // console.log(stats)
        // console.log(res.data)
    })
      // await console.log(value)
    }catch(e){
      console.log(e)
    }
};

  return (
    <div className="main">
      <div className="card">
        <h2>Tambah Produk</h2>
        <br />
        <form onSubmit={formik.handleSubmit}>
          <Input name="name" type="text" placeholder="Nama Produk..." label="Nama" value={formik.values.name} onChange = {formik.handleChange}/>
            {formik.errors.name && formik.touched.name &&(<p>{formik.errors.name}</p>)}
          <Input name="price" type="number" placeholder="Harga Produk..." label="Harga" value={formik.values.price} onChange = {formik.handleChange}/>
            {formik.errors.price && formik.touched.price &&(<p>{formik.errors.price}</p>)}
          <Input name="stock" type="number" placeholder="Stock Produk..." label="Stock" value={formik.values.stock} onChange = {formik.handleChange}/>
            {formik.errors.stock && formik.touched.stock &&(<p>{formik.errors.stock}</p>)}
          <Input name="status" type="checkbox" label="Active" checked={formik.values.status} onChange = {formik.handleChange}/>
          <button type="submit" className="btn btn-primary" >Simpan</button>
        </form>
      </div>
    </div>
  )
}

export default Tambah;