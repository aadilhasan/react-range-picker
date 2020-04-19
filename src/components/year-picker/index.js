import React from 'react';
import { noHandler } from 'utils';
import Slider from '../common/slider';
import CloseButton from '../common/close-button';

import './index.scss';

class YearPicker extends React.Component {
  years_to_display = 12;
  state = {
    year: null,
    years: []
  };

  componentDidMount() {
    const { year } = this.props;
    this.setYearData(year, year);
  }
  componentWillReceiveProps({ year, visible }) {
    visible && this.setYearData(year, year);
  }

  setYearData = (selectedYear, startYear) => {
    this.setState({
      year: selectedYear,
      years: this.getYearsToRender(startYear),
      sartYear: startYear,
      endYear: startYear + this.years_to_display - 1
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
    const { year, years } = this.state;
    this.setYearData(year, years[0] + this.years_to_display * incrementBy);
  };

  render() {
    const { year, years, sartYear, endYear } = this.state;
    const { visible, min, max } = this.props;
    const { onChange = noHandler('no handler for year picker') } = this.props;
    const allowBackNavigation = min < years[0];
    const allowForwardNavigation = max > years[years.length - 1];
    return (
      <Slider visible={visible} className="year-picker">
        <div className="navigator">
          {allowBackNavigation ? (
            <button
              className="arrow prev"
              onClick={e => this.onYearChange(-1)}
            />
          ) : (
            <div className="button-placeholder" />
          )}
          <div className="values">
            {' '}
            {sartYear} - {endYear}
          </div>
          {allowForwardNavigation ? (
            <button
              className="arrow next"
              onClick={e => this.onYearChange(1)}
            />
          ) : (
            <div className="button-placeholder" />
          )}
        </div>
        <div className="year-grid">
          {years.map((yearItem, index) => {
            let className = `year-container`;
            className += year === yearItem ? ' selected' : '';
            className += yearItem < min || yearItem > max ? ' disabled' : '';
            return (
              <div
                key={index}
                className={className}
                onClick={() => onChange(yearItem)}
              >
                {' '}
                <div className="year">{yearItem}</div>{' '}
              </div>
            );
          })}
        </div>
        <CloseButton className="close" onClick={() => onChange(null)} />
      </Slider>
    );
  }
}

export default YearPicker;
