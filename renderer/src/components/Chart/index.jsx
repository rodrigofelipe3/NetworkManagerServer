import * as React from 'react';
import Stack from '@mui/material/Stack';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import { GaugeChart } from './style';

export default function Chart({value, startAngle, endAngle}) {
  return (
    <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 1, md: 3 }}>
      <GaugeChart width={150} height={150} value={value? value : 0} cornerRadius={'50%'} startAngle={startAngle? startAngle : 0} endAngle={endAngle? endAngle : 360} sx={(theme) => ({
    [`& .${gaugeClasses.valueText}`]: {
      fontSize: 50,
      border: 'none',
    },
    [`& .${gaugeClasses.valueArc}`]: {
      fill: '#0056c6',
      border: 'none',
    },
    [`& .${gaugeClasses.referenceArc}`]: {
      fill: '#494949',
      border: 'none',
    },

  })}></GaugeChart>
    </Stack>
  );
}