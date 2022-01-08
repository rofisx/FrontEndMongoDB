import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './index.scss';
import { moneyFormat } from '../../function/currency';

const Home = (id) => {

  let [products, setProduct] = useState([]);  
  let [value,setValue] = useState();

  const handleFind = (event) => {
        if (event.charCode === 13) {
            setValue(value = event.target.value)   
            // console.log(value);  
            dataProduct(value);    
        }        
    }

  const dataProduct = async (values) =>{
    if(value){
        try{
          const response = await axios.get(`http://localhost:3009/v2/product?search=${values}`);
          const data = await response.data;
          // console.log(data);
          setProduct(data);
        }catch(e){
          console.log(e)
        }
      }else{
          try{
            const response = await axios.get('http://localhost:3009/v2/product');
            const data = await response.data;
            // console.log(data);
            setProduct(data);
          }catch(e){
            console.log(e)
          }
      }    
    }   

    const deleteProduct = async (id) => {
      try{
        await axios.delete(`http://localhost:3009/v2/product/delete/${id}`)
        // console.log(id)        
        dataProduct();
      }catch(e){
        console.log(e)
      }
    }

    useEffect(() => {
    dataProduct()     
    }, []);// eslint-disable-line react-hooks/exhaustive-deps


  return(
    <div className="main">
      <Link to="/tambah" className="btn btn-primary">Tamah Produk</Link>
      <div className="search">
        <input type="text" onKeyPress={handleFind} placeholder="Masukan kata kunci..."/>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th className="text-center">Stock</th>
            <th className="text-right">Price</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product,index) => (
                <tr key={product._id}>
                    <td>{index + 1}</td>
                    <td>{product.name}</td>
                    <td className="text-center">{product.stock}</td>
                    <td className="text-right">{moneyFormat.format(product.price)}</td>
                    <td className="text-center">
                      <Link to={`/detail/${product._id}`} className="btn btn-sm btn-info">Detail</Link>
                      <Link to={`/edit/${product._id}`} className="btn btn-sm btn-warning">Edit</Link>
                      <Link to="#" className="btn btn-sm btn-danger" onClick={() => deleteProduct(product._id)}>Delete</Link></td>
                </tr>
                ))}
        </tbody>
      </table>
    </div>
  )
}

export default Home;