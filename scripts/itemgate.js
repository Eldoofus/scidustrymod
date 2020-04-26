const presstick=8; const timerid=0;
const itemgate=extendContent(OverflowGate,"itemgate",{
    placed(tile) {
        this.super$placed(tile);
        tile.ent().timer.reset(timerid,presstick+1);
    },
    update(tile){
        var entity=tile.ent();
        if(tile.entity.items.total()>0) entity.timer.reset(timerid,0);
        this.super$update(tile);
    },
    getPowerProduction(tile){
      return (tile.ent().timer.check(timerid,presstick)) ? 0: 1;
    }
})