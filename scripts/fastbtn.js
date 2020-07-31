const presstick=1; const timerid=0;
const fastbtn = extendContent(Block, "fastbtn", {
  placed(tile) {
    this.super$placed(tile);
    tile.ent().timer.reset(timerid,presstick+1);
  },
  draw(tile) {
    Draw.rect(Core.atlas.find(this.name + ((tile.ent().timer.check(timerid,presstick)) ? "":"-trig")), tile.drawx(), tile.drawy());
  },
  tapped(tile,player){
    tile.ent().timer.reset(timerid,0);
    Sounds.click.at(tile.worldx(),tile.worldy());
  },
/*
  update(tile){
    if(tile.ent().timer.getTime(timerid)==presstick) Sounds.click.at(tile.worldx(),tile.worldy(),0.8);
  }
*/
  getPowerProduction(tile){
    return (tile.ent().timer.check(timerid,presstick)) ? 0: 3;
  }
});