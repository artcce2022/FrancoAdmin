import React, { Fragment, useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';

const FormAutoCompleteText = ({
  name,
  control,
  open,
  setOpen,
  options,
  loading,
  setFilter,
  setLoading,
  setSelected,
  defaultValue
}) => {
  const [value, setValue] = useState(null); // <String | null>(null);
  useEffect(() => {
    console.log(defaultValue);
    setValue(options[0]);
  }, []);

  // Bypass client-side filtering by returning `true`. Results are already
  // filtered by the search endpoint, so no need to do it again.
  const filterBy = () => true;
  return (
    <AsyncTypeahead
      filterBy={filterBy}
      id="async-example"
      isLoading={loading}
      labelKey="login"
      minLength={3}
      onSearch={setFilter}
      options={options}
      placeholder="Search for a Github user..."
      renderMenuItemChildren={option => <></>}
    />
  );
};

export default FormAutoCompleteText;
