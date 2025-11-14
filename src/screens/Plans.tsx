import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { PlansScreenProps } from '../navigation/types';
import { Layout } from '../components/layout/Layout';
import { useAppContext } from '../context/AppContext';
import UserIcon from '../components/svg/user';
import OtherUserIcon from '../components/svg/other';
import RadioCheckedIcon from '../components/svg/radio-checked';
import RadioEmptyIcon from '../components/svg/radio-empty';
import OptionCard from '../components/plans/OptionCard';

const PlansScreen: React.FC<PlansScreenProps> = ({ navigation }) => {
  const { state, dispatch } = useAppContext();
  const [option, setOption] = useState<'me' | 'someone' | null>(
    state.option ?? null,
  );

  const onSelectOption = (val: 'me' | 'someone') => {
    setOption(val);
    dispatch({ type: 'SET_OPTION', payload: val });
  };

  return (
    <Layout>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.sectionOptions}>
          <View style={styles.textBox}>
            <Text style={styles.textBoxTitle}>
              Rocío ¿Para quién deseas cotizar?
            </Text>
            <Text style={styles.textBoxSubtitle}>
              Selecciona la opción que se ajuste más a tus necesidades.
            </Text>
          </View>
          <View style={styles.optionsBox}>
            <OptionCard
              title="Para mí"
              description="Cotiza tu seguro de salud y agrega familiares si así lo deseas."
              icon={<UserIcon />}
              checked={option === 'me'}
              onPress={() => onSelectOption('me')}
              id="option-me"
            />
            <OptionCard
              title="Para alguien más"
              description="Realiza una cotización para uno de tus familiares o cualquier persona."
              icon={<OtherUserIcon />}
              checked={option === 'someone'}
              onPress={() => onSelectOption('someone')}
              id="option-someone"
            />
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8F9FD',
    flexGrow: 1,
  },
  sectionOptions: {
    gap: 32,
    paddingVertical: 24,
    borderTopColor: '#CCD1EE',
    borderTopWidth: 1,
  },
  sectionPlans: {},
  textBox: {
    gap: 8,
  },
  optionsBox: {
    gap: 24,
  },
  textBoxTitle: {
    fontSize: 28,
    lineHeight: 36,
    fontWeight: '700',
    letterSpacing: -0.2,
    color: '#141938',
  },
  textBoxSubtitle: {
    fontSize: 16,
    lineHeight: 28,
    fontWeight: '400',
    letterSpacing: 0.1,
    color: '#141938',
  },
});
export default PlansScreen;
