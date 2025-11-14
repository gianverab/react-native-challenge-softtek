import React, { useRef } from 'react';
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
import { usePlanFilter } from '../hooks/usePlanFilter';
import Input from '../components/ui/Input';
import ArrowLeftOffIcon from '../components/svg/arrow-left-off';
import ArrowRightOnIcon from '../components/svg/arrow-right-on';

const { width } = Dimensions.get('window');

const PlansScreen: React.FC<PlansScreenProps> = ({ navigation }) => {
  useUser();
  const { state, dispatch } = useAppContext();

  const {
    option,
    setOption,
    relativeAge,
    setRelativeAge,
    filteredPlans,
    loadingPlans,
    pageIndex,
    setPageIndex,
    goNext,
    goPrev,
    totalPages,
  } = usePlanFilter();

  const flatRef = useRef<FlatList<any>>(null);

  const disabledPrev = pageIndex === 0;
  const disabledNext = pageIndex >= totalPages - 1;

  const onSelectOption = (val: 'me' | 'someone') => {
    setOption(val);
    setPageIndex(0);
    flatRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

  const onSelectPlan = (plan: Plan) => {
    const isSomeone = option === 'someone';
    const finalPrice = isSomeone ? +(plan.price * 0.95).toFixed(2) : plan.price;
    dispatch({ type: 'SET_SELECTED_PLAN', payload: { ...plan, finalPrice } });
    navigation.navigate('Summary');
  };

  return (
    <Layout>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.sectionOptions}>
          <View style={styles.textBox}>
            <Text style={styles.textBoxTitle}>
              {state.apiUser?.name ?? ''} ¿Para quién deseas cotizar?
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
          {option === 'someone' && (
            <View>
              <Input
                label="Introduce la edad de tu familiar o ser querido"
                value={relativeAge}
                onChangeText={(v: string) =>
                  setRelativeAge(v.replace(/[^0-9]/g, ''))
                }
                keyboardType="number-pad"
                placeholder="Ej: 45"
              />
            </View>
          )}
        </View>

        {loadingPlans && <ActivityIndicator />}

        {(option === 'me' ||
          (option === 'someone' && relativeAge.length > 0)) && (
          <>
            <FlatList
              ref={flatRef}
              data={filteredPlans}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item.name}
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
              ListEmptyComponent={() => (
                <View style={styles.emptyBox}>
                  <Text style={styles.emptyText}>
                    No se encontraron planes disponibles.
                  </Text>
                </View>
              )}
              contentContainerStyle={styles.sectionPlans}
            />
            {filteredPlans.length > 0 && (
              <View style={styles.paginationBox}>
                <TouchableOpacity
                  disabled={disabledPrev}
                  onPress={() => {
                    goPrev();
                    flatRef.current?.scrollToIndex({
                      index: Math.max(0, pageIndex - 1),
                    });
                  }}>
                  {disabledPrev ? (
                    <ArrowLeftOffIcon />
                  ) : (
                    <ArrowRightOnIcon rotate180 />
                  )}
                </TouchableOpacity>

                <Text style={styles.pageIndicator}>{`${Math.min(
                  pageIndex + 1,
                  filteredPlans.length,
                )} / ${filteredPlans.length}`}</Text>

                <TouchableOpacity
                  disabled={disabledNext}
                  onPress={() => {
                    goNext();
                    flatRef.current?.scrollToIndex({
                      index: Math.min(filteredPlans.length - 1, pageIndex + 1),
                    });
                  }}>
                  {disabledNext ? (
                    <ArrowLeftOffIcon rotate180 />
                  ) : (
                    <ArrowRightOnIcon />
                  )}
                </TouchableOpacity>
              </View>
            )}
          </>
        )}
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8F9FD',
    flexGrow: 1,
    paddingBottom: 48,
  },
  sectionOptions: {
    gap: 32,
    paddingVertical: 24,
    borderTopColor: '#CCD1EE',
    borderTopWidth: 1,
  },
  sectionPlans: {
    marginBottom: 32,
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
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    letterSpacing: 0.2,
    color: '#141938',
  },
  arrow: {
    fontSize: 28,
    color: '#141938',
  },
  arrowDisabled: {
    color: '#E5E7EB',
  },
  emptyBox: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 24,
    flexDirection: 'row',
  },
  emptyText: {
    color: '#6B7280',
    textAlign: 'center',
  },
});
export default PlansScreen;
