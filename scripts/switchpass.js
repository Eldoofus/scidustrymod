const switchpass=extendContent(Sorter,"switchpass",{
  customInvert(tile){
    var entity = tile.ent();
    if(tile.entity.cons.valid()){
      entity.cons.trigger();
      return false;
    }
    else {
      return true;
    }
  },
  update(tile){
    var entity = tile.ent();
    this.super$update(tile);
    entity.invert = this.customInvert(tile);
    return;
  }
});
