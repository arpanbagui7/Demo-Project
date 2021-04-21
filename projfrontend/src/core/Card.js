import React from 'react';
import ImageHelper from './helper/imageHelper'
import {addItemToCart, removeItemFromCart} from './helper/cartHelper'

const Card = ({product, addToCart = true, deleteFromCart = true}) => {
    const isAuthenticated = true
    const productName = product?.name ?? 'Default Product'
    const productDesc = product?.description ?? 'Default Description'
    const productAmount = product?.price ?? '0'

    const onClickAddToCart = () => {
        isAuthenticated ? addItemToCart(product, () => {}) : console.log('Please Login First!')
       
    }

    const onClickDeleteFromCart = () => {
        isAuthenticated ? removeItemFromCart(product.id) : console.log('Please Login First')
    }

    const showAddToCart = (addToCart) => {
        if(addToCart)
            return (
                <button className="btn btn-block btn-outline-success mt-2 mb-2" onClick = {onClickAddToCart}>
                    Add to Cart
                </button>
            )
    }
    const showDeleteFromCart = (deleteFromCart) => {
        if(deleteFromCart)
            return (
                <button className="btn btn-block btn-outline-danger mt-2 mb-2" onClick = {onClickDeleteFromCart}>
                    Delete from Cart
                </button>
            )
    }
    return ( 
        <div className="card text-white bg-dark border border-info">
            <div className="card-header lead">
                {productName}
            </div>
            <div className="card-body">
                <ImageHelper product = {product} />
            </div>
            <div className="row px-2">
                <div className="col-12">
                    <p className="lead bg-success font-weight-normal text-wrap">{productDesc}</p>
                </div>
                <div className="col-12">
                    <p className="btn btn-success rounded btn-sm px-4" style = {{float: "left"}}>{productAmount} rs.</p>
                </div>
            </div>
            <div className="row px-2">
                <div className="col-12">
                    {showAddToCart(addToCart)}
                </div>
            </div>
            <div className="row px-2">
                <div className="col-12">
                    {showDeleteFromCart(deleteFromCart)}
                </div>
            </div>
        </div>
     );
}
 
export default Card;