const presstick=1; const timerid=0;
const color1=Color.valueOf("ffaa5f"); const color2=Color.valueOf("84f491");//color of pyratite and mender
//const coloroff=Color.valueOf("6974c4");
const degrees=360;
const potmeter=extendContent(PowerBlock,"potmeter",{
  placed(tile) {
    this.super$placed(tile);
  },
 /*
  logiccheck(tile,in1,in2){
    if(tile.ent().timer.getTime(timerid)<=0){
      if(gloops>loopthresh){
        Vars.ui.showInfoToast("Do not overuse!",1);
        return false;
      }
      else{
        gloops+=1;
        return tile.ent().getLastOutput();
      }
      //print("Looping:"+tile.ent().getLoops());
    }
    gloops=0;
    tile.ent().timer.reset(timerid,0);
    if(in1.getPowerProduced()-in1.getPowerNeeded()>0) in1=true;
    else in1=false;
    if(in2.getPowerProduced()-in2.getPowerNeeded()>0) in2=true;
    else in2=false;
    //print("LG INPUTS:"+in1+","+in2);
    var input=-1;
    if(in1&&in2) input=0;
    else if(in1&& (!in2)) input=1;
    else if(in2) input=2;
    else input=3;
    //var tmparr=[];
    //tmparr.push(in1); tmparr.push(in2);
    //var input=logict.indexOf(tmparr);
    //print("LG INPUT:"+input);
    //print("LG LIST:"+tmparr);
    var logicn=tile.ent().message.split("-");
    //if(logicn.indexOf(input)<0) return false;
    tile.ent().setLastOutput((Number(logicn[input])==0)?false:true);
    return (Number(logicn[input])==0)?false:true;
  },
  */
  /*
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
  configured(tile,player,value){
    //tmp
  },
  */
  drawSelect(tile){
    this.drawPlaceText(tile.ent().getVal(),tile.x,tile.y,true);
  },
  buildConfiguration(tile,table){
    var entity=tile.ent();
    table.addImageButton(Icon.pencil, run(() => {
      try{
        if (Vars.mobile) {

          // Mobile and desktop version have different dialogs
          const input = new Input.TextInput();
          input.text = entity.getVal();
          input.multiline = false;
          input.numeric = true;
          input.accepted = cons(text => entity.setVal(text));

          Core.input.getTextInput(input);
        } else {
          // Create dialog
          const dialog = new FloatingDialog(Core.bundle.get("Set Value"));
          dialog.setFillParent(false);

          // Add text area to dialog
          const textArea = new TextArea(entity.getVal());
          dialog.cont.add(textArea).size(380, 160);

          // Add "ok" button to dialog
          dialog.buttons.addButton("$ok", run(() => {
              entity.setVal(textArea.getText());
              dialog.hide();
          }));

          // Show it
          dialog.show();
        }
      }
      catch(err){
        print("err:"+err);
      }
    })).size(40);
    table.addImageButton(Icon.upOpen, run(() => {
      Vars.ui.showInfoToast(tile.ent().getVal()+1,1);
			tile.configure(-1);
		})).size(40);
		table.addImageButton(Icon.downOpen, run(() => {
      Vars.ui.showInfoToast(tile.ent().getVal()-1,1);
			tile.configure(-3);
		})).size(40);
    //table.row();
    var myslider=table.addSlider(1,360,1,entity.getVal(),null).width(180).get();
		//myslider.setStyle(Styles.vSlider);
		//myslider.width(240);
		myslider.changed(run(() => {
      tile.configure(myslider.getValue());
      Vars.ui.showInfoToast(myslider.getValue(),0);
		}));
  },
  configured(tile,player,value){
    if(value==-1) tile.ent().incVal();
    else if(value==-3) tile.ent().decVal();
    else tile.ent().setVal(value);
  },
  load(){
    this.super$load();
    this.baseRegion=Core.atlas.find(this.name+"-base");
    this.topRegion=Core.atlas.find(this.name+"-top");
    this.needleRegion=Core.atlas.find(this.name+"-needle");
  },
  /*
  drawConfigure(tile){
    var tx1=0; var ty1=0;
    if(tile.rotation()==0){
      tx1=-1; ty1=1;
    }
    else if(tile.rotation()==1){
      tx1=-1; ty1=-1;
    }
    else if(tile.rotation()==2){
      tx1=1; ty1=-1;
    }
    else if(tile.rotation()==3){
      tx1=1; ty1=1;
    }
    var in1=Vars.world.tile(tile.x+tx1,tile.y+ty1);
    //var in2=Vars.world.tile(tile.x+tx2,tile.y+ty2);
    Draw.color(color1);
    Lines.square(in1.drawx(), in1.drawy(),1 * Vars.tilesize / 2 + 1);
    //Draw.color(color2);
    //Lines.square(in2.drawx(), in2.drawy(),1 * Vars.tilesize / 2 + 1);
    this.super$drawConfigure(tile);
  },

  checkState(tile){
    var tx1=0; var ty1=0;
    if(tile.rotation()==0){
      tx1=-1; ty1=1;
    }
    else if(tile.rotation()==1){
      tx1=-1; ty1=-1;
    }
    else if(tile.rotation()==2){
      tx1=1; ty1=-1;
    }
    else if(tile.rotation()==3){
      tx1=1; ty1=1;
    }
    var in1=Vars.world.tile(tile.x+tx1,tile.y+ty1);
    //if(!(in1.ent().hasOwnProperty("power"))) return false;
    try{
      in1=in1.ent().power.graph;
      if(in1.getPowerProduced()-in1.getPowerNeeded()>0) return true;
      else return false;
    }
    catch(err){
      return false;
    }
  },
  */
  draw(tile){
    //this.super$draw(tile);
    Draw.rect(this.baseRegion, tile.drawx(), tile.drawy());
    //Draw.rect(this.topRegion, tile.drawx(), tile.drawy(),90*tile.rotation());
    Draw.rect(this.needleRegion, tile.drawx(), tile.drawy(),(540-tile.ent().getVal())%360);
    //Draw.rect(Core.atlas.find(this.name+"-"+tile.ent().message), tile.drawx(), tile.drawy(),90*tile.rotation());
  },
  update(tile){
    this.super$update(tile);
    /*
    var in1=tile.ent().power.graph;
    var currentpow=in1.getPowerProduced()-in1.getPowerNeeded();
    var setpow=tile.ent().getVal();
    if(currentpow>setpow) tile.ent().setPow(setpow-currentpow);
    else tile.ent().setPow(0);
    Vars.ui.showInfoToast("c:"+currentpow,0);
    */
  },
  getPowerProduction(tile){
    //return tile.ent().getPow();
    if(tile.ent().timer.getTime(timerid)<=0) return tile.ent().getLastOutput();
    var in1=tile.ent().power.graph;
    var currentpow=in1.getPowerProduced()-in1.getPowerNeeded()-tile.ent().getLastOutput();
    var setpow=tile.ent().getVal();
    if(currentpow>setpow){
      tile.ent().setLastOutput(setpow-currentpow);
      return setpow-currentpow;
    }
    else{
      tile.ent().setLastOutput(0);
      return 0;
    }
  }
});

potmeter.entityType=prov(() => extend(TileEntity , {
  config(){
    return this._val;
  },
  getVal(){
    return this._val;
  },
  setVal(a){
    if(isNaN(Number(a))||a<1||a>degrees) return;
    this._val=Math.floor(a);
  },
  incVal(){
    if(this._val<degrees) this._val++;
  },
  decVal(){
    if(this._val>1) this._val--;
  },
  _val:1,
  write(stream){
    this.super$write(stream);
    stream.writeShort(this._val);
  },
  read(stream,revision){
    this.super$read(stream,revision);
    this._val=stream.readShort();
  },
  getLastOutput(){
    return this._last;
  },
  setLastOutput(a){
    this._last=a;
  },
  _last:0
}));
