import React from 'react';

const PersonDetails = ({ person }) => {
  return (
    <div>
      <span>
        Выбран пользователь <b>{`${person.firstName} ${person.lastName}`}</b>
      </span>
      <span>
        Описание:
        <textarea defaultValue={person.description} />
      </span>
      <span>
        Адрес проживания: <b>{person.address.streetAddress}</b>
      </span>
      <span>
        Город: <b>{person.address.city}</b>
      </span>
      <span>
        Провинция/штат: <b>{person.address.state}</b>
      </span>
      <span>
        Индекс: <b>{person.address.zip}</b>
      </span>
    </div>
  );
};

export default PersonDetails;
