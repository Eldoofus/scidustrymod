const powsort=extendContent(Sorter,"powsort",{
  acceptItem(item, tile, source){
    var entity=tile.ent();
    if(tile.entity.cons.valid()){
      this.super$acceptItem(item, tile, source);
      entity.cons.trigger();
    }
    else return;
  }
});
