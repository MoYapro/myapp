import {cloneOf} from '../businessLogic/data-functions';

const startStash =
    {
      id: 1,
      name: 'Stash1',
      items: [
        {id: 1, monthYear: {year: 2018, month: 11, day: 31}, value: -5, repeated: false, note: 'old'}
      ]
    };

describe('clone stash', () => {
  it('knows how to clone a stash', () => {
    expect(cloneOf(startStash)).toEqual(startStash);
  });
});

describe('clone stash checked', () => {
  it('knows how to clone a stash and it really is a clone', () => {
    function cloneAndModifyOriginal() {
      const clone = cloneOf(startStash);
      clone.id = 'you failed';
      return clone;
    }
    expect(cloneAndModifyOriginal()).not.toEqual(startStash);
  });
});
