import {staticUserData} from "./testData";
import {findStashById} from "../businessLogic/stash-functions"

const emptyStash = {items: []};

describe('find an existing stash', () => {
  it('knows how to find a stash by id I', () => {
    expect(findStashById(staticUserData.stashes, 1)).toEqual(staticUserData.stashes[0]);
  });
  it('knows how to find a stash by id II', () => {
    expect(findStashById(staticUserData.stashes, 2)).toEqual(staticUserData.stashes[1]);
  });
});

describe('find an non existing stash', () => {
  it('if no stash is found an (new) empty stash with no id is returned I', () => {
    expect(findStashById(staticUserData.stashes, 99)).toEqual(emptyStash);
  });
  it('if no stash is found an (new) empty stash with no id is returned II', () => {
    expect(findStashById(staticUserData.stashes, -1)).toEqual(emptyStash);
  });
});

  describe('find emptyStash in empty stashes', () => {
  it('get empty stash from []', () => {
    expect(findStashById([], 99)).toEqual(emptyStash);
  });
  it('if no stash is found an (new) empty stash with no id is returned II', () => {
    expect(findStashById(undefined, -1)).toEqual(emptyStash);
  });
});
