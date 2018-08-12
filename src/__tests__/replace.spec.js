import {staticUserData} from "./testData";
import {replaceStashInStashes} from "../businessLogic/stash-functions"

const newStash = {
  id: 2,
  name: 'Stash2',
  items: [
    {id: 4, monthYear: {year: 2018, month: 0, day: 10}, value: -12, repeated: true, note: 'Wat'},
    {id: 5, monthYear: {year: 2018, month: 1, day: 10}, value: 11, repeated: true, note: 'Wie'},
  ]
};


describe('update a stash in stashes', () => {
  it('knows how to find a stash by id I', () => {
    expect(replaceStashInStashes(staticUserData.stashes, 2, newStash)).toEqual(staticUserData.stashes[1]);
  });
  it('knows how to find a stash by id II', () => {
    expect(findStashById(staticUserData.stashes, 2)).toEqual(staticUserData.stashes[1]);
  });
});
