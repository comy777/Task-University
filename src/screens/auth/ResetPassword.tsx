import React from 'react';
import {View, TextInput} from 'react-native';
import Btn from '../../components/Btn';
import useAuth from '../../hooks/useAuth';
import useStyles from '../../hooks/useStyles';
import {AuthProps} from '../../interfaces/components';

const ResetPassword = (props: AuthProps) => {
  const {styles} = useStyles();
  const {email, handleChangeText, handleResetPassword, loadingAuth} = useAuth({
    ...props,
    type: 'login',
  });
  return (
    <View style={styles.containerCenter}>
      <TextInput
        placeholder="Correo electonico"
        style={styles.inputContainer}
        value={email}
        onChangeText={value => handleChangeText(value, 'email')}
      />
      <Btn
        title="Enviar"
        onPress={handleResetPassword}
        loading={loadingAuth}
        disabled={loadingAuth}
        auth
      />
    </View>
  );
};

export default ResetPassword;
