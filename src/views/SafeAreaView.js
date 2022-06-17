import {SafeAreaView as RnSafeAreaView} from 'react-native';
import styled from 'styled-components/native';
import {color} from 'styled-system';

const SafeAreaView = styled(RnSafeAreaView)`
  ${color};
`;

export default SafeAreaView;
