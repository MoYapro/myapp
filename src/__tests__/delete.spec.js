import {deleteItem} from '../businessLogic/stash-functions';
import {staticUserData} from "./testData";

describe('wrongInputs', () => {
  it('does not remove anything if stash is not found', () => {
    expect(deleteItem(staticUserData.stashes, 4711, 999)[1].items.length).toEqual(2);
  });
  it('does not remove anything if item is not found', () => {
    expect(deleteItem(staticUserData.stashes, 2, 999)[1].items.length).toEqual(2);
  });
});
describe('delete executed', () => {
  it('removes items if ids do match', () => {
    expect(deleteItem(staticUserData.stashes, 2, 1)[1].items.length).toEqual(1);
  });
});
describe('corrupt inputs', () => {
  it('does not crash on bullshit, all empty', () => {
    expect(deleteItem()).toEqual([]);
  });
  it('does not crash on bullshit, bullshit', () => {
    expect(deleteItem(null, 1, undefined)).toEqual([]);
  });
});
