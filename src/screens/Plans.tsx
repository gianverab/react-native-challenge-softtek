import React, { useEffect, useState, useRef } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { PlansScreenProps } from '../navigation/types';
import { Layout } from '../components/layout/Layout';
import { useAppContext } from '../context/AppContext';
import UserIcon from '../components/svg/user';
import OtherUserIcon from '../components/svg/other';
import OptionCard from '../components/plans/OptionCard';
import { Plan } from '../types';
import PlanCard from '../components/plans/PlanCard';
import { useUser } from '../hooks/useUser';
import { usePlans } from '../hooks/usePlans';

const { width } = Dimensions.get('window');

const PlansScreen: React.FC<PlansScreenProps> = ({ navigation }) => {
  const { state, dispatch } = useAppContext();
  const { user, loading: loadingUser } = useUser();
  const { plans, loading: loadingPlans, fetchPlans } = usePlans();
  const [option, setOption] = useState<'me' | 'someone' | null>(state.option);
  const flatListRef = useRef<FlatList>(null);
  const [pageIndex, setPageIndex] = useState(0);

  useEffect(() => {
    if (user && option) {
      fetchPlans(user.birthDay);
    }
  }, [user, option, fetchPlans]);

  const onSelectOption = (val: 'me' | 'someone') => {
    setOption(val);
    dispatch({ type: 'SET_OPTION', payload: val });
  };

  const onSelectPlan = (plan: Plan) => {
    const isSomeone = state.option === 'someone' || option === 'someone';
    const finalPrice = isSomeone ? +(plan.price * 0.95).toFixed(2) : plan.price;
    dispatch({ type: 'SET_SELECTED_PLAN', payload: { ...plan, finalPrice } });
    //navigation.navigate('Summary');
  };

  const scrollToPage = (index: number) => {
    if (!flatListRef.current) return;
    flatListRef.current.scrollToIndex({ index, animated: true });
    setPageIndex(index);
  };

  if (loadingUser) return <ActivityIndicator style={{ marginTop: 80 }} />;

  return (
    <Layout>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.sectionOptions}>
          <View style={styles.textBox}>
            <Text style={styles.textBoxTitle}>
              {user?.name ?? ''} ¿Para quién deseas cotizar?
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

        {loadingPlans && <ActivityIndicator />}

        {option && plans.length > 0 && (
          <>
            <FlatList
              ref={flatListRef}
              data={plans}
              horizontal
              pagingEnabled
              keyExtractor={item => item.name}
              showsHorizontalScrollIndicator={false}
              onMomentumScrollEnd={ev => {
                const index = Math.round(
                  ev.nativeEvent.contentOffset.x / width,
                );
                setPageIndex(index);
              }}
              renderItem={({ item }) => (
                <View style={{ width }}>
                  <PlanCard plan={item} onSelect={() => onSelectPlan(item)} />
                </View>
              )}
            />

            <View style={styles.paginationBox}>
              <TouchableOpacity
                disabled={pageIndex === 0}
                onPress={() => scrollToPage(pageIndex - 1)}>
                <Text style={styles.arrow}>{'<'}</Text>
              </TouchableOpacity>

              <Text style={styles.pageIndicator}>{`${pageIndex + 1}/${
                plans.length
              }`}</Text>

              <TouchableOpacity
                disabled={pageIndex === plans.length - 1}
                onPress={() => scrollToPage(pageIndex + 1)}>
                <Text style={styles.arrow}>{'>'}</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
        {option && !loadingPlans && plans.length === 0 && (
          <Text style={{ marginTop: 16 }}>
            No hay planes disponibles para tu edad.
          </Text>
        )}
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
  sectionPlans: {
    paddingVertical: 24,
    gap: 16,
  },
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
  paginationBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    gap: 20,
  },
  pageIndicator: {
    fontSize: 18,
    fontWeight: '700',
  },
  arrow: {
    fontSize: 28,
    color: '#141938',
  },
});
export default PlansScreen;
