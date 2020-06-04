const timerid=0; const pulseid=1; const maxPulse=360;
const pulser=extendContent(PowerBlock,"pulser",{
  getPowerProduction(tile){
    if(tile.ent().timer.getTime(timerid)<=0) return (tile.ent().getLastOutput())?1:0;
    tile.ent().timer.reset(timerid,0);
    var res=tile.ent().timer.get(pulseid,tile.ent().getPulse());
    tile.ent().setLastOutput(res);
    return (res)?1:0;
  }
});

pulser.entityType=prov(() => extend(TileEntity, {
  _pulse:60,
  getPulse(){
    return this._pulse;
  },
  setPulse(a){
    this._pulse = a;
  },
  write(stream){
    this.super$write(stream);
    stream.writeShort(this._pulse);
  },
  read(stream,revision){
    this.super$read(stream,revision);
    this._pulse=stream.readShort();
  },
  getLastOutput(){
    return this._last;
  },
  setLastOutput(a){
    this._last=a;
  },
  _last:false
}));
