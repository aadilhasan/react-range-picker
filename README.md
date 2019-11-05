React Js based date/range picker, unlike other range pickers it uses single calendar to select the range.
[Click here to see it in action](https://codesandbox.io/s/async-rain-m5m831xjk9)

### install

```sh
$ npm i react-range-picker --save
```

### use

```sh
import RangePicker from "react-range-picker"

<RangePicker/>
```

### APIS

| API               | Type                       | Description                                                                                                                                                                                                                                             |
| ----------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| onDateSelected    | function                   | gets called each time date/time gets selected (params - startDate<Date object>, startDate<Date object>)                                                                                                                                                 |
| onClose           | function                   | gets called when calendar closes or ok/select button is pressed (params - startDate<Date object>, endDate<Date object>)                                                                                                                                 |
| disableRange      | boolean                    | if true user can select only one date (default false)                                                                                                                                                                                                   |
| selectTime        | boolean                    | if true, time select will show up on date select (default false)                                                                                                                                                                                        |
| rangeTillEndOfDay | boolean                    | if true, then second selected date for range will have time of end of the day (11.59 PM) else it will have time of start of the day (12:00 AM)                                                                                                          |
| placeholder       | function => ReactComponent | change placeholder, placeholder function will recieve following object as param - `{startDate (date object),endDate (date object)}`                                                                                                                     |
| placeholderText   | string                     | replaces placeholder default text                                                                                                                                                                                                                       |
| dateFormat        | string                     | format of placeholder date                                                                                                                                                                                                                              |
| footer            | function => ReactComponent | change footer, footer function will recieve following object as param - `{startDate (date object), endDate (date object),today (function) - to select today's date, close (function) - closes the calendar and calls, onClose callback passed by user}` |

Followings are the variables for the date format.

- `dd` - date
- `DD` - day short
- `DDDD` - day full
- `mm` - month
- `MM` - month short
- `MMMM` - month full
- `yyyy or YYYY` - full year
- `h` - hours
- `mi` - minutes
- `a` - lowercase period (am),
- `A` - capital period (AM)

####Note:
Use onClose instead of onDateSelected, because onDateSelected gets called multiple times and onClose gets called only once when calendar is closing.
