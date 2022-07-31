import React, { useCallback, useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

interface StateProps {
  balance: {
    balance: number;
  };
}

const Navbar: React.FC = (): JSX.Element => {
  const { t } = useTranslation('navbar');
  const navigate = useNavigate();

  const { balance } = useSelector((state: StateProps) => state.balance);

  const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('userName');

    if (isLoggedIn) {
      setUserLoggedIn(true);
    }
  }, [userLoggedIn]);

  useEffect(() => {
    window.addEventListener('storage', () => {
      const isLoggedIn = localStorage.getItem('userName');

      if (isLoggedIn) {
        setUserLoggedIn(true);
      }
    });
  }, []);

  const onSignOut = useCallback((): void => {
    localStorage.removeItem('userName');
    localStorage.removeItem('deck_id');

    setUserLoggedIn(false);

    navigate('/login');
  }, []);

  const onLogin = useCallback((): void => {
    navigate('/login');
  }, []);

  return (
    <div className="h-screen mx-auto flex flex-col bg-slate-50">
      <div className="flex justify-center h-24 bg-slate-700">
        <div className="container h-full w-full flex justify-between items-center px-4">
          <div className="rounded px-4 py-2 bg-slate-900 text-white">
            {t('navbar.game.title')}
          </div>
          {userLoggedIn && (
            <>
              <div className="flex text-white items-center">
                <p className="px-4">
                  {t('navbar.balance.title')}
                  :
                </p>
                <div className="rounded px-4 py-2 bg-slate-900 text-white">
                  {balance}
                </div>
              </div>
              <button
                type="button"
                onClick={userLoggedIn ? onSignOut : onLogin}
                className="rounded px-4 py-2 text-white"
              >
                {t('navbar.button.signOut')}
              </button>
            </>
          )}
        </div>
      </div>

      <Outlet />
    </div>
  );
};

export default Navbar;
