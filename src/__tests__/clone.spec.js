import {cloneOf} from '../businessLogic/data-functions';

const startStash =
    {
      id: 1,
      name: 'Stash1',
      items: [
        {id: 1, monthYear: {year: 2018, month: 11, day: 31}, value: -5, repeated: false, note: 'old'}
      ]
    };


const staticUserData = {
  stashes: [{
    id: 1,
    name: 'Stash1',
    items: [
      {id: 1, monthYear: {year: 2018, month: 0, day: 10}, value: -12, repeated: false, note: 'Kino'},
      {id: 2, monthYear: {year: 2018, month: 0, day: 1}, value: 1200, repeated: true, note: 'Gehalt Tom'},
      {id: 3, monthYear: {year: 2018, month: 0, day: 2}, value: 600, repeated: true, note: 'Gehalt Anne'},
      {id: 4, monthYear: {year: 2018, month: 0, day: 19}, value: 200, repeated: true, note: 'Kindergeld'},
      {id: 5, monthYear: {year: 2018, month: 0, day: 4}, value: -600, repeated: true, note: 'Miete'},
      {id: 6, monthYear: {year: 2018, month: 0, day: 6}, value: -300, repeated: true, note: 'Strom/Gas'},
      {id: 7, monthYear: {year: 2018, month: 0, day: 1}, value: -320, repeated: true, note: 'Wocheneinkauf'},
      {id: 8, monthYear: {year: 2018, month: 0, day: 2}, value: -32, repeated: true, note: 'Handy'},
      {id: 9, monthYear: {year: 2018, month: 0, day: 20}, value: -50, repeated: false, note: 'Kino'},
      {id: 10, monthYear: {year: 2018, month: 0, day: 23}, value: -88, repeated: false, note: 'Urlaub'},
      {id: 11, monthYear: {year: 2018, month: 0, day: 21}, value: -200, repeated: false, note: 'Tierarzt'},
      {id: 12, monthYear: {year: 2018, month: 1, day: 16}, value: -33, repeated: false, note: 'Urlaub'},
      {id: 13, monthYear: {year: 2018, month: 2, day: 10}, value: -50, repeated: false, note: 'Klamotten'},
      {id: 14, monthYear: {year: 2018, month: 2, day: 7}, value: 100, repeated: false, note: 'Reiten'},
      {id: 15, monthYear: {year: 2018, month: 3, day: 13}, value: -65, repeated: false, note: 'Ausflug'},
      {id: 16, monthYear: {year: 2018, month: 4, day: 1}, value: 0, repeated: false, note: ''},
      {id: 17, monthYear: {year: 2018, month: 5, day: 3}, value: -5, repeated: false, note: 'Spielzeug'},
      {id: 18, monthYear: {year: 2018, month: 6, day: 7}, value: -5, repeated: false, note: 'Eis'},
      {id: 19, monthYear: {year: 2018, month: 8, day: 25}, value: -5, repeated: false, note: ''},
      {id: 20, monthYear: {year: 2018, month: 9, day: 19}, value: -5, repeated: false, note: '4711'},
      {id: 21, monthYear: {year: 2018, month: 10, day: 30}, value: -5, repeated: false, note: 'Hier haben wir einfach mal so Geld zum Heizen gebraucht'},
      {id: 22, monthYear: {year: 2018, month: 11, day: 31}, value: -5, repeated: false, note: 'Bananen'},
    ]
  },
    {
      id: 2,
      name: 'Stash2',
      items: [
        {id: 1, monthYear: {year: 2018, month: 0, day: 10}, value: -12, repeated: true, note: 'Kino'},
        {id: 2, monthYear: {year: 2018, month: 1, day: 10}, value: 11, repeated: true, note: 'Kino'},
      ]
    }],
  selectedYear: 2018,
  selectedMonth: undefined,
  selectedStash: undefined,
  settings: {
    repeatedColapsed: true
  }
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

describe('clone user state', () => {
  it('knows how to clone a complete user state', () => {
    expect(cloneOf(staticUserData)).toEqual(staticUserData);
  });
});

describe('clone stash checked', () => {
  it('knows how to clone a complete user state and it really is a clone', () => {
    function cloneAndModifyOriginal() {
      const clone = cloneOf(staticUserData);
      clone.id = 'you failed';
      return clone;
    }
    expect(cloneAndModifyOriginal()).not.toEqual(staticUserData);
  });
});
