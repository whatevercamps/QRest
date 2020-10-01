import React, { useState, useEffect } from "react";
import { Form, FormControl } from "react-bootstrap";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function InputOrText(props) {
  const [value, setValue] = useState(null);

  useEffect(() => {
    if (props.value) {
      setValue(props.value);
    }
  }, [props.value]);

  return (
    <div className='InputOrText'>
      {props.isText ? (
        <p onClick={() => props.clickHandler()}>
          {props.value} <FontAwesomeIcon icon={faEdit} />
        </p>
      ) : (
        <Form
          className={props.formClassName}
          onSubmit={(evt) => evt.preventDefault()}
        >
          <Form.Label>
            <small>{props.label}</small>
          </Form.Label>
          <FormControl
            className={props.formControlClassName}
            as={props.as}
            rows={props.rows}
            value={props.value || ""}
            onChange={(evt) => props.changeValueHandler(evt.target.value)}
            type={props.text}
            placeholder={props.placeholder}
          />
        </Form>
      )}
      <hr />
    </div>
  );
}
