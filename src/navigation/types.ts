import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  Plans: undefined;
  Summary: undefined;
};

export type HomeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Home'
>;

export type PlansScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Plans'
>;

export type SummaryScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Summary'
>;
