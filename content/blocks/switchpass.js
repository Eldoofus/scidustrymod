const switchpass=extendContent(Sorter,"switchpass",{
  update(tile){
    var entity=tile.ent();
    if(tile.entity.cons.valid()){
      this.invert = true;
      entity.cons.trigger();
    }
    else this.invert = false;
  }
});
