import { Form } from 'react-bootstrap';
import { Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import { useEffect, useState } from 'react';

export const FormInputDate = ({
  control,
  name,
  label,
  defaultValue,
  changeHandler
}) => {
  const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    if (defaultValue != null) {
      var timestamp = Date.parse(defaultValue);
      if (isNaN(timestamp) === false) {
        defaultValue = new Date();
      }
      setStartDate(defaultValue);
    }
  }, []);

  useEffect(() => {
    changeHandler({ target: { name: name, value: startDate } });
  }, [startDate]);

  return (
    <Form.Group className="mb-3" controlId={name}>
      <Form.Label>{label}</Form.Label>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <DatePicker
            selected={defaultValue}
            onChange={date => setStartDate(date)}
            className="form-control"
            placeholderText="Select Date"
            dateFormat={'MM/dd/yyyy'}
          />
        )}
      />
    </Form.Group>
  );
};
