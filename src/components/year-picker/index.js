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
    this.setYearData(year);
  }
  componentWillReceiveProps({ year }) {
    this.setYearData(year);
  }

  setYearData = year => {
    this.setState({
      year,
      years: this.getYearsToRender(year),
      sartYear: year,
      endYear: year + this.years_to_display - 1
    });
  };

  getYearsToRender = year => {
    let counter = year,
      limit = year + this.years_to_display,
      years = [];
    while (counter < limit) {
      years.push(counter++);
    }
    return years;
  };

  onYearChange = incrementBy => {
    const { year } = this.state;
    this.setYearData(year + this.years_to_display * incrementBy);
  };

  render() {
    const { year, years, sartYear, endYear } = this.state;
    const { visible, selected } = this.props;
    const { onChange = noHandler('no handler for year picker') } = this.props;
    return (
      <div className={`year-picker${visible ? ' visible' : ' hidden'}`}>
        <div className="navigator">
          <button className="arrow prev" onClick={e => this.onYearChange(-1)} />
          <div className="values">
            {' '}
            {sartYear} - {endYear}
          </div>
          <button className="arrow next" onClick={e => this.onYearChange(1)} />
        </div>
        <div className="year-grid">
          {years.map((yearItem, index) => {
            return (
              <div
                key={index}
                className={`year-container${
                  year === yearItem ? ' selected' : ''
                }`}
                onClick={() => onChange(yearItem)}
              >
                {' '}
                <div className="year">{yearItem}</div>{' '}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default YearPicker;
