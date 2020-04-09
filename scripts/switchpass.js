const switchpass=extendContent(Sorter,"switchpass",{
  customInvert(tile){
    var entity = tile.ent();
    if(tile.entity.cons.valid()){
      entity.cons.trigger();
      return entity.setInvert(false);
    }
    else {
      return entity.setInvert(true);
    }
  },
  update(tile){
    var entity = tile.ent();
    this.super$update(tile);
    this.invert = entity.getInvert();
    return;
  }
  
});
switchpass.entityType=prov(()=>extend(Sorter.SorterEntity,{
  setInvert(a){
    this._invert=a;
  },
  getInvert(){
    return this._invert;
  },
  _invert=false,
}));
