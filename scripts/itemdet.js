const itemdet=extendContent(Sorter,"itemdet",{
    acceptItem(item,tile,source){
        if(this.super$acceptItem(item,tile,source)){
          tile.entity.setProp(true);
        }
        return this.super$acceptItem(item,tile,source);
    },
    getPowerProduction(tile){
        // if(tile.entity.getProp()){
        //     tile.entity.setProp(false);
        return 60;
        // } else {
        //     return 0;
        // }
    },
    setBars(){
        this.super$setBars();
        this.bars.add("poweroutput",func(entity=>new Bar(prov(()=>Core.bundle.format("bar.poweroutput",entity.block.getPowerProduction(entity.tile)*60*entity.timeScale)),prov(()=>Pal.powerBar),floatp(()=>entity.tile.entity!=null?entity.block.getPowerProduction(entity.tile):0))));
    }
  });  
itemdet.entityType=prov(()=>extendContent(Sorter.SorterEntity,itemdet,{
    getProp(){
        return this._prop;
    },
    setProp(a){
        this._prop=a;
    },
    _prop:false,
}))