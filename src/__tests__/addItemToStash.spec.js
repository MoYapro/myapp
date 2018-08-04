import {addItem} from '../businessLogic/state-functions';

const startStash =
    {
      id: 1,
      name: 'Stash1',
      items: [
        {id: 1, monthYear: {year: 2018, month: 11, day: 31}, value: -5, repeated: false, note: 'old'}
      ]
    };

const emptyStash =
    {
      id: 1,
      name: 'Stash1'
    };

const testItem1 = {monthYear: {year: 2018, month: 11, day: 1}, value: -5, repeated: false, note: 'new'};
const testItem2 = {monthYear: {year: 2018, month: 11, day: 2}, value: -5, repeated: false, note: 'new'};
const testItem3 = {monthYear: {year: 2018, month: 11, day: 3}, value: -5, repeated: false, note: 'new'};

const expectedStash =
    {
      id: 1,
      name: 'Stash1',
      items: [
        {id: 1, monthYear: {year: 2018, month: 11, day: 31}, value: -5, repeated: false, note: 'old'},
        {id: 2, monthYear: {year: 2018, month: 11, day: 1}, value: -5, repeated: false, note: 'new'}
      ]
    };

const expectedStashAddMultiple =
    {
      id: 1,
      name: 'Stash1',
      items: [
        {id: 1, monthYear: {year: 2018, month: 11, day: 31}, value: -5, repeated: false, note: 'old'},
        {id: 2, monthYear: {year: 2018, month: 11, day: 1}, value: -5, repeated: false, note: 'new'},
        {id: 3, monthYear: {year: 2018, month: 11, day: 2}, value: -5, repeated: false, note: 'new'},
        {id: 4, monthYear: {year: 2018, month: 11, day: 3}, value: -5, repeated: false, note: 'new'}
      ]
    };


const emptyStashAfter =
    {
      id: 2,
      name: 'empty',
      items: [
        {id: 1, monthYear: {year: 2018, month: 11, day: 31}, value: -5, repeated: false, note: 'new'},
      ]
    };

describe('addItem', () => {
  it('knows how to add an item to a stash', () => {
    expect(addItem(startStash, testItem1)).toEqual(expectedStash);
  });
});

let addMultiple = () => {
  let stash = startStash;
  stash = addItem(stash, testItem1);
  stash = addItem(stash, testItem2);
  stash = addItem(stash, testItem3);
  return stash;
};

describe('addItems', () => {
  it('knows how to add multiple items to a stash', () => {
    expect(addMultiple()).toEqual(expectedStashAddMultiple);
  });
});

describe('addItemsToEmpty', () => {
  it('knows how to add an item to an empty stash', () => {
    expect(addItem(emptyStash, startStash.items[0])).toEqual(startStash);
  });
});