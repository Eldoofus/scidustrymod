const switchpass=extendContent(Sorter,"switchpass",{
  update(tile){
    var invert = this.invert;
    var entity = tile.ent();
    if(tile.entity.cons.valid()){
      invert = true;
      entity.cons.trigger();
    }
    else {
      invert = false;
    }
    return;
  }
});
