const presstick=30; const timerid=0;
const itemdet=extendContent(PowerBlock,"itemdet",{
    placed(tile) {
        this.super$placed(tile);
        tile.ent().timer.reset(timerid,presstick+1);
    },
    getPowerProduction(tile){
        var timecheck = tile.ent().timer.check(timerid,presstick);
        return (timecheck) ? 0: 1;
    }
})