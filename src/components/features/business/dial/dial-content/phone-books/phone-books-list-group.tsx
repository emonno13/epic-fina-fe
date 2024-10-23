import PhoneBooksList from './phone-books-list';

const PhoneBooksListGroup = ({ title, phoneBooks = [], onClose }) => {
  return (
    <div className="phone-books-list-group">
      <div className="phone-books-list-group__title">{title}</div>
      <PhoneBooksList {...{ phoneBooks, onClose }} />
    </div>
  );
};

export default PhoneBooksListGroup;
