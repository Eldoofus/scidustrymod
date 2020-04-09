const switchpass=extendContent(Sorter,"switchpass",{
  update(tile){
    var entity = tile.ent();
    if(tile.entity.cons.valid()){
      entity.setInvert(true);
      entity.cons.trigger();
    }
    else {
      entity.setInvert(false);
    }
    return;
  }
  
});
switchpass.entityType=prov(()=>extend(Sorter.SorterEntity,{
  setInvert(a){
    this._invert =  a;
  },
  getInvert(){
    return this._invert;
  },
  _invert: false,
}));
