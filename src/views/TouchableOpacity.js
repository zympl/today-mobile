import {TouchableOpacity as RnTouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import {color, space, layout, flexbox, border} from 'styled-system';

const TouchableOpacity = styled(RnTouchableOpacity).attrs(props => ({
  activeOpacity: props.theme.activeOpacity,
}))`
  ${flexbox};
  ${color};
  ${space};
  ${layout};
  ${border};
  ${props => (props.disabled ? `opacity: ${props.theme.disabledOpacity};` : '')}
`;

export default TouchableOpacity;
