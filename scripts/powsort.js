const powsort=extendContent(Sorter,"powsort",{
  acceptItem(item, tile, source){
    var entity=tile.ent();
    if(tile.entity.cons.valid()){
      return this.super$acceptItem(item, tile, source);
      tile.entity.cons.trigger();
    }
    else return false;
  }
});
