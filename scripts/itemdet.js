const presstick=8; const timerid=0;
const itemdet=extendContent(Sorter,"itemdet",{
    placed(tile) {
        this.super$placed(tile);
        tile.ent().timer.reset(timerid,presstick+1);
    },
    acceptItem(item, tile, source){
        var entity=tile.ent();
        if(this.super$acceptItem(item, tile, source) && (item.id == tile.entity.config())) entity.timer.reset(timerid,0);
        return this.super$acceptItem(item, tile, source);
    },
    getPowerProduction(tile){
      return (tile.ent().timer.check(timerid,presstick)) ? 0: 1;
    }
})