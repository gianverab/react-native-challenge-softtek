import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from '../ui/Input';
import Checkbox from '../ui/Checkbox';
import Button from '../ui/Button';
import { useAppContext } from '../../context/AppContext';
import { FormDataHome } from '../../types';

const schema = yup
  .object({
    dni: yup.string().required('El DNI es requerido'),
    phone: yup.string().required('El celular es requerido'),
    acceptedPrivacy: yup
      .boolean()
      .oneOf([true], 'Debes aceptar la Política de Privacidad')
      .required('Debes aceptar la Política de Privacidad'),
    acceptedCommunication: yup
      .boolean()
      .oneOf([true], 'Debes aceptar la Política de Comunicaciones')
      .required('Debes aceptar la Política de Comunicaciones'),
  })
  .required();

type Props = {
  navigation: any;
};

export const UserForm: React.FC<Props> = ({ navigation }) => {
  const { dispatch } = useAppContext();

  const { control, handleSubmit, formState } = useForm<FormDataHome>({
    resolver: yupResolver(schema),
    defaultValues: {
      dni: '',
      phone: '',
      acceptedPrivacy: false,
      acceptedCommunication: false,
    },
  });

  const onSubmit = (data: FormDataHome) => {
    dispatch({ type: 'SET_FORM_DATA', payload: data });
    // reset
    dispatch({ type: 'SET_SELECTED_PLAN', payload: null as any });
    dispatch({ type: 'SET_FOR_WHO', payload: null as any });
    navigation.navigate('Plans');
  };

  return (
    <View style={styles.form}>
      <Controller
        control={control}
        name="dni"
        render={({ field: { onChange, value } }) => (
          <Input
            label="Nro. de documento"
            value={value}
            onChangeText={onChange}
            keyboardType="number-pad"
            error={formState.errors.dni?.message as string}
            testID="dni-input"
          />
        )}
      />

      <Controller
        control={control}
        name="phone"
        render={({ field: { onChange, value } }) => (
          <Input
            label="Celular"
            value={value}
            onChangeText={onChange}
            keyboardType="phone-pad"
            error={formState.errors.phone?.message as string}
            testID="phone-input"
          />
        )}
      />

      <Controller
        control={control}
        name="acceptedPrivacy"
        render={({ field: { onChange, value } }) => (
          <Checkbox
            label="Acepto la Política de Privacidad"
            value={value}
            onValueChange={onChange}
            error={formState.errors.acceptedPrivacy?.message as string}
            testID="terms-checkbox"
          />
        )}
      />

      <Controller
        control={control}
        name="acceptedCommunication"
        render={({ field: { onChange, value } }) => (
          <>
            <Checkbox
              label="Acepto la Política de Comunicaciones Comerciales"
              value={value}
              onValueChange={onChange}
              error={formState.errors.acceptedCommunication?.message as string}
              testID="terms-checkbox"
            />
          </>
        )}
      />

      <Text style={styles.termsText}>Aplican Términos y Condiciones.</Text>

      <Button
        title="Cotiza aquí"
        onPress={handleSubmit(onSubmit)}
        testID="cotiza-button"
        style={styles.formButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    marginBottom: 24,
  },
  formButton: {
    marginTop: 36,
    backgroundColor: '#03050F',
    borderRadius: 40,
    paddingHorizontal: 40,
  },
  termsText: {
    fontSize: 12,
    lineHeight: 20,
    color: '#03050F',
    letterSpacing: 0.1,
    fontWeight: '600',
    marginTop: 12,
    textDecorationStyle: 'solid',
    textDecorationColor: '#03050F',
    textDecorationLine: 'underline',
  },
});
