export const titleRegex = /^.{5,}$/;
export const descRegex = /^.{15,}$/;

const validationError = ({ data, setDataError, regex, type }) => {
  let valid = false;

  // Проверяем только для типа 'title'
  if (type === 'title') {
    if (!data) {
      valid = false;
      setDataError('Поле title не должно быть пустым!');
    } else if (!regex.test(data)) {
      valid = false;
      setDataError('Поле title должно содержать минимум 5 символов!');
    } else {
      valid = true;
      console.log('Все верно!');
      setDataError('');
    }
  }

  if (type === 'description') {
    if (!data) {
      valid = false;
      setDataError(`Поле ${type} не должно быть пустым!`);
    } else if (!regex.test(data)) {
      valid = false;
      setDataError('Поле description должно содержать от 10 символов !');
    } else {
      valid = true;
      setDataError('');
    }
  }

  if (type === 'username') {
    if (!data) {
      valid = false;
      setDataError('Поле data не должно быть пустым!');
    } else if (!dataRegex.test(data)) {
      valid = false;
      setDataError('Поле data должно содержать минимум 3 символа!');
    } else {
      valid = true;
      setDataError('');
    }
    //проверить на повтор
  }

  return { valid };
};

const data = validationError({ data: 'Яблоко', setData, regex: titleRegex, type: 'title' });
const data2 = validationError({
  data: 'dsfsdfdавыаыsfsdfdsf',
  setData,
  regex: descRegex,
  type: 'desc',
});

console.log(data);
console.log(data2);
