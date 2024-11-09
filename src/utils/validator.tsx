export interface ValidationError {
  data: string;
  setDataError: React.Dispatch<React.SetStateAction<string>>;
  type: string;
  // valid: boolean;
}

export const validationError = ({ data, setDataError, type }: ValidationError): boolean => {
  let valid = false;

  // Проверяем только для типа 'title'
  if (type === 'title') {
    const regex = /^.{5,}$/;
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
    const regex = /^.{15,}$/;
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

  if (type === 'price') {
    const regex = /^\d+(\.\d+)?$/;
    if (!data) {
      valid = false;
      setDataError(`Поле ${type} не должно быть пустым!`);
    } else if (!regex.test(data)) {
      valid = false;
      setDataError('Поле price должно содержать только цифры !(десятичные отделяются точкой )');
    } else {
      valid = true;
      setDataError('');
    }
  }

  if (type === 'username') {
    const regex = /^.{3,}$/;
    if (!data) {
      valid = false;
      setDataError('Поле data не должно быть пустым!');
    } else if (!regex.test(data)) {
      valid = false;
      setDataError('Поле data должно содержать минимум 3 символа!');
    } else {
      valid = true;
      setDataError('');
    }
    //!проверить на повтор
  }
  // Проверка для поля 'email'
  if (type === 'email') {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data) {
      valid = false;
      setDataError('Поле email не должно быть пустым!');
    } else if (!regex.test(data)) {
      valid = false;
      setDataError('Введите корректный email!');
    } else {
      valid = true;
      setDataError('');
    }
  }

  // Проверка для поля 'password'
  if (type === 'password') {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/; // Мин. 8 символов, хотя бы одна буква и одна цифра
    if (!data) {
      valid = false;
      setDataError('Поле password не должно быть пустым!');
    } else if (!regex.test(data)) {
      valid = false;
      setDataError('Пароль должен содержать минимум 5 символов, включая буквы и цифры!');
    } else {
      valid = true;
      setDataError('');
    }
  }

  return valid;
};
