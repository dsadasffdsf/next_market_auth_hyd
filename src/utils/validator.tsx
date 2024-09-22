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