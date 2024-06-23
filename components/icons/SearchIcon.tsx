import React from 'react';
import { styled } from 'nativewind';
import { Svg, Path, SvgProps } from 'react-native-svg';

const StyledPath = styled(Path, { classProps: ['fill', 'stroke'] });

interface Props extends SvgProps {}

const SearchIcon: React.FC<Props> = ({
  width = 20,
  height = 20,
  fill = 'fill-gray-400',
  ...props
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 512 512" {...props}>
      <StyledPath
        fill={fill}
        d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
      />
    </Svg>
  );
};

export default SearchIcon;
