const presstick=1; const timerid=0;
const color1=Color.valueOf("84f491"); const color1off=Color.valueOf("45854c");//color of pyratite and mender
//const coloroff=Color.valueOf("6974c4");
const flipflopt=extendContent(PowerBlock,"flipflopt",{
  placed(tile) {
    this.super$placed(tile);
  },
  overlaps(src, other, range){
    return Intersector.overlaps(Tmp.cr1.set(src.drawx(), src.drawy(), range), other.getHitbox(Tmp.r1));
  },
  linkValid(tile, link){
    if(tile == link || link == null || link.ent() == null || tile.ent() == null || !link.block().hasPower || tile.getTeam() != link.getTeam()) return false;

    if(this.overlaps(tile, link, this.laserRange * Vars.tilesize) || (link.block() instanceof PowerNode && this.overlaps(link, tile, link.cblock().laserRange * Vars.tilesize))){
      return true;
    }
    return false;
  },
  drawSelect(tile){
    //
  },
  configured(tile, player, value){
    if(value<0){
      tile.ent().setVal(value*-1);
      return;
    }
    var other=Vars.world.tile(value);
    if(tile==other) tile.ent().setConnected(false);
    else if(tile.ent().getConf()==other.pos()&&tile.ent().getConnected()) tile.ent().setConnected(false);
    else if(this.linkValid(tile,other)&&other.block()!=tile.block()){
      tile.ent().setConf(value,tile);
      tile.ent().setConnected(true);
    }
  },
  onConfigureTileTapped(tile,other){
    if(tile==other){
      tile.configure(other.pos());
      return false;
    }
    else if(this.linkValid(tile,other)){
      if(other.pos()<0) return true;
      tile.configure(other.pos());
      return false;
    }
    else return true;
  },
  drawConfigure(tile){
    //this.super$drawConfigure(tile);
    Draw.color(Pal.accent);

    Lines.stroke(1.5);
    Lines.circle(tile.drawx(), tile.drawy(), tile.block().size * Vars.tilesize / 2 + 1 + Mathf.absin(Time.time(), 4, 1));
    //Draw.color(color1);
    Drawf.circles(tile.drawx(), tile.drawy(), this.laserRange * Vars.tilesize);

    Lines.stroke(1.5);
    if(tile.ent().getConnected()){
      var other=Vars.world.tile(tile.ent().getConf());
      if(!(other==null)){
        Drawf.square(other.drawx(), other.drawy(), other.block().size * Vars.tilesize / 2 + 1,color1);
      }
    }
    //Draw.color(color1);
    //Lines.square(other.drawx(), other.drawy(),other.block().size * Vars.tilesize / 2 + 1);
    //Draw.color();

    Draw.reset();
  },
  drawLaser(tile,target){
    var opacityPercentage = Core.settings.getInt("lasersopacity");
    if(opacityPercentage == 0) return;
    var opacity = opacityPercentage / 100;

    var x1 = tile.drawx(); var y1 = tile.drawy();
    var x2 = target.drawx(); var y2 = target.drawy();

    var angle1 = Angles.angle(x1, y1, x2, y2);
    this.t1.trns(angle1, tile.block().size * Vars.tilesize / 2 - 1.5);
    this.t2.trns(angle1 + 180, target.block().size * Vars.tilesize / 2 - 1.5);

    x1 += this.t1.x;
    y1 += this.t1.y;
    x2 += this.t2.x;
    y2 += this.t2.y;

    var fract = 1 - target.ent().power.graph.getSatisfaction();
    var nowtick=tile.ent().timer.getTime(timerid);
    Draw.color(color1, color1off, fract * 0.86 + Mathf.absin(3, 0.1));
    Draw.alpha(opacity);
    Drawf.laser(this.laser, this.laserEnd, x1, y1, x2, y2, 0.25);
    Draw.color();
  },
  drawLayer(tile){
    if(Core.settings.getInt("lasersopacity") == 0) return;
    if(!tile.ent().getConnected()) return;
    var link=Vars.world.tile(tile.ent().getConf());
    if(this.linkValid(tile, link)){
      this.drawLaser(tile, link);
      Draw.reset();
    }
  },
  buildConfiguration(tile,table){
    //hm
  },
  load(){
    this.super$load();
    this.laserRange=50;
    this.laser=Core.atlas.find("laser");
    this.laserEnd=Core.atlas.find("laser-end");
    this.t1=new Vec2(); this.t2=new Vec2();
  },
  update(tile){
    this.super$update(tile);
    if(!tile.ent().getConnected()) return;
    var link=Vars.world.tile(tile.ent().getConf());
    if(link==null||(!this.linkValid(tile,link))){
      tile.ent().setConnected(false);
      return;
    }
    if(link.ent().power.graph.getID()==tile.ent().power.graph.getID()){
      Vars.ui.showInfoToast("Do not connect output with input!",1);
      tile.ent().setConnected(false);
    }
  },
  getPowerProduction(tile){
    //return tile.ent().getPow();
    if(!tile.ent().getConnected()) return 0;
    if(tile.ent().timer.getTime(timerid)<=0) return Mathf.num(tile.ent().getLastOutput());
    tile.ent().timer.reset(timerid,0);
    var link=Vars.world.tile(tile.ent().getConf());
    if(!this.linkValid(tile, link)) return 0;
    link=link.ent().power.graph;
    if(link.getPowerProduced()-link.getPowerNeeded()>0){
      tile.ent().flipVal();
      tile.ent().setLastOutput(tile.ent().getVal());
      return Mathf.num(tile.ent().getVal());
    }
    else{
      tile.ent().setTrig(false);
      tile.ent().setLastOutput(tile.ent().getVal());
      return Mathf.num(tile.ent().getVal());
    }
  }
});

flipflopt.entityType=prov(() => extend(TileEntity , {
  getVal(){
    return this._val;
  },
  setVal(a){
    this._val=a;
  },
  flipVal(){
    if(this._trig) return false;
    this._val=!this._val;
    this._trig=true;
    return true;
  },
  setTrig(a){
    if(!this._trig) return;
    this._trig=a;
  },
  _val:false,
  _trig:false,
  write(stream){
    this.super$write(stream);
    stream.writeBoolean(this._val);
    stream.writeBoolean(this._trig);
    stream.writeBoolean(this._connected);
    stream.writeInt(this._inpos);
  },
  read(stream,revision){
    this.super$read(stream,revision);
    this._val=stream.readBoolean();
    this._trig=stream.readBoolean();
    this._connected=stream.readBoolean();
    this._inpos=stream.readInt();
  },
  _inpos:0,
  _connected:false,
  getConf(){
    return this._inpos;
  },
  getConnected(){
    return this._connected;
  },
  setConf(a,tile){
    this._inpos=a;
  },
  setConnected(a){
    this._connected=a;
  },
  getLastOutput(){
    return this._last;
  },
  setLastOutput(a){
    this._last=a;
  },
  _last:false
}));
