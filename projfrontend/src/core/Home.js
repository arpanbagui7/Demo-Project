import {React, useState,  useEffect} from 'react'
import { getAllProducts } from './helper/coreapicalls';
import Base from './Base'
import '../styles.css'
import Card from './Card';
const Home = () => {
    const [products, setProducts] = useState([])
    const [error, setError] = useState(false)

    const loadAllProducts = () => {
        return getAllProducts()
        .then(data => {
            console.log(data)
            if(data.error){
                setError(error)
                console.log(error)
            }
            else{
                setProducts(data)
            }
        })
    }
    useEffect(() => {
        loadAllProducts()
    }, [])
    
    return ( 
        <Base title = 'Home Page' description = 'Welcome to Tshirt Store'>
            <h1>Home</h1>
            <div className = 'row'>
                {
                    products.map((product, index) => {
                        return (
                            <div key = {index} className="col-4">
                                <Card product = {product}/>
                            </div>
                        )
                    })
                }
            </div>
        </Base>
     );
}
 
export default Home;