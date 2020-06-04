const timerid=0; const pulseid=1; const maxPulse=360;
const pulser=extendContent(PowerBlock,"pulser",{
    buildConfiguration(tile,table){
        var entity=tile.ent();
        table.addImageButton(Icon.pencil, run(() => {
          try{
            if (Vars.mobile) {
    
              // Mobile and desktop version have different dialogs
              const input = new Input.TextInput();
              input.text = entity.getPulse();
              input.multiline = false;
              input.numeric = true;
              input.accepted = cons(text => entity.setPulse(text));
    
              Core.input.getTextInput(input);
            } else {
              // Create dialog
              const dialog = new FloatingDialog(Core.bundle.get("Set Value"));
              dialog.setFillParent(false);
    
              // Add text area to dialog
              const textArea = new TextArea(entity.getPulse());
              dialog.cont.add(textArea).size(380, 160);
    
              // Add "ok" button to dialog
              dialog.buttons.addButton("$ok", run(() => {
                  entity.setPulse(textArea.getText());
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
          Vars.ui.showInfoToast(tile.ent().getPulse()+1,1);
                tile.configure(-1);
            })).size(40);
            table.addImageButton(Icon.downOpen, run(() => {
          Vars.ui.showInfoToast(tile.ent().getVal()-1,1);
                tile.configure(-3);
            })).size(40);
        table.row();
        var myslider=table.addSlider(1,360,1,entity.getPulse(),null).width(180).get();
            myslider.setStyle(Styles.vSlider);
            myslider.width(240);
            myslider.changed(run(() => {
          tile.configure(myslider.getValue());
          Vars.ui.showInfoToast(myslider.getValue(),0);
            }));
        
    },
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
