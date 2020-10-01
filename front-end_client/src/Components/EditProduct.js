import React, { useEffect, useState } from "react";
import { Card, Button, Form, FormControl } from "react-bootstrap";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/* Components */
import InputOrText from "./InputOrText";

export default function EditProduct(props) {
  /*
   * State
   */
  const [product, setProduct] = useState(null);
  const [fields, setFields] = useState([]);

  /*
   * Effects
   */

  //product sync with main state and fields construction
  useEffect(() => {
    if (props.product) {
      setProduct(props.product);
      setFields({
        name: {
          formClassName: "editProductInfoForm",
          label: "Nombre",
          formControlClassName: "editProductInfoFormControl short",
          type: "text",
          value: props.product.name,
          isText: props.product.name !== null,
        },
        description: {
          formClassName: "editProductInfoForm",
          label: "Descripción",
          formControlClassName: "editProductInfoFormControl large",
          type: "text",
          as: "textarea",
          rows: 2,
          value: props.product.description,
          isText: props.product.description !== null,
        },
        ingredients: {
          formClassName: "editProductInfoForm",
          label: "Ingredientes",
          formControlClassName: "editProductInfoFormControl large",
          type: "text",
          as: "textarea",
          rows: 2,
          value: props.product.ingredients,
          isText:
            props.product.ingredients !== null &&
            props.product.ingredients.length > 0,
        },
        price: {
          formClassName: "editProductInfoForm",
          label: "Precio",
          formControlClassName: "editProductInfoFormControl short",
          type: "text",
          value: props.product.price,
          isText: props.product.price !== null,
        },
      });
    }
  }, [props.product]);

  useEffect(() => {
    console.log("kjasdjkadkl", fields);
  }, [fields]);

  useEffect(() => {
    if (product) props.setProduct(product);
  }, [product]);

  return product ? (
    <Card className='EditProduct'>
      <Card.Body>
        <div className='photo'>
          <FontAwesomeIcon
            icon={faEdit}
            className='editIcon'
            size='3x'
            onClick={() => props.setPictureToChange(product)}
          />
        </div>
        {Object.keys(fields).map((fieldKey) => {
          return (
            <InputOrText
              key={fieldKey}
              formClassName={fields[fieldKey].formClassName}
              label={fields[fieldKey].label}
              changeValueHandler={(newValue) =>
                setProduct((p) => {
                  p[fieldKey] = newValue;
                  return { ...p };
                })
              }
              formControlClassName={fields[fieldKey].formControlClassName}
              type={fields[fieldKey].type}
              value={product[fieldKey]}
              isText={fields[fieldKey].isText && product[fieldKey]}
              clickHandler={() => {
                console.log("jeje", fieldKey);
                setFields((f) => {
                  f[fieldKey].isText = false;
                  return {
                    ...f,
                  };
                });
              }}
            />
          );
        })}
      </Card.Body>
    </Card>
  ) : (
    <></>
  );
}
