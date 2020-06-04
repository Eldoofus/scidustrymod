const presstick=30; const timerid=0; const maxPulse=360;
const pulser=extendContent(PowerBlock,"pulser",{
    getPowerProduction(tile){
        return Mathf.num(tile.ent().timer.get(timerid,tile.ent().getPulse()));
    }
});
pulser.entityType=prov(() => extend(TileEntity, {
    getPulse(){
        return this.pulse;
    },
    setPulse(a){
        this.pulse = a;
    },
    pulse: 60,
}));
