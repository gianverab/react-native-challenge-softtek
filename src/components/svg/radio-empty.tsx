import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const RadioEmptyIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      stroke="#A9AFD9"
      strokeLinecap="square"
      d="M12 .5C18.324.5 23.5 5.676 23.5 12S18.324 23.5 12 23.5.5 18.324.5 12 5.676.5 12 .5Z"
    />
  </Svg>
);
export default RadioEmptyIcon;
