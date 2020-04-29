const presstick=8; const timerid=0;
//var logict=[1,1,1,0];//TT TF FT FF
//abuse tables, hmm
const logict=[[1,1],[1,0],[0,1],[0,0]];
const logicg={
  "and":[1,0,0,0],
  "or":[1,1,1,0],
  "not":[0,0,1,1],
  "nor":[0,0,0,1],
  "nand":[0,1,1,1],
  "xor":[0,1,1,0],
  "arrow":[1,0,1,1]
}

const powerlogic=extendContent(MessageBlock,"powerlogic",{
    placed(tile) {
        this.super$placed(tile);
        this.setMessageBlockText(null,tile,"1 1 1 0");
    },
    logiccheck(tile,in1,in2){
      print("LG INPUTS:"+in1+","+in2);
      if(in1>0) in1=1;
      else in1=0;
      if(in2>0) in2=1;
      else in2=0;
      var tmparr=[];
      tmparr.push(in1); tmparr.push(in2);
      var input=logict.indexOf(tmparr);
      print("LG INPUT:"+input);
      var logicn=tile.ent().message.split(" ");
      if(logicn.indexOf(input)<0) return false;
      return (Number(logicn[input])==0)?false:true;
    },
    getPowerProduction(tile){
      var in1=tole.getNearby((tile.rotation()+1)%4);
      var in2=tole.getNearby((tile.rotation()+3)%4);
      if(!((in1.block() instanceof PowerNode)&&(in2.block() instanceof PowerNode))) return 0;
      try{
        return (this.logiccheck(tile,in1.ent().power.graph.getPowerBalance(),in2.ent().power.graph.getPowerBalance())) ? 0: 1;
      }
      catch(err){
        print("E:"+err);
        return 0;
      }
    }
    //TODO:table, draw
})
