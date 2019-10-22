import React from 'react';
type Dates = {
  startDate: Date;
  endDate: Date;
};

type FooterParams = Dates & { close: Function; today: Function };

export interface Props {
  selectTime?: boolean;
  onDateSelected?: Function;
  onClose?: Function;
  disableRange?: boolean;
  selectTime?: boolean;
  rangeTillEndOfDay?: boolean;
  placeholder?: (Dates) => React.Component;
  footer?: (FooterParams) => React.Component;
}

export default class RangePicker extends React.Component<Props> {}
