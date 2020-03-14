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
    
    outputsItems(){
        return true;
    }

    draw(tile){
        super.draw(tile);

        var entity = tile.ent();
        if(entity.outputItem == null) return;

        Draw.color(entity.outputItem.color);
        Draw.rect("center", tile.worldx(), tile.worldy());
        Draw.color();
    }

    buildConfiguration(tile, table){
        var entity = tile.ent();
        ItemSelection.buildTable(table, content.items(), () -> entity.outputItem, item -> {
            lastItem = item;
            tile.configure(item == null ? -1 : item.id);
        });
    }

}
