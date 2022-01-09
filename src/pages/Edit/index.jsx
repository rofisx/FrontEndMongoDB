import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Input from "../../components/Input";
// import { useFormik } from 'formik';
// import * as Yup from 'yup';

const Edit = () => {
  let [name, setName] = useState('');  
  let [price, setPrice] = useState('');  
  let [stock, setStock] = useState('');  
  let [status, setStatus] = useState('');  
  let { id }  = useParams();
  let history = useHistory();

  // const formik = useFormik({
  //   initialValues:{
  //     name:'',
  //     price:'',
  //     stock:'',
  //     status:false
  //   },
  //   validationSchema: Yup.object({
  //     name:Yup.string()
  //     .min(2,"Minimal 2 Karakter")
  //     .required('Silahkan masukan nama anda'),
  //     price:Yup.number('Harus angka')
  //     .required('Harga harus di isi')
  //     .moreThan(999,'Harga minimal 1000')
  //     .integer('Harus Angka'),
  //     stock:Yup.number()
  //     .min(1,"minimal 1 digit")
  //     .required('Stock harus di isi')
  //     .positive('Tidak boleh kurang dari satu')
  //   }),
  //   onSubmit: value =>{
  //     updateProduct(value);
  //   }   
  // });

  const dataProduct = async () =>{
        try{
          // const response = await axios.get(`http://localhost:3009/v2/product/${id}`);
          const response = await axios.get(`https://backend-rofi.herokuapp.com/v2/product/${id}`);
          const data = await response.data;
          setName(data.name);
          setPrice(data.price);
          setStock(data.stock);
          setStatus(data.status);
        }catch(e){
          console.log(e)
        }
    }   
  const updateProduct = async (e) => {
    e.preventDefault();
    // await axios.patch(`http://localhost:3009/v2/product/update/${id}`, 
    await axios.patch(`https://backend-rofi.herokuapp.com/update/${id}`, 
    {name,price,stock,status})
    .then(() => {
        history.push('/');

    })
    .catch((error) => {
        console.log(error)
    })
    
};
    useEffect(() => {
      dataProduct()     
    }, []);// eslint-disable-line react-hooks/exhaustive-deps


  return (
    <div className="main">
      <div className="card">
        <h2>Edit Produk</h2>
        <br />
        <form onSubmit={updateProduct}>
          <Input name="name" type="text" placeholder="Nama Produk..." label="Nama" value={name} onChange = {(e) => setName(e.target.value)}/>
          <Input name="price" type="number" placeholder="Harga Produk..." label="Harga" value={price} onChange = {(e) => setPrice(e.target.value)}/>
          <Input name="Stock" type="number" placeholder="Stock Produk..." label="Stock" value={stock} onChange = {(e) => setStock(e.target.value)}/>
          <Input name="status" type="checkbox" checked={status} label="Active" onChange = {(e) => setStatus(e.target.checked)}/>
          <button type="submit" className="btn btn-primary" >Simpan</button>
        </form>
      </div>
    </div>
  )
}

export default Edit;