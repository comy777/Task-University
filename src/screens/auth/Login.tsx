import React from 'react';
import {View, TextInput} from 'react-native';
import InputIcon from '../../components/InputIcon';
import useAuth from '../../hooks/useAuth';
import Btn from '../../components/Btn';
import {AuthProps} from '../../interfaces/components';

const Login = (props: AuthProps) => {
  const {
    email,
    password,
    handleChangeText,
    handleNavigate,
    handleLogin,
    styles,
    visible,
    setVisible,
    loadingAuth,
  } = useAuth({...props, type: 'login'});

  return (
    <View style={styles.containerCenter}>
      <TextInput
        placeholder="Correo electronico"
        style={styles.inputContainer}
        value={email}
        onChangeText={value => handleChangeText(value, 'email')}
        placeholderTextColor={styles.textColorTheme.color}
        keyboardType="email-address"
      />
      <InputIcon
        icon={visible ? 'eye-outline' : 'eye-off-outline'}
        onPress={setVisible}
        visible={visible}
        value={password}
        onChangeText={value => handleChangeText(value, 'password')}
      />
      <Btn
        title="Iniciar sesion"
        onPress={handleLogin}
        loading={loadingAuth}
        disabled={loadingAuth}
        auth
      />
      <Btn
        title="Crear cuenta"
        style={{}}
        styleText={styles.btnTextDefault}
        onPress={() => handleNavigate('register')}
        disabled={loadingAuth}
      />
      <Btn
        title="¿Olvido su contraseña?"
        style={{marginTop: 15}}
        styleText={styles.btnTextDefault}
        onPress={() => handleNavigate('reset password')}
        disabled={loadingAuth}
      />
    </View>
  );
};

export default Login;
