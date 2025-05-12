import React from 'react';

import { Meter, MeterBar, MeterFill, MeterLabel, MeterValue } from './Meter';

export default {
  title: 'RAC/Meter',
  component: Meter,
  parameters: {
    a11y: {
      config: {
        // aria-roles rule seems to be incorrectly flagging the ARIA role as invalid
        rules: [{ id: 'aria-roles', reviewOnFail: true }],
      },
    },
  },
};

export const Default = () => (
  <Meter value={15}>
    {({ percentage, valueText }) => (
      <>
        <MeterLabel>Storage space</MeterLabel>
        <MeterValue>{valueText}</MeterValue>
        <MeterBar>
          <MeterFill percentage={percentage} />
        </MeterBar>
      </>
    )}
  </Meter>
);
