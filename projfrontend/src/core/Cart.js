import React, {useState, useEffect} from 'react';
import Base from './Base';
import { loadCart } from './helper/cartHelper';
import Card from './Card'
import PaymentB from './PaymentB';

const Cart = () => {
    const [reload, setReload] = useState(false)
    const [products, setProducts] = useState([])
    useEffect(() => {
        setProducts(loadCart())
    }, [reload])
    const cartSection = (products) => {
        return (
            <div className="col-md-6">
                <h4 style = {{fontWeight: 'lighter'}}>Cart</h4>
                {products.map((product,index) => {
                    return(
                        <Card key = {index} product = {product} addToCart = {false} deleteFromCart = {true} reload = {reload} setReload = {setReload}/>
                    )
                })}
            </div>
        )
    }

    const paymentSection = () => {
        return(
            <div className="col-md-6">
                <h4 style = {{fontWeight: 'lighter'}}>Payment</h4>
                <PaymentB products = {products} reload = {reload} setRelaod = {setReload}/>
            </div>
        )
    
    }
    return ( 
        <Base title = 'Cart' description = 'Item(s) added to your cart'>
            <div className="row">
                {cartSection(products)}
                {paymentSection()}
            </div>
        </Base>
     );
}
 
export default Cart;