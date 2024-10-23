import { PhoneBooksListItem } from './phone-books.item';

const PhoneBooksList = ({ phoneBooks }) => {
  if (!Array.isArray(phoneBooks) || phoneBooks.length < 1) {
    return null;
  }
  return (
    <>
      {phoneBooks.map((phoneBooksData, index) => (
        <PhoneBooksListItem
          key={`phone-books-item-${index}`}
          {...{ phoneBooksData }}
        />
      ))}
    </>
  );
};

export default PhoneBooksList;