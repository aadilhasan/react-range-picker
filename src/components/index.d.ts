import React from 'react';
type Dates = {
  startDate: Date;
  endDate: Date;
};

type FooterParams = Dates & { close: function; today: function };

export interface Props {
  selectTime?: boolean;
  onDateSelected?: function;
  onClose?: function;
  disableRange?: boolean;
  selectTime?: boolean;
  rangeTillEndOfDay?: boolean;
  placeholder?: (Dates) => React.Component;
  footer?: (FooterParams) => React.Component;
}

export default class RangePicker extends React.Component<Props> {}
