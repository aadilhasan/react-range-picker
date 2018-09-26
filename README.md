React Js based date/range picker, unlike other range pickers it uses single calendar to select the range.

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

| API | Type | Description |
| ------ | -----  |------ |
onDateSelected | function | gets called each time date/time gets selected (params - startDate<Date object>, startDate<Date object>)
| onOk | function | gets called when calendar closes or ok/select button is pressed (params - startDate<Date object>, endDate<Date object>)
| enableRange  | boolean | if true, range select will be enable (default false)
| selectTime  | boolean | if true, time select will show up on date select (default false)
| rangeTillEndOfDay  | boolean | if true, then second selected date for range will have time of end of the day (11.59 PM) else it will have time of start of the day (12:00 AM) | 
| placeholder | react component | it replaces default placeholder, the component will receive following props (startDate <object>, endDate <object>, showTime <boolean>)|
| footer | react component | it replaces default placeholder, the component will receive following props (startDate <object>, startDate <object>, showTime <boolean>, onToday <function>, onOk <function>)|


#### use onOk insted of onDateSelected, because onDateSelected gets called multiple times and onOk gets called only once when calendar is closing.
