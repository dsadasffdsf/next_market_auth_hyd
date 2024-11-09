import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { validationError } from 'src/utils/validator';

interface InputForFormProps {
  type: string;
  placeholder: string;
  value: { value: string; valid: boolean };
  validHandler: ({ value, valid }: { value: string; valid: boolean }) => void;
}

const InputForForm = memo(({ type, placeholder, value, validHandler }: InputForFormProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState('');
  const handleChange = useCallback(() => {
    const valid = validationError({ data: inputRef.current.value, setDataError: setError, type });
    validHandler({ value: inputRef.current.value, valid });
  }, [validHandler]);

  // console.log('rerender');

  return (
    <li className="h-24">
      <h4>{type}</h4>
      <input
        className="create-product_input p-2 bg-slate-200 rounded-md w-[450px]"
        type="text"
        placeholder={placeholder}
        value={value.value}
        onChange={handleChange}
        ref={inputRef}
      />
      {error && <div className="text-red-600 text-sm mt-1">{error}</div>}
    </li>
  );
});

export default InputForForm;
