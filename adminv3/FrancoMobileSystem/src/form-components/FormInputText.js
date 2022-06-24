import { Form } from 'react-bootstrap';
import { Controller } from 'react-hook-form';

export const FormInputText = ({
  control,
  name,
  label,
  defaultValue,
  changeHandler
}) => {
  return (
    <Form.Group className="mb-3" controlId={name}>
      <Form.Label>{label}</Form.Label>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <Form.Control
            value={defaultValue || ''}
            type="text"
            label={`${label}`}
            name={name}
            placeholder={`${label}`}
            onChange={event => {
              onChange(event);
              changeHandler(event);
            }}
          />
        )}
      />
    </Form.Group>
  );
};
