import {staticUserData} from "./testData";
import {monthItems} from '../businessLogic/stash-functions';


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
    expect(monthItems(staticUserData.stashes[3], 3000, 1)).toEqual([]);
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
    expect(monthItems(staticUserData.stashes[1], 2018, 1).length).toEqual(2);
  });
});

describe('displayMonth repeat in stash', () => {
  it('first month', () => {
    expect(monthItems(staticUserData.stashes[0], 2018, 0).length).toEqual(11);
  });
  it('2nd month', () => {
    expect(monthItems(staticUserData.stashes[0], 2018, 1).length).toEqual(8);
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
