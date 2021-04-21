import React from 'react';

const ImageHelper = ({product}) => {
    const imageurl = product.image ?? "https://www.pexels.com/photo/photo-of-woman-wearing-polka-dot-dress-3597082/"
    return ( 
        <div className = "border border-success rounded p-2">
            <img src = {imageurl}  style = {{maxWidth: "100%", maxHeight: "100%"}} alt = ''/>
        </div>
     );
}
 
export default ImageHelper;