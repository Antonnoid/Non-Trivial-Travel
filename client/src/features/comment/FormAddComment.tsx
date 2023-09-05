import React from 'react';

export default function FormAddComment(): JSX.Element {
  return (
    <form action="">
      <input className="comment__input" name="comment" type="text" />
      <button className="comment__submit" type="submit">
        Добавить
      </button>
    </form>
  );
}
