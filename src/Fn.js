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

  static isInMonthYear(item, monthYear) {
    return item.monthYear.year === monthYear.year
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

  static selectItemsForMonth = (stash, currentMonth) =>
      stash
      .filter(item => Fn.isBeforeMonthYear(item, currentMonth))
      .map(item => Fn.moveToCurrentMonth(item, currentMonth))
      .sort((item1, item2) => item1.monthYear.day - item2.monthYear.day)

  static monthGrouping = (item, colapsed) => {
    let postfix = colapsed ? '' : (item.value >= 0 ? '-positive' : '-negative');
    return item.monthYear.year + '-' + item.monthYear.month + (postfix)
  };

  static getGroupedItemsForMonth(items, currentMonthYear, colapsed = false) {
    return _(items
    .filter(item => Fn.isBeforeMonthYear(item, currentMonthYear)))
    .map(item => Fn.moveToCurrentMonth(item, currentMonthYear))
    .groupBy(item => Fn.monthGrouping(item, colapsed))
    .map(Fn.mapToSum).value();
  }

  static enrichWithDetails(item, currentMonthYear) {
    item.note = item.monthYear.includes('positive') ? 'Einnahmen': 'Ausgaben';
    item.monthYear = currentMonthYear;
    item.monthYear.day ='0';
    return item;
  }

  static isRepeated = item => item.repeated;
  static isNotRepeated = item => !item.repeated;
}