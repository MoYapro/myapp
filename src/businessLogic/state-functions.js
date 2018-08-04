import {cloneOf} from './data-functions';

export function deleteItem(stashes, stashId, itemId) {
  if(!stashes) {
    stashes = [];
  }
  let newStashes = cloneOf(stashes);
  let stashToDeleteFrom = newStashes.filter(stash => stash.id === stashId);
  if (stashToDeleteFrom && 0 !== stashToDeleteFrom.length) {
    stashToDeleteFrom[0].items = stashToDeleteFrom[0].items.filter(stuff => stuff.id !== itemId);
  }
  return newStashes;
}

export function addItem(stash, item) {
  let newStash = cloneOf(stash);
  if (!newStash.items) {
    newStash.items = [];
  }
  item.id = newStash.items.length + 1;
  newStash.items.push(item);
  return newStash;
}
