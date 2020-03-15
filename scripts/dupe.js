const poweredsource=extendContent(ItemSource,"poweredsource",{
  update(tile){
    var entity=tile.ent();
    if(tile.entity.cons.valid()){
      this.super$update(tile);
      entity.cons.trigger();
    }
    else return;
  }
});
