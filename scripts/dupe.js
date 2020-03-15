const dupe=extendContent(Block,"dupe",{
  update(tile){
    var entity=tile.ent();
    if(tile.entity.lastItem == null && tile.entity.items.total() > 0){
      tile.entity.items.clear();
    }
    if(tile.entity.lastItem != null){
      tile.entity.items.add(tile.entity.lastItem, 1);
      tryDump();
      tile.entity.items.add(tile.entity.lastItem, 1);
    }
  }
});
