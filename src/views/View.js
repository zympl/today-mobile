import {View as RnView} from 'react-native';
import styled from 'styled-components/native';
import {border, color, flexbox, layout, space} from 'styled-system';

const View = styled(RnView)`
  ${color};
  ${flexbox};
  ${layout};
  ${space};
  ${border};
`;

export default View;
