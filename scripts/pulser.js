const timerid=0; const maxPulse=360;
const pulser=extendContent(PowerBlock,"pulser",{
    getPowerProduction(tile){
        return (tile.ent().timer.get(timerid,tile.ent().getPulse()))?1:0;
    }
});
pulser.entityType=prov(() => extend(TileEntity, {
    _pulse:60,
    getPulse(){
        return this._pulse;
    },
    setPulse(a){
        this._pulse = a;
    }
}));
