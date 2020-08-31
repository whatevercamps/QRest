import React, { useEffect } from "react";
import Products from "./Products";
export default function Sections(props) {
  return (
    <div className='Sections'>
      {props.sections.map((section, index) => {
        return (
          <div className='Section' key={index}>
            <h3>{section.name}</h3>
            <Products
              products={section.products || []}
              setProductToAdd={props.setProductToAdd}
            />
            <hr />
          </div>
        );
      })}
    </div>
  );
}
