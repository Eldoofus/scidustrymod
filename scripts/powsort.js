const powsort=extendContent(Sorter,"powsort",{
  acceptItem(item, tile, source){
    var entity=tile.ent();
    if(tile.entity.cons.valid()){
      tile.entity.cons.trigger();
      return this.super$acceptItem(item, tile, source);
    }
    else return false;
  }
});
