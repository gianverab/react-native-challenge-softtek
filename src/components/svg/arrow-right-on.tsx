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

const ArrowRightOnIcon = ({ rotate180 = false, ...props }: ArrowProps) => (
  <Svg
    width={32}
    height={32}
    fill="none"
    style={{
      transform: rotate180 ? [{ rotate: '180deg' }] : undefined,
    }}
    {...props}>
    <G clipPath="url(#a)">
      <Circle cx={16} cy={16} r={15} stroke="#4F4FFF" strokeWidth={2} />
      <Path
        fill="#432EFF"
        d="m14.705 21.205-1.41-1.41L17.085 16l-3.79-3.795 1.41-1.41L19.915 16l-5.21 5.205Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h32v32H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default ArrowRightOnIcon;
