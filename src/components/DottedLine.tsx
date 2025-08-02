import React from 'react';
import Svg, { Line } from 'react-native-svg';
import { View, StyleSheet } from 'react-native';

interface DashedLineProps {
  lineColor?: string;
  height?: number; // strokeWidth
  dashWidth?: number;
  dashGap?: number;
  style?: { width: any; height?: number }; // must include width
}

const DashedLine: React.FC<DashedLineProps> = ({
  lineColor = '#000',
  height = 1,
  dashWidth = 6,
  dashGap = 4,
  style = { width: 200, height: 1 },
}) => {
  const { width, height: viewHeight = height } = style;

  return (
    <View style={[styles.container, style]}>
      <Svg height={viewHeight} width={width}>
        <Line
          x1="0"
          y1={viewHeight / 2}
          x2={width}
          y2={viewHeight / 2}
          stroke={lineColor}
          strokeWidth={height}
          strokeDasharray={[dashWidth, dashGap]}
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
});

export default DashedLine;
