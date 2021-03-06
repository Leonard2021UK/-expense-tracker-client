import {Form} from "react-bootstrap";
import _ from "lodash";
import React, {useEffect, useState} from "react";

export default function CustomTableInputField (props) {

    const {
        id,
        name,
        type,
        touched,
        errors,
        placeholder,
        defaultValue,
        handleChange,
        index,
        handleInputFiledOnBlur,
        disable
    } = props;

    const [inputField,setInputField] = useState({});

    const onBlur = (e,rowId)=>{
        const inputType = e.target.type;
        let name = e.target.name;
        let value = e.target.value;

        switch (true){
            case (inputType === "text" ):
                setInputField(prevState => ({...prevState,[name]:value,rowId:rowId}));
                break;
            case (inputType === "number" ):
                setInputField(prevState => ({...prevState,[name]:value,rowId:rowId}));

        }
    }

    useEffect(() =>{
        if(!_.isEmpty(inputField)){
            handleInputFiledOnBlur(inputField);
            setInputField({})
        }
    },[inputField])



    return (
      <>
          <Form.Control
              id={id}
              type={type}
              name={name}
              placeholder={placeholder}
              onBlur={(e) =>onBlur(e,index)}
              disabled={disable}
              defaultValue={_.isUndefined(defaultValue) ? "" : defaultValue}
              onChange={handleChange}
              className={(_.isUndefined(touched) && _.isUndefined(errors)) ? null : touched[name] && errors[name] ? "error" : null}
          />
          {(_.isUndefined(touched) && _.isUndefined(errors)) ? null : touched[name] && errors[name] ? (
              <div className="error-message">{errors[name] }</div>
          ): null}
      </>
    )

}