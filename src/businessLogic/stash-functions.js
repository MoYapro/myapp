import {cloneOf} from "./data-functions";
import _ from 'lodash'

const emptyStash = {items: []};

export function findStashById(stashes, stashId) {
  console.log('stashes', stashes);
  if (!stashes) {
    return emptyStash;
  }
  let stashArray = stashes.filter(item => item.id === stashId);
  if (0 < stashArray.length) {
    return stashArray[0];
  }
  return emptyStash
}

export function monthItems(stash, year, month) {
  if (stash === null || undefined === stash || undefined === stash.items || null === stash.items || 0 === stash.items.length) {
    return [];
  }
  return selectItemsForMonth(stash.items, {year, month});
}

export function deleteItem(stashes, stashId, itemId) {
  if (!stashes) {
    stashes = [];
  }
  let newStashes = cloneOf(stashes);
  let stashToDeleteFrom = newStashes.filter(stash => stash.id === stashId);
  if (stashToDeleteFrom && 0 !== stashToDeleteFrom.length) {
    stashToDeleteFrom[0].items = stashToDeleteFrom[0].items.filter(stuff => stuff.id !== itemId);
  }
  return newStashes;
}

function getIndexForStashId(stashes, stashId) {
  for (let i = 0; i < stashes.length; i++) {
    if (stashes[i].id === stashId) {
      return i;
    }
  }
}

export function replaceStashInStashes(stashes, stashToReplaceId, stash) {
  let stashIndex = getIndexForStashId(stashes, stashToReplaceId);
  console.log(stashes);
  console.log(stashIndex);
  stashes[stashIndex] = stash;
  return stashes;
}

export function addItem(stash, item) {
  let newStash = cloneOf(stash);
  if (!newStash.items) {
    newStash.items = [];
  }
  item.id = newStash.items.length + 1;
  newStash.items.push(item);
  return newStash;
}

const mapToSum = (items, key) => ({'monthYear': key, 'value': _.sumBy(items, 'value')});

function moveToCurrentMonth(item, monthYear) {
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

function isBeforeMonthYear(item, monthYear) {
  return (item.monthYear.year <= monthYear.year
          && item.monthYear.month <= monthYear.month
          && item.repeated === true
      )
      ||
      (item.monthYear.year === monthYear.year
          && item.monthYear.month === monthYear.month);
}

function isInMonthYear(item, monthYear) {
  return item.monthYear.year === monthYear.year
      && item.monthYear.month === monthYear.month;
}

function calculateDisplayValue(monthData) {
  if (monthData === undefined || monthData.constructor !== Array || monthData[0] === undefined) {
    return '--';
  }
  else if (!monthData[0].value) {
    return '0';
  }
  return monthData[0].value;
}

const selectItemsForMonth = (stash, currentMonth) =>
    stash
    .filter(item => isBeforeMonthYear(item, currentMonth))
    // .map(item => moveToCurrentMonth(item, currentMonth))
    .sort((item1, item2) => item1.monthYear.day - item2.monthYear.day);

const monthGrouping = (item, colapsed) => {
  let postfix = colapsed ? '' : (item.value >= 0 ? '-positive' : '-negative');
  return item.monthYear.year + '-' + item.monthYear.month + (postfix)
};

function getGroupedItemsForMonth(items, currentMonthYear, colapsed = false) {
  return _(items
  .filter(item => isBeforeMonthYear(item, currentMonthYear)))
  .map(item => moveToCurrentMonth(item, currentMonthYear))
  .groupBy(item => monthGrouping(item, colapsed))
  .map(mapToSum).value();
}

function enrichWithDetails(item, currentMonthYear) {
  item.note = item.monthYear.includes('positive') ? 'Einnahmen' : 'Ausgaben';
  item.monthYear = currentMonthYear;
  item.monthYear.day = '0';
  return item;
}

const isRepeated = item => item.repeated;
const isNotRepeated = item => !item.repeated;
