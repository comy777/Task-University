import useForm from './useForm';
import {formDataAuth, validateForm} from '../utils/validate';
import {UseAuthProps} from '../interfaces/components';
import useStyles from './useStyles';
import useContextApp from './useContextApp';
import {authRequest, authResetPassword} from '../api/request';
import {DataAuth} from '../interfaces/data';

const useAuth = ({type, navigation}: UseAuthProps) => {
  const {styles} = useStyles();
  const {visible, setVisible, loadingAuth, setLoadingAuth, setToken} =
    useContextApp();
  const form = formDataAuth(type);
  const {email, password, repeatPassword, username, handleChangeText, reset} =
    useForm(form);
  const handleNavigate = (route: string) => navigation.navigate(route);
  const handleLogin = async () => {
    const data = {email, password};
    handleAuth('auth/', data);
  };
  const handleRegister = async () => {
    const data = {email, password, repeatPassword, username};
    handleAuth('auth/register', data);
  };
  const handleResetPassword = async () => {
    if (!email) return;
    setLoadingAuth();
    await authResetPassword(email);
    reset();
    setLoadingAuth();
  };
  const handleAuth = async (url: string, data: DataAuth) => {
    const validate = validateForm(data);
    if (!validate) return;
    setLoadingAuth();
    const resp = await authRequest(url, data);
    setLoadingAuth();
    if (!resp) return;
    setToken(resp);
  };
  return {
    email,
    username,
    password,
    repeatPassword,
    handleChangeText,
    handleNavigate,
    handleLogin,
    styles,
    visible,
    setVisible,
    loadingAuth,
    handleRegister,
    handleResetPassword,
  };
};

export default useAuth;
