import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import singIn from '../../utils/api/auth/auth';
import LoginInput, { INPUT_TYPE } from './LoginInput';

const LoginPage: React.FC = (): JSX.Element => {
  const { t } = useTranslation('signIn');
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [showError, setShowError] = useState<boolean>(false);

  useEffect(() => {
    const userName = localStorage.getItem('userName');

    if (userName) {
      navigate('/');
    }
  }, []);

  const onSignIn = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    e.preventDefault();
    const isSignIn = singIn(email, password);
    if (isSignIn) {
      localStorage.setItem('userName', email);
      window.dispatchEvent(new Event('storage'));
      navigate('/');
    } else {
      setShowError(true);
    }
  };

  return (
    <div className="flex grow flex-col justify-center items-center">
      <div className="container h-full w-full py-4 flex flex-col items-center px-4">
        <h1 className="py-8 text-2xl font-bold">
          {t('signIn.title')}
        </h1>
        <form className="flex flex-col w-1/2">
          <LoginInput
            type={INPUT_TYPE.EMAIL}
            placeholder={t('signIn.input.placeholder.email')}
            showError={showError}
            setShowError={setShowError}
            setInputValue={setEmail}
          />
          <LoginInput
            type={INPUT_TYPE.PASSWORD}
            placeholder={t('signIn.input.placeholder.password')}
            showError={showError}
            setShowError={setShowError}
            setInputValue={setPassword}
          />
          {showError && (
            <p className="text-rose-500">
              {t('signIn.credentials.error')}
            </p>
          )}
          <button
            type="button"
            onClick={onSignIn}
            className="bg-indigo-700 text-white px-4 py-2 my-8 rounded"
          >
            {t('signIn.button.signIn')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
