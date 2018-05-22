import _ from 'lodash'

export class Fn {
  static mapToSum = (items, key) => ({'monthYear': key, 'value': _.sumBy(items, 'value')});

  static moveToCurrentMonth(item, monthYear) {
    let fromThisMonth = item.monthYear.year === monthYear.year && item.monthYear.month === monthYear.month;
    return {
      id: item.id,
      monthYear: {year: monthYear.year, month: monthYear.month, day: item.monthYear.day},
      value: item.value,
      note: item.note,
      repeated: item.repeated,
      fromThisMonth: fromThisMonth
    }
  }

  static isBeforeMonthYear(item, monthYear) {
    return item.monthYear.year <= monthYear.year
        && item.monthYear.month <= monthYear.month
        && item.repeated === true
        || item.monthYear.year === monthYear.year
        && item.monthYear.month === monthYear.month;
  }

  static calculateDisplayValue(monthData) {
    if (monthData === undefined || monthData.constructor !== Array || monthData[0] === undefined) {
      return '--';
    }
    else if (!monthData[0].value) {
      return '0';
    }
    return monthData[0].value;
  }
}