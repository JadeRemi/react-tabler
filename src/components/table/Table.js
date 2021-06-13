import React from 'react';
import withError from '../../hoc/withError';

const Table = ({ data, onSort, sort, sortField, onSelect }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th onClick={() => onSort('id')}>
            ID <small>{sortField === 'id' && sort}</small>
          </th>
          <th onClick={() => onSort('firstName')}>
            FirstName<small>{sortField === 'firstName' && sort}</small>
          </th>
          <th onClick={() => onSort('lastName')}>
            LastName<small>{sortField === 'lastName' && sort}</small>
          </th>
          <th onClick={() => onSort('email')}>
            Email<small>{sortField === 'email' && sort}</small>
          </th>
          <th onClick={() => onSort('phone')}>
            Phone<small>{sortField === 'phone' && sort}</small>
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map(item => (
          <tr key={item.id + '' + item.phone} onClick={() => onSelect(item)}>
            <td>{item.id}</td>
            <td>{item.firstName}</td>
            <td>{item.lastName}</td>
            <td>{item.email}</td>
            <td>{item.phone}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default withError(Table);
