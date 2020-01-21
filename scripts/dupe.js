const router = Vars.content.getByName(ContentType.block, 'router');

const dupe = extendContent(Router, "dupe", {
    removeStack(tile, item, amount){
        var entity = tile.ent();
        var result = router.removeStack(tile, item amount);
        if((result != 0) && (item == entity.lastItem)){
            entity.lastItem = null;
        }
        return result;
    }
})
