const switchpass=extendContent(Sorter,"switchpass",{
  // update(tile){
  //   var invert = this.invert;
  //   var entity = tile.ent();
  //   if(tile.entity.cons.valid()){
  //     invert = true;
  //     entity.cons.trigger();
  //   }
  //   else {
  //     invert = false;
  //   }
  //   return;
  // }
  getTileTarget(item, dest, source, flip){
    if(tile.entity.cons.valid()){
      entity.cons.trigger();
      return this.super$getTileTarget(item, dest, source, !(flip));
    }
    else {
      return this.super$getTileTarget(item, dest, source, flip);
    }
    
  }
});
