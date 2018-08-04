export function addItem(stash, item) {
  item.id = stash.items.length + 1;
  stash.items.push(item);
  return stash;
}
