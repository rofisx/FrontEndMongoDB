import { Link, useParams} from "react-router-dom";
import './index.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { moneyFormatIDR } from "../../function/currency";

const Detail = () => {

  let [products, setProduct] = useState([]);  
  let { id }  = useParams();

  const dataProduct = async () =>{
        try{
          const response = await axios.get(`http://localhost:3009/v2/product/${id}`);
          const data = await response.data;
          setProduct(data);          
        }catch(e){
          console.log(e)
        }
    }   

    useEffect(() => {
    dataProduct()     
    }, []);// eslint-disable-line react-hooks/exhaustive-deps


  return (
    <div className="main">
      <Link to="/" className="btn btn-primary">Kembali</Link>

      <table className="table">
        <tbody>
          <tr>
            <td>ID</td>
            <td>: {products._id}</td>
          </tr>
          <tr>
            <td>Name</td>
            <td>: {products.name}</td>
          </tr>
          <tr>
            <td>Price</td>
            <td>: {moneyFormatIDR.format(products.price)}</td>
          </tr>
          <tr>
            <td>Stock</td>
            <td>: {products.stock}</td>
          </tr>
          <tr>
            <td>Status</td>
            <td>: {JSON.stringify(products.status)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Detail;