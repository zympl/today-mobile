import {SafeAreaView as RnSafeAreaView} from 'react-native';
import styled from 'styled-components/native';
import {color, space, layout} from 'styled-system';

const SafeAreaView = styled(RnSafeAreaView)`
  ${color};
  ${space};
  ${layout};
`;

export default SafeAreaView;
