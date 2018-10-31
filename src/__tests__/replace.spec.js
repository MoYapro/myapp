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
  it('knows how to update a stash by id', () => {
    expect(replaceStashInStashes(staticUserData.stashes, 2, newStash)[1]).toEqual(newStash);
  });
  it('knows how to ignore an unknown id', () => {
    expect(replaceStashInStashes(staticUserData.stashes, -1)).toEqual(staticUserData.stashes);
  });
});
