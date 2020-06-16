const presstick=1; const timerid=0;
const color1=Color.valueOf("ffaa5f"); const color2=Color.valueOf("84f491"); const color1off=Color.valueOf("cc8343");//color of pyratite and mender
//const coloroff=Color.valueOf("6974c4");
const degrees=360;
const mux=extendContent(PowerBlock,"mux",{
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
    this.drawPlaceText(tile.ent().getVal(),tile.x,tile.y,true);
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
    this.super$drawConfigure(tile);//this.super$drawConfigure(tile);
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
//   buildConfiguration(tile,table){
//     var entity=tile.ent();
//     // table.addImageButton(Icon.pencil, run(() => {
//     //   try{
//     //     if (Vars.mobile) {

//     //       // Mobile and desktop version have different dialogs
//     //       const input = new Input.TextInput();
//     //       input.text = entity.getVal();
//     //       input.multiline = false;
//     //       input.numeric = true;
//     //       input.accepted = cons(text => entity.setVal(text));

//     //       Core.input.getTextInput(input);
//     //     } else {
//     //       // Create dialog
//     //       const dialog = new FloatingDialog(Core.bundle.get("editmessage"));
//     //       dialog.setFillParent(false);

//     //       // Add text area to dialog
//     //       const textArea = new TextArea(entity.getVal());
//     //       dialog.cont.add(textArea).size(380, 160);

//     //       // Add "ok" button to dialog
//     //       dialog.buttons.addButton("$ok", run(() => {
//     //           entity.setVal(textArea.getText());
//     //           dialog.hide();
//     //       }));

//     //       // Show it
//     //       dialog.show();
//     //     }
//     //   }
//     //   catch(err){
//     //     print("err:"+err);
//     //   }
//     // })).size(40);
//     /*
//     table.addImageButton(Icon.upOpen, run(() => {
//       Vars.ui.showInfoToast(tile.ent().getVal()+1,1);
// 			tile.configure(-1);
// 		})).size(40);
// 		table.addImageButton(Icon.downOpen, run(() => {
//       Vars.ui.showInfoToast(tile.ent().getVal()-1,1);
// 			tile.configure(-3);
// 		})).size(40);
//     //table.row();
//     var myslider=table.addSlider(1,360,1,entity.getVal(),null).width(180).get();
// 		//myslider.setStyle(Styles.vSlider);
// 		//myslider.width(240);
// 		myslider.changed(run(() => {
//       tile.configure(myslider.getValue());
//       Vars.ui.showInfoToast(myslider.getValue(),0);
// 		}));
//     */
//   },
  load(){
    this.super$load();
    this.baseRegion=Core.atlas.find(this.name+"-base");
    this.topRegion=Core.atlas.find(this.name+"-top");
    this.needleRegion=Core.atlas.find(this.name+"-needle");
    this.laserRange=50;
    this.laser=Core.atlas.find("laser");
    this.laserEnd=Core.atlas.find("laser-end");
    this.t1=new Vec2(); this.t2=new Vec2();
  },
  draw(tile){
    //this.super$draw(tile);
    Draw.rect(Core.atlas.find("scidustrymod-powerlogic-base"), tile.drawx(), tile.drawy());
    Draw.rect(Core.atlas.find(this.name+"-top"), tile.drawx(), tile.drawy(),90*tile.rotation());
    //Draw.rect(Core.atlas.find(this.name+"-"+tile.ent().message), tile.drawx(), tile.drawy(),90*tile.rotation());
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
    try {
        //return tile.ent().getPow();
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
        in1=in1.ent().power.graph;
        in2=in2.ent().power.graph;
        in1=(in1.getPowerProduced()-in1.getPowerNeeded())>0;
        in2=(in2.getPowerProduced()-in2.getPowerNeeded())>0;
        if(!tile.ent().getConnected()) return 0;
        if(tile.ent().timer.getTime(timerid)<=0) return tile.ent().getLastOutput();
        tile.ent().timer.reset(timerid,0);
        var link=Vars.world.tile(tile.ent().getConf());
        if(!this.linkValid(tile, link)) return 0;
        link=link.ent().power.graph;
        if(link.getPowerProduced()-link.getPowerNeeded()>0){
            tile.ent().setLastOutput(in2);
            return in2;
        }else{
            tile.ent().setLastOutput(in1);
            return in1;
        }
    }
    catch(err){
        tile.ent().setLastOutput(0);
        return 0;
    }
  }
});

mux.entityType=prov(() => extend(TileEntity , {
  config(){
    return this._val*-1;
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
    stream.writeBoolean(this._connected);
    stream.writeInt(this._inpos);
  },
  read(stream,revision){
    this.super$read(stream,revision);
    this._val=stream.readShort();
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
  _last:0
}));
