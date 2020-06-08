const presstick=1; const timerid=0; const loopthresh=150;
var gloops=500;//crash it if you can idk
const color1=Color.valueOf("ffaa5f"); const color2=Color.valueOf("84f491");//color of pyratite and mender
const ts=40;//table size

const dlatch=extendContent(PowerBlock,"dlatch",{
    placed(tile) {
        this.super$placed(tile);
        tile.ent().timer.reset(timerid,presstick+1);
    },
    drawSelect(tile){
      //kill the words
    },
    updateTableAlign(tile,table){
      var pos = Core.input.mouseScreen(tile.drawx(), tile.drawy() - Vars.tilesize - tile.block().size * Vars.tilesize / 2 - 1);
      table.setPosition(pos.x, pos.y, Align.top);
    },
    logiccheck(tile,in3,in2){
      if(tile.ent().timer.getTime(timerid)<=0){
        return (tile.ent().getLastOutput())?1:0;
      }
      tile.ent().timer.reset(timerid,0);
      if(in3.getPowerProduced()-in3.getPowerNeeded()>0) in3=true;
      else in3=false;
      var in1=false;
      if(in2.getPowerProduced()-in2.getPowerNeeded()>0) {in2=in3;in1=false;}
      else {in2=false;in1=in3;}
      var input=-1;
      if(in1&&in2) input=0;//toggle
      else if(in1&& (!in2)) input=1;//set 0
      else if(in2) input=2;//set 1
      else input=3;//do nothing
      if(input!=0) tile.ent().setTrig(false);
      if(input==0) tile.ent().flipVal();
      if(input==1) tile.ent().setVal(false);
      if(input==2) tile.ent().setVal(true);
      tile.ent().setLastOutput(tile.ent().getVal());
      return (tile.ent().getVal())?1:0;
    },
    getPowerProduction(tile){
      //if(tile.ent().message=="") this.setMessageBlockText(null,tile,"1-1-1-0");
      var tx1=0; var ty1=0; var tx2=0; var ty2=0;
      if(tile.rotation()==0){
        tx1=-1; ty1=1;
        tx2=-1; ty2=-1;
      }
      else if(tile.rotation()==1){
        tx1=-1; ty1=-1;
        tx2=1; ty2=-1;
      }
      else if(tile.rotation()==2){
        tx1=1; ty1=-1;
        tx2=1; ty2=1;
      }
      else if(tile.rotation()==3){
        tx1=1; ty1=1;
        tx2=-1; ty2=1;
      }
      var in1=Vars.world.tile(tile.x+tx1,tile.y+ty1);
      var in2=Vars.world.tile(tile.x+tx2,tile.y+ty2);
      //var in1=tile.getNearby((tile.rotation()+1)%4);
      //var in2=tile.getNearby((tile.rotation()+3)%4);
      //if(!((in1.ent().hasOwnProperty("power"))&&(in2.ent().hasOwnProperty("power")))) return 0;
      try{
        if(in1.ent().power.graph.getID()==tile.ent().power.graph.getID()||in2.ent().power.graph.getID()==tile.ent().power.graph.getID()){
          Vars.ui.showInfoToast("Do not connect output with input!",1);
          return 0;
        }
        //Vars.ui.showInfoToast(this.logiccheck(tile,in1.ent().power.graph.getPowerBalance(),in2.ent().power.graph.getPowerBalance()),1);
        return (this.logiccheck(tile,in1.ent().power.graph,in2.ent().power.graph)) ? 1: 0;
      }
      catch(err){
        return 0;
      }
    },
    drawConfigure(tile){
      var tx1=0; var ty1=0; var tx2=0; var ty2=0;
      if(tile.rotation()==0){
        tx1=-1; ty1=1;
        tx2=-1; ty2=-1;
      }
      else if(tile.rotation()==1){
        tx1=-1; ty1=-1;
        tx2=1; ty2=-1;
      }
      else if(tile.rotation()==2){
        tx1=1; ty1=-1;
        tx2=1; ty2=1;
      }
      else if(tile.rotation()==3){
        tx1=1; ty1=1;
        tx2=-1; ty2=1;
      }
      var in1=Vars.world.tile(tile.x+tx1,tile.y+ty1);
      var in2=Vars.world.tile(tile.x+tx2,tile.y+ty2);
      Draw.color(color1);
      Lines.square(in1.drawx(), in1.drawy(),1 * Vars.tilesize / 2 + 1);
      Draw.color(color2);
      Lines.square(in2.drawx(), in2.drawy(),1 * Vars.tilesize / 2 + 1);
      this.super$drawConfigure(tile);
    },
    draw(tile){
      //this.super$draw(tile);
      Draw.rect(Core.atlas.find("scidustrymod-powerlogic-base"), tile.drawx(), tile.drawy());
      Draw.rect(Core.atlas.find(this.name+"-top"), tile.drawx(), tile.drawy(),90*tile.rotation());
      //Draw.rect(Core.atlas.find(this.name+"-"+tile.ent().message), tile.drawx(), tile.drawy(),90*tile.rotation());
    }
});

dlatch.entityType=prov(() => extend(TileEntity , {
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
    //stream.writeBoolean(this._connected);
    //stream.writeInt(this._inpos);
  },
  read(stream,revision){
    this.super$read(stream,revision);
    this._val=stream.readBoolean();
    this._trig=stream.readBoolean();
    //this._connected=stream.readBoolean();
    //this._inpos=stream.readInt();
  },
  getLastOutput(){
    return this._last;
  },
  setLastOutput(a){
    this._last=a;
  },
  _last:false
}));
