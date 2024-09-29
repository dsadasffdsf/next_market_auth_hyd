<<<<<<< HEAD
// interface ValidationError {
//   username: string;
//   password: string;
//   setUsernameError: React.Dispatch<React.SetStateAction<string>>;
//   setPasswordError: React.Dispatch<React.SetStateAction<string>>;
// }

// export const validationError = ({
//   username,
//   password,
//   setUsernameError,
//   setPasswordError,
// }: ValidationError) => {
//   let validateForm = { valUsername: true, valPassword: true };

//   const usernameRegex = /^[a-zA-Z0-9._-]{3,}$/; // Минимум 3 символа
//   const passwordRegex = /^.{6,}$/; // Минимум 6 символов

//   if (!username) {
//     validateForm.valUsername = false;
//     setUsernameError('Поле username не должно быть пустым!');
//   } else if (!usernameRegex.test(username)) {
//     validateForm.valUsername = false;
//     setUsernameError('Поле username должно содержать минимум 3 символа!');
//   } else {
//     validateForm.valUsername = true;
//     setUsernameError('');
//   }

//   if (!password) {
//     validateForm.valPassword = false;
//     setPasswordError('Поле password не должно быть пустым!');
//   } else if (!passwordRegex.test(password)) {
//     validateForm.valPassword = false;
//     setPasswordError('Поле password должно содержать минимум 6 символов!');
//   } else {
//     validateForm.valPassword = true;
//     setPasswordError('');
//   }

//   return { validateForm };
// };

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
    const regex = /^.{5,}$/;
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
    //проверить на повтор
  }

  return valid;
};

// const data = validationError({ data: 'Яблоко', setData, regex: titleRegex, type: 'title' });
// const data2 = validationError({
//   data: 'dsfsdfdавыаыsfsdfdsf',
//   setData,
//   regex: descRegex,
//   type: 'desc',
// });
=======
interface ValidationError {
  username: string;
  password: string;
  setUsernameError: React.Dispatch<React.SetStateAction<string>>;
  setPasswordError: React.Dispatch<React.SetStateAction<string>>;
}

export const validationError = ({
  username,
  password,
  setUsernameError,
  setPasswordError,
}: ValidationError) => {
  let validateForm = { valUsername: true, valPassword: true };

  const usernameRegex = /^[a-zA-Z0-9._-]{3,}$/; // Минимум 3 символа
  const passwordRegex = /^.{6,}$/; // Минимум 6 символов

  if (!username) {
    validateForm.valUsername = false;
    setUsernameError('Поле username не должно быть пустым!');
  } else if (!usernameRegex.test(username)) {
    validateForm.valUsername = false;
    setUsernameError('Поле username должно содержать минимум 3 символа!');
  } else {
    validateForm.valUsername = true;
    setUsernameError('');
  }

  if (!password) {
    validateForm.valPassword = false;
    setPasswordError('Поле password не должно быть пустым!');
  } else if (!passwordRegex.test(password)) {
    validateForm.valPassword = false;
    setPasswordError('Поле password должно содержать минимум 6 символов!');
  } else {
    validateForm.valPassword = true;
    setPasswordError('');
  }

  return { validateForm };
};
>>>>>>> eb18683754f797b649e2be03c3067d2c3586e059
