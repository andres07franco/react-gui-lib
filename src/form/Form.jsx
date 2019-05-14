import React from 'react'
import { ReactGuiContext } from '../react-gui-provider'

class Form extends React.Component {

  componentDidUpdate(prevProps) {
    const { children, validStatus, onValidStatusChange } = this.props
    let fieldWithValues = []
    React.Children.map(children, child => {
      React.Children.map(child.props.children, field => {
        if (field.props.requiered)
          fieldWithValues.push({ name: field.props.name, value: field.props.value })
      })

    })

    if (onValidStatusChange) {
      let isValidForm = true
      fieldWithValues.map(field => { isValidForm = isValidForm && (field.value != '' && field.value != null) })
      if (validStatus != isValidForm) {
        onValidStatusChange(isValidForm)
      }
    }
  }

  render() {
    const { children, formSubmited } = this.props;
    const childrenWithProps = React.Children.map(children, child => {
      return React.cloneElement(child, { formSubmited })
    })
    return (<form className="dialogForm">{childrenWithProps}</form>)
  }
}

const Field = (props) => {

  const { label,
    name,
    inputClassName,
    maxLength,
    value,
    inputStyle,
    onChange,
    formSubmited,
    type,
    requiered

  } = props
  const userInputChangeHandle = (e) => {
    const value = e.target.value;
    switch (e.target.type) {
      case 'checkbox': return e.target.checked
      default: return value
    }
  }

  const getErrorClass = (val) => {
    return ((val == null || val == '') && formSubmited && requiered ? 'error' : '');
  }

  /**
   * Renderiza un listado de opciones
   */
  const renderOptions = (options) =>
    options && options.map((row) =>
      <option key={row.id} value={row.id}> {row.name} </option>
    )

  const typeFiled = type == null || type == '' ? 'text' : type;
  return (
    <div className="form-row" style={{ with: "100%", display: 'flex', flexWrap: "nowrap" }}>
      <label>{label}:{requiered && "*"}</label>
      {"email,text,password,checkbox".indexOf(typeFiled) > -1 &&
        <input name={name}
          type={typeFiled}
          className={`${inputClassName} ${getErrorClass(value)}`}
          maxLength={maxLength}
          value={value}
          style={inputStyle}
          onChange={(event) => onChange(userInputChangeHandle(event))} />
      }
      {"select".indexOf(typeFiled) > -1 &&
        <select name={name}
          className={`${inputClassName} ${getErrorClass(value)}`}
          value={value}
          style={inputStyle}
          onChange={(event) => onChange(userInputChangeHandle(event))} >
          <option value="0">N/A</option>
          {renderOptions(props.data)}
        </select>
      }
    </div>
  )
}

const FormRow = (props) => {
  const { children, onValidStatusChange } = props;
  let fieldWithValues = []
  const childrenWithProps = React.Children.map(children, child => {
    return React.cloneElement(child, { formSubmited: props.formSubmited, })
  }
  )
  return (<div className="formRow">{childrenWithProps}</div>)
}




export { Field, Form, FormRow }