import {Text as RnText} from 'react-native';
import styled from 'styled-components/native';
import {color, typography} from 'styled-system';

const Text = styled(RnText)`
  color: ${({theme}) => theme.colors.textPrimary};
  ${color};
  ${typography};
  ${({fontWeight}) => (fontWeight === 'bold' ? 'Rubik-Bold' : 'Rubik-Regular')}
`;

export default Text;
