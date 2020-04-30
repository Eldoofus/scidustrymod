const presstick=1; const timerid=0; const loopthresh=150;
var gloops=0;
//var logict=[1,1,1,0];//TT TF FT FF
//abuse tables, hmm
const logict=[[1,1],[1,0],[0,1],[0,0]];
const logicg=["1-1-1-1","1-1-1-0","1-1-0-1","1-0-1-1","0-1-1-1","1-1-0-0","1-0-1-0","1-0-0-1","0-1-1-0","0-1-0-1","0-0-1-1","0-0-0-1","0-0-1-0","0-1-0-0","1-0-0-0","0-0-0-0"];

const powerlogic=extendContent(MessageBlock,"powerlogic",{
    placed(tile) {
        this.super$placed(tile);
        this.setMessageBlockText(null,tile,"1-1-1-0");
        tile.ent().timer.reset(timerid,presstick+1);
    },
/*
    buildConfiguration(tile, table){
    this.super$buildConfiguration(tile,table);
		table.addImageButton(Icon.commandRally, run(() => {

		})).size(40);
    table.addImageButton(Icon.line, run(() => {

		})).size(40);
	},
*/
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
      tile.setLastOutput((Number(logicn[input])==0)?false:true);
      return (Number(logicn[input])==0)?false:true;
    },
    getPowerProduction(tile){
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
      if(!((in1.block() instanceof PowerNode)&&(in2.block() instanceof PowerNode))) return 0;
      if(in1.ent().power.graph.getID()==tile.ent().power.graph.getID()||in2.ent().power.graph.getID()==tile.ent().power.graph.getID()){
        Vars.ui.showInfoToast("Do not connect output with input!",1);
        return 0;
      }
      //Vars.ui.showInfoToast(this.logiccheck(tile,in1.ent().power.graph.getPowerBalance(),in2.ent().power.graph.getPowerBalance()),1);
      return (this.logiccheck(tile,in1.ent().power.graph,in2.ent().power.graph)) ? 1: 0;
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
      Draw.color(Pal.place);
      Lines.square(in1.drawx(), in1.drawy(),1 * Vars.tilesize / 2 + 1);
      Lines.square(in2.drawx(), in2.drawy(),1 * Vars.tilesize / 2 + 1);
      this.super$drawConfigure(tile);
    },
    draw(tile){
      //this.super$draw(tile);
      Draw.rect(Core.atlas.find(this.name+"-base"), tile.drawx(), tile.drawy());
      Draw.rect(Core.atlas.find(this.name+"-"+tile.ent().message), tile.drawx(), tile.drawy());
    }
    //TODO:table, draw
});

powerlogic.entityType=prov(()=>extendContent(MessageBlock.MessageBlockEntity,powerlogic,{
  config(){
    return this.message;
  },
  getLastOutput(){
    return this._last;
  },
  setLastOutput(a){
    this.last=a;
  },
  _last:false
}));
