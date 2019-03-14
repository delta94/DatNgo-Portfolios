import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FormGroup, Label, Button } from "reactstrap";
import moment from "moment";

// CSS Modules, react-datepicker-cssmodules.css
import "react-datepicker/dist/react-datepicker-cssmodules.css";

const PortDate = props => {
  const datePro = props.initialDate ? new Date(props.initialDate) : new Date();

  const isHiddenT = props.initialDate ? false : true;

  const [dateValue, setDateValue] = useState(datePro);

  const [isHidden, setIsHidden] = useState(isHiddenT);

  const setFieldValueAndTouched = (date, touched) => {
    const { setFieldValue, setFieldTouched } = props.form;
    const { name } = props.field;

    setFieldValue(name, date, true);
    setFieldTouched(name, touched, true);
  };

  const {
    label,
    field,
    form: { touched, errors },
    canBeDisabled
  } = props;

  const handleChange = date => {
    setDateValue(date);

    setFieldValueAndTouched(date, true);
  };

  const toggleDate = date => {
    setIsHidden(!isHidden);

    setFieldValueAndTouched(date, true);
  };

  const RenderClient = () => {
    return (
      process.browser && (
        <FormGroup>
          <Label>{label}</Label>
          <div className="input-group">
            {!isHidden && (
              <DatePicker
                selected={dateValue}
                onChange={handleChange}
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                maxDate={new Date()}
                dropdownMode="select"
              />
            )}
          </div>
          {!isHidden && canBeDisabled && (
            <Button onClick={() => toggleDate(null)}>
              Still Working Here...
            </Button>
          )}

          {canBeDisabled && isHidden && (
            <React.Fragment>
              <span>Still Working Here</span>
              <Button onClick={() => toggleDate(dateValue)}>
                Set End Date
              </Button>
            </React.Fragment>
          )}

          {touched[field.name] && errors[field.name] && (
            <div className="error">{errors[field.name]}</div>
          )}
        </FormGroup>
      )
    );
  };

  return <RenderClient />;
};

export default PortDate;
