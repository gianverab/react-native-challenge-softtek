import * as React from 'react';
import Svg, {
  SvgProps,
  G,
  Path,
  Circle,
  Defs,
  ClipPath,
} from 'react-native-svg';

type ArrowProps = SvgProps & {
  rotate180?: boolean;
};

const ArrowLeftOffIcon = ({ rotate180 = false, ...props }: ArrowProps) => (
  <Svg
    width={32}
    height={32}
    fill="none"
    style={{
      transform: rotate180 ? [{ rotate: '180deg' }] : undefined,
    }}
    {...props}>
    <G clipPath="url(#a)">
      <Circle cx={16} cy={16} r={15} stroke="#A9AFD9" strokeWidth={2} />
      <Path
        fill="#7981B2"
        d="M17.295 21.205 12.085 16l5.21-5.205 1.41 1.41L14.915 16l3.79 3.795-1.41 1.41Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h32v32H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default ArrowLeftOffIcon;
