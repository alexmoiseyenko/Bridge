const MOCK_USER_NAME = 'admin';
const MOCK_USER_PASS = '123456';

const singIn = (email: string, pass: string): boolean => (
  email === MOCK_USER_NAME && pass === MOCK_USER_PASS
);

export default singIn;
