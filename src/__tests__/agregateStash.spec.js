import {monthItems} from '../businessLogic/stash-functions';

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
        {id: 1, monthYear: {year: 2018, month: 0, day: 10}, value: -12, repeated: false, note: 'Kino'},
        {id: 2, monthYear: {year: 2018, month: 1, day: 10}, value: 11, repeated: false, note: 'Momo'},
      ]
    },
    {
      id: 3,
      name: 'Stash3',
      items: [
        {id: 1, monthYear: {year: 2018, month: 0, day: 10}, value: -12, repeated: true, note: 'Kino'},
        {id: 2, monthYear: {year: 2018, month: 1, day: 10}, value: 11, repeated: true, note: 'Momo'},
      ]
    }],
  selectedYear: 2018,
  selectedMonth: undefined,
  selectedStash: undefined,
  settings: {
    repeatedColapsed: true
  }
};

describe('broken values', () => {
  it('[] for empty', () => {
    expect(monthItems()).toEqual([]);
  });
  it('[] for broken', () => {
    expect(monthItems(undefined, null, -1)).toEqual([]);
  });
});

describe('empty results', () => {
  it('[] for past dates', () => {
    expect(monthItems(staticUserData.stashes[0], 0, 0)).toEqual([]);
  });
  it('[] for future dates and no repeat I', () => {
    expect(monthItems(staticUserData.stashes[1], 3000, 1)).toEqual([]);
  });
  it('[] for future dates and no repeat II', () => {
    expect(monthItems(staticUserData.stashes[0], 3000, 1).filter(item => !item.repeated)).toEqual([]);
  });
});

describe('displayMonth no repeat in stash', () => {
  it('first month', () => {
    expect(monthItems(staticUserData.stashes[1], 2018, 0).length).toEqual(1);
  });
  it('2nd month', () => {
    expect(monthItems(staticUserData.stashes[1], 2018, 1).length).toEqual(1);
  });
});

describe('displayMonth repeat in stash', () => {
  it('first month', () => {
    expect(monthItems(staticUserData.stashes[2], 2018, 0).length).toEqual(1);
  });
  it('2nd month', () => {
    expect(monthItems(staticUserData.stashes[2], 2018, 1).length).toEqual(2);
  });
});

describe('displayMonth repeat + no-repeat in stash', () => {
  it('first month', () => {
    expect(monthItems(staticUserData.stashes[0], 2018, 0).length).toEqual(11);
  });
  it('2nd month', () => {
    expect(monthItems(staticUserData.stashes[0], 2018, 1).length).toEqual(8);
  });
});
