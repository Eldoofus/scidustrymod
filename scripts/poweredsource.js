const poweredsource = extendContent(itemSource, “poweredsource”, {
    update(tile){
        var entity = tile.ent()
        if(entity.outputItem == null) {return}
        if(tile.entity.cons.valid()){
            entity.items.set(entity.outputItem, 1)
            tryDump(tile, entity.outputItem)
            entity.items.set(entity.outputItem, 0)
        }
    }
}
