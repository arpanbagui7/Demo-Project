import React, { useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import { isAuthenticated, signout } from "../auth/helper/index";
import { getToken, paymentProcess } from "./helper/paymentHelper";
import { addOrder } from "./helper/orderHelper";
import { clearCart } from "./helper/cartHelper";
import DropIn from "braintree-web-drop-in-react";

const PaymentB = ({ products, reload = undefined, setRelaod = (f) => f }) => {
  const [info, setInfo] = useState({
    loading: false,
    success: false,
    error: "",
    clientToken: "",
    instance: {},
  });
  const { loading, success, error, clientToken, instances } = info;

  const token = isAuthenticated() && isAuthenticated().token;
  const userId = isAuthenticated() && isAuthenticated().user.id;
  const getClientToken = (userId, token) => {
    getToken(userId, token).then((data) => {
      if (data.error) {
        setInfo({ ...info, error: data.error });
        signout(() => {
          return <Redirect to='/' />;
        });
      } else {
        setInfo({ ...info, clientToken: data['Client Token'] });
      }
    });
  };

  useEffect(() => {
    getClientToken(userId, token);
  }, []);



  const getTotalAmount = () => {
    let amount = 0;
    products.map((product) => {
      amount += parseInt(product.price);
    });
    return amount;
  };


  const showPaymentDiv = () => {
    console.log('Client Token ', clientToken)
    return (
      <div>
        {clientToken !== '' && products.length > 0 ? (
          <div>
            <DropIn
              options={{ authorization: clientToken }}
              onInstance={(instance) => {
                return setInfo({instances : instance})
              }}
            />
            <button className='btn btn-block btn-success' onClick = {onPayment}>Buy Now</button>
          </div>
        ) : (
          <h3>
            Please <Link to='/singin'>Login</Link> or add
            <Link to='/'>item</Link> to cart
          </h3>
        )}
      </div>
    );

  };

  const onPayment = () => {
    setInfo({loading : true})
    const getNonce = instances.requestPaymentMethod().then(data => {
      const paymentData = {
        'nonce_from_the_client' : data.nonce,
        'total_amount' : getTotalAmount()
      }
      paymentProcess(paymentData, userId, token)
      .then(response => {
        console.log('Response', response);
        if(response.error){
          if(response.code == "1"){
            console.log('Payment Failed')
            signout(() => {
              return <Redirect to = '/' />
            })
          }
        }
        else{
          setInfo({...info, success : response.success, loading : false})
          console.log('Payment Success')
          let productNames = ''
          products.forEach((product) => {
            productNames += product.name + ', '
          })

          const orderData = {
            'products' : productNames,
            'transaction_id' : response.Transaction.id,
            'total_amount' : response.Transaction.amount
            
          }
          addOrder(userId, token, orderData)
          .then(response => {
            if(response.error){
              if(response.code == '1')
                console.log('Order Failed');
              signout(() => {
                return <Redirect to = '/' />
              })
            }
            else{
              console.log('Order Paced')
              clearCart(() => {
                return <Redirect to = '/' />
              })
              
            }
          })
        }
      }) 
    })
  }

  return (
    <div>
      <h3>Your Bill is {getTotalAmount()}</h3>
      {showPaymentDiv()}
    </div>
  );
};

export default PaymentB;
