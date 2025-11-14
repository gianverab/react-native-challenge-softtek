import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { PlansScreenProps } from '../navigation/types';
import { Layout } from '../components/layout/Layout';
import { useAppContext } from '../context/AppContext';
import UserIcon from '../components/svg/user';
import OtherUserIcon from '../components/svg/other';
import RadioCheckedIcon from '../components/svg/radio-checked';
import RadioEmptyIcon from '../components/svg/radio-empty';

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
            <TouchableOpacity
              onPress={() => onSelectOption('me')}
              style={[
                styles.optionCard,
                option === 'me' && styles.optionSelected,
              ]}>
              <View style={styles.optionText}>
                <View style={styles.optionCheckbox}>
                  {option === 'me' ? <RadioCheckedIcon /> : <RadioEmptyIcon />}
                </View>
                <View style={styles.optionTitle}>
                  <UserIcon />
                  <Text style={styles.optionTitleText}>Para mí</Text>
                </View>
                <Text style={styles.optionDesc}>
                  Cotiza tu seguro de salud y agrega familiares si así lo
                  deseas.
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onSelectOption('someone')}
              style={[
                styles.optionCard,
                option === 'someone' && styles.optionSelected,
              ]}>
              <View style={styles.optionText}>
                <View style={styles.optionCheckbox}>
                  {option === 'someone' ? (
                    <RadioCheckedIcon />
                  ) : (
                    <RadioEmptyIcon />
                  )}
                </View>
                <View style={styles.optionTitle}>
                  <OtherUserIcon />
                  <Text style={styles.optionTitleText}>Para alguien más</Text>
                </View>
                <Text style={styles.optionDesc}>
                  Realiza una cotización para uno de tus familiares o cualquier
                  persona.
                </Text>
              </View>
            </TouchableOpacity>
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
  optionCard: {
    backgroundColor: '#fff',
    paddingTop: 16,
    paddingBottom: 40,
    paddingHorizontal: 24,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  optionCheckbox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  optionText: {
    gap: 8,
  },
  optionSelected: {
    borderColor: '#1f2937',
    shadowColor: '#000',
    elevation: 4,
  },
  optionTitle: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  optionTitleText: {
    fontWeight: '900',
    fontSize: 20,
    lineHeight: 28,
    letterSpacing: -0.2,
    color: '#141938',
  },
  optionDesc: {
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 20,
    letterSpacing: 0.2,
    color: '#141938',
  },
});
export default PlansScreen;
