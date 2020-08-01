const presstick=3; const timerid=0;
const fastbtn = extendContent(Block, "fastbtn", {
  placed(tile) {
    this.super$placed(tile);
    tile.ent().timer.reset(timerid,presstick+1);
  },
  draw(tile) {
    Draw.rect(Core.atlas.find(this.name + ((tile.ent().timer.check(timerid,presstick)) ? "":"-trig")), tile.drawx(), tile.drawy());
  },
  tapped(tile,player){
    tile.ent().setPow(true)
    Sounds.click.at(tile.worldx(),tile.worldy());
  },
/*
  update(tile){
    if(tile.ent().timer.getTime(timerid)==presstick) Sounds.click.at(tile.worldx(),tile.worldy(),0.8);
  }
*/
  getPowerProduction(tile){
    if(tile.ent().getPow()) {
      tile.ent().setPow(false);
      return 3;
    } else return 0;
  }
});

fastbtn.entityType=prov(() => extend(TileEntity, {
  getPow(){
    return this._pow;
  },
  setPow(a){
    this._pow = a;
  },
  // getLastOutput(){
  //   return this._last;
  // },
  // setLastOutput(a){
  //   this._last=a;
  // },
  _pow: false,
  //_last:false
}));