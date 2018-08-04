import { addItem } from '../businessLogic/state-functions';


const startStash =
    {
      id: 1,
      name: 'Stash1',
      items: [
        {id: 1, monthYear: {year: 2018, month: 11, day: 31}, value: -5, repeated: false, note: 'old'}
      ]
    };

const testItem = {monthYear: {year: 2018, month: 11, day: 31}, value: -5, repeated: false, note: 'new'};

const expectedStash =
    {
      id: 1,
      name: 'Stash1',
      items: [
        {id: 1, monthYear: {year: 2018, month: 11, day: 31}, value: -5, repeated: false, note: 'old'},
        {id: 2, monthYear: {year: 2018, month: 11, day: 31}, value: -5, repeated: false, note: 'new'}
      ]
    };

describe('addItem', () => {
  it('knows how to add an item to a stash', () => {
    expect(addItem(startStash, testItem)).toEqual(expectedStash);
  });
});