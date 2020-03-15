const incin=extendContent(ItemVoid,"incin",{
  update(tile){
    var entity=tile.ent();
    if(tile.entity.cons.valid()){
      this.super$handleItem(tile, Vars.content.items(1), tile);
      entity.cons.trigger();
    }
    else return;
  }
});
