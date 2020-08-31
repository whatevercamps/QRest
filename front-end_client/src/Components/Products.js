import React, { useState } from "react";
import { Image, Button } from "react-bootstrap";

/* Components */

export default function Products(props) {
  return (
    <div className='Products'>
      {props.products.map((product, index) => {
        return (
          <div className='Product' key={index}>
            <Image
              className='photo'
              src='https://picsum.photos/200'
              width='100%'
            />
            <div className='info'>
              <p className='title'>{product.name}</p>
              <small>{product.ingredients}</small>
              <h5>${product.price}</h5>
              <div className='text-center'>
                <Button
                  variant='warning'
                  size='sm'
                  className='add-button'
                  onClick={() => props.setProductToAdd(product)}
                >
                  Añadir
                </Button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
