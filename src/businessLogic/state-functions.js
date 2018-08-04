import {stashOf} from 'data-functions';

export function addItem(stash, item) {
  let newStash = stashOf(stash);
  item.id = newStash.items.length + 1;
  newStash.items.push(item);
  return newStash;
}
