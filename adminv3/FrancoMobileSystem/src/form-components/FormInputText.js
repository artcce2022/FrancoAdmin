import i18next from 'i18next';
import { Form } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';

export const FormInputText = ({
  control,
  name,
  label,
  defaultValue,
  changeHandler,
  required = true,
  type = 'text'
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
            type={type || 'text'}
            label={`${label}`}
            name={name}
            required={required}
            placeholder={`${label}`}
            onChange={event => {
              onChange(event);
              changeHandler(event);
            }}
          />
        )}
      />
      <Form.Control.Feedback type="invalid">
        {i18next.t('label.RequiredData')}
      </Form.Control.Feedback>
    </Form.Group>
  );
};
