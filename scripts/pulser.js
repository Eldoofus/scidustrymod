const presstick=30; const timerid=0; const maxPulse=360;
const pulser=extendContent(PowerBlock,"pulser",{
    placed(tile) {
        this.super$placed(tile);
        tile.ent().timer.reset(timerid,presstick+1);
    },
    getPowerProduction(tile){
        return Mathf.num(tile.ent().timer.get(timerid,this.pulse));
    }
});
pulser.entityType=prov(() => extend(TileEntity, {
    pulse: 60,
}));