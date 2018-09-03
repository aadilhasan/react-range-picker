import React from 'react';
import { noHandler } from 'utils';

import './index.scss';

class YearPicker extends React.Component {
  years_to_display = 12;
  state = {
    year: null,
    years: []
  };

  componentDidMount() {
    const { year } = this.props;
    this.setState({
      year,
      years: this.getYearsToRender(year)
    });
  }
  componentWillReceiveProps({ year }) {
    this.setState({
      year,
      years: this.getYearsToRender(year)
    });
  }

  getYearsToRender = year => {
    let counter = year + 1,
      limit = year + this.years_to_display,
      years = [];
    while (counter <= limit) {
      years.push(counter++);
    }
    return years;
  };

  render() {
    const { years } = this.state;
    const { visible } = this.props;
    const { onChange = noHandler('no handler for year picker') } = this.props;
    return (
      <div className={`year-picker${visible ? ' visible' : ' hidden'}`}>
        <div className="year-grid">
          {years.map(year => {
            return (
              <div className="year-container" onClick={() => onChange(year)}>
                {' '}
                <div className="year">{year}</div>{' '}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default YearPicker;
