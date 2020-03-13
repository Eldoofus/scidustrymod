const psource = extendContent(itemSource, “poweredsource”, {
    update(tile){
        ItemSourceEntity entity = tile.ent()
        if(entity.outputItem == null) return
        if(tile.entity.cons.valid()){
            entity.items.set(entity.outputItem, 1)
            tryDump(tile, entity.outputItem)
            entity.items.set(entity.outputItem, 0)
        }
    }
}
