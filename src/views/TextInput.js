import {TextInput as RnTextInput} from 'react-native';
import styled from 'styled-components/native';
import {color, space, typography, layout} from 'styled-system';

const TextInput = styled(RnTextInput)`
  color: ${({theme}) => theme.colors.textPrimary};
  ${color};
  ${typography};
  ${space};
  ${layout};
`;

export default TextInput;
