import React from 'react';
import { View, StyleSheet } from 'react-native';
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
    acceptedTerms: yup
      .boolean()
      .oneOf([true], 'Debes aceptar la política')
      .required('Debes aceptar la política'),
  })
  .required();

type Props = {
  navigation: any;
};

export const HomeForm: React.FC<Props> = ({ navigation }) => {
  const { dispatch } = useAppContext();

  const { control, handleSubmit, formState } = useForm<FormDataHome>({
    resolver: yupResolver(schema),
    defaultValues: {
      dni: '',
      phone: '',
      acceptedTerms: false,
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
        name="acceptedTerms"
        render={({ field: { onChange, value } }) => (
          <Checkbox
            label="Acepto la Política de Privacidad"
            value={value}
            onValueChange={onChange}
            testID="terms-checkbox"
          />
        )}
      />

      <Button
        title="Cotiza aquí"
        onPress={handleSubmit(onSubmit)}
        testID="cotiza-button"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    marginTop: 16,
    marginBottom: 24,
  },
});
