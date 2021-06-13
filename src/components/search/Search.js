import React, { useState } from 'react';

const Search = ({ onSearch }) => {
  const [value, setValue] = useState('');

  const valueChangeHandler = e => {
    setValue(e.target.value);
  };

  return (
    <div>
      <input onChange={valueChangeHandler} value={value} type="text" />
      <button onClick={() => onSearch(value)}>Найти</button>
    </div>
  );
};

export default Search;
