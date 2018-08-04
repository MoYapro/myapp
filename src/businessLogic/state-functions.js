import {cloneOf} from './data-functions';

export function addItem(stash, item) {
  let newStash = cloneOf(stash);
  if (!newStash.items) {
    newStash.items = [];
  }
  item.id = newStash.items.length + 1;
  newStash.items.push(item);
  return newStash;
}
