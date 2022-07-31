import React from 'react';

export enum INPUT_TYPE {
  EMAIL = 'EMAIL',
  PASSWORD = 'Password',
}

interface InputProps {
  type: INPUT_TYPE;
  placeholder: string;
  showError: boolean;
  setShowError: (showError: boolean) => void;
  setInputValue: (value: string) => void;
}

const LoginInput: React.FC<InputProps> = (props): JSX.Element => {
  const {
    type,
    placeholder,
    showError,
    setInputValue,
    setShowError,
  } = props;
  return (
    <input
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        if (showError) {
          setShowError(false);
        }

        setInputValue(e.target.value);
      }}
      type="text"
      placeholder={placeholder}
      className={`
        px-4
        py-2
        border-solid
        border-2
        border-black-200
        text-slate-500
        placeholder-slate-400
        contrast-more:border-slate-400
        contrast-more:placeholder-slate-500
        ${type === INPUT_TYPE.EMAIL && 'border-b-0'}
        ${type === INPUT_TYPE.PASSWORD ? 'rounded-b-lg' : 'rounded-t-lg'}
      `}
    />
  );
};

export default LoginInput;
