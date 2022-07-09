import useForm from './useForm';
import { formDataAuth, validateForm } from '../utils/validate';
import { UseAuthProps } from '../interfaces/components';
import useStyles from './useStyles';
import useContextApp from './useContextApp';
import { authRequest } from '../api/request';
import { DataAuth } from '../interfaces/data';

const useAuth = ({ type, navigation }: UseAuthProps) => {
	const { styles } = useStyles();
	const { visible, setVisible, loadingAuth, setLoadingAuth, setToken } = useContextApp();
	const form = formDataAuth(type);
	const { email, password, repeatPassword, username, handleChangeText } = useForm(form);
	const handleNavigate = () => navigation.navigate('register');
	const handleLogin = async () => {
		const data = { email, password };
		handleAuth('auth/', data);
	};
	const handleRegister = async () => {
		const data = { email, password, repeatPassword, username };
		handleAuth('auth/register', data);
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
		handleRegister
	};
};

export default useAuth;
