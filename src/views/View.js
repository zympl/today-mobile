import {View as RnView} from 'react-native';
import styled from 'styled-components/native';
import {color, flexbox, layout} from 'styled-system';

const View = styled(RnView)`
  ${color};
  ${flexbox};
  ${layout};
`;

export default View;
