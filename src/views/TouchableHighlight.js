import {TouchableHighlight as RnTouchableHighlight} from 'react-native';
import styled from 'styled-components/native';
import {color, space, layout, flexbox, border} from 'styled-system';

const TouchableHighlight = styled(RnTouchableHighlight).attrs(props => ({
  underlayColor: props.theme.colors.primaryHoverBg,
}))`
  ${flexbox};
  ${color};
  ${space};
  ${layout};
  ${border};
  ${props => (props.disabled ? `opacity: ${props.theme.disabledOpacity};` : '')}
`;

export default TouchableHighlight;
