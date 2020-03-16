const dupe=extendContent(Block,"dupe",{
  var lastItem = null;
  handleItem(item, tile){
        var entity = tile.ent();
        tile.entity.items.add(item, 1);
        lastItem = item;
  }
  update(tile){
    var entity=tile.ent();
    handleItem(item, tile);
    if(lastItem == null && tile.entity.items.total() > 0){
      tile.entity.items.clear();
    }
    if(tile.entity.lastItem != null){
      tile.entity.items.add(lastItem, 1);
      tryDump();
      tile.entity.items.remove(lastItem, 1);
      lastItem = null;
    }
  }
});
