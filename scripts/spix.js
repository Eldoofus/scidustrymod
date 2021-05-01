const spix=extendContent(GenericCrafter,"spix",{
    draw(tile){
        var entity = tile.ent()
        Draw.rect(Core.atlas.find(this.name), tile.drawx(), tile.drawy());
        if(entity.cons.valid()){
            Draw.rect(Core.atlas.find(this.name+"-top"), tile.drawx(), tile.drawy());
            entity.cons.trigger();
        }
    }
})