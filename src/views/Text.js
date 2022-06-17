import {Text as RnText} from 'react-native';
import styled from 'styled-components/native';
import {color, space, typography, layout} from 'styled-system';

const Text = styled(RnText)`
  color: ${({theme}) => theme.colors.textPrimary};
  ${color};
  ${typography};
  ${space};
  ${layout};
  ${props => {
    if (props.h1) {
      return `
        font-size: ${props.theme.fontSizes.h1};
        line-height: ${props.theme.lineHeights.h1};
        font-family: ${props.theme.fonts.bold};
      `;
    }

    if (props.h2) {
      return `
        font-size: ${props.theme.fontSizes.h2};
        line-height: ${props.theme.lineHeights.h2};
        font-family: ${props.theme.fonts.bold};
      `;
    }

    if (props.h3) {
      return `
        font-size: ${props.theme.fontSizes.h3};
        line-height: ${props.theme.lineHeights.h3};
        font-family: ${props.theme.fonts.bold};
      `;
    }

    if (props.p1) {
      return `
        font-size: ${props.theme.fontSizes.p1};
        line-height: ${props.theme.lineHeights.p1};
        font-family: ${props.theme.fonts.normal};
      `;
    }

    if (props.p2) {
      return `
        font-size: ${props.theme.fontSizes.p2};
        line-height: ${props.theme.lineHeights.p2};
        font-family: ${props.theme.fonts.normal};
      `;
    }
  }}
`;

export default Text;
