import React from 'react';
type Dates = {
  startDate: Date;
  endDate: Date;
};

type DefaultValue = {
  startDate: Date;
  endDate?: Date;
};

type FooterParams = Dates & { close: Function; today: Function };

export interface Props {
  defaultValue?: DefaultValue;
  selectTime?: boolean;
  onDateSelected?: Function;
  onClose?: Function;
  closeOnSelect?: boolean;
  disableRange?: boolean;
  rangeTillEndOfDay?: boolean;
  placeholder?: (Dates) => React.Component;
  placeholderText?: string;
  dateFormat?: string;
  footer?: (FooterParams) => React.Component;
}

export default class RangePicker extends React.Component<Props> {}
