var entities = {}; // using a centralized dictionary as fields of OverflowGateEntity are private
function convert(entity) {
    if (entities[entity.id] == undefined) {
        entities[entity.id] = {lastItem: null, lastInput: null, time: 0, items: entity.items}
    }
    return entities[entity.id]
}

const router = Vars.content.getByName(ContentType.block, 'router');

const duper = extendContent(Router, "dupe", {
	
	// copy of the original method, modified to use the centralized dictionary
    removeStack(tile, item, amount){
        var entity = convert(tile.ent());
        var result = router.removeStack(tile, item, amount);
        if(result != 0 && item == entity.lastItem){
            entity.lastItem = null;
        }
        return result;
    },
	
	// copy of the original method, modified to use the centralized dictionary
    acceptItem(item, tile, source){
        var entity = convert(tile.ent());

        return tile.getTeam() == source.getTeam() && entity.lastItem === null && entity.items.total() == 0;
    },
	
	// copy of the original method, modified to use the centralized dictionary
    handleItem(item, tile, source){
        var entity = convert(tile.ent());
        entity.items.add(item, 2);
        entity.lastItem = item;
        entity.time = 0;
        entity.lastInput = source;
    },

    update(tile) {
        var entity = convert(tile.ent());
        if (entity.lastItem === null && entity.items.total() > 0) {
            entity.items.clear();
        }
        var getTargetAndFlip = (tile, item, src) => {
            var incomingDirection = tile.relativeTo(src.x, src.y);
            if (incomingDirection === -1) return null;

            var outputCandidates = [[1,3,2], [3,1,2]][tile.rotation() % 2]
               .map((dir) => tile.getNearby((incomingDirection + dir) % 4));
               
            var output = outputCandidates
                .filter((t) => t !== null)
                .filter((t) => t.block().acceptItem(item, t, tile))
                [0];
            if (output === undefined) return null;
            
            if (output === outputCandidates[0]) {
                tile.rotation((!tile.rotation())|0);
            }
            return output;
        }
		
		entity.time += 1 / router.speed * Time.delta();
		
        if(entity.lastItem !== null && entity.time >= 1){
            var target = getTargetAndFlip(tile, entity.lastItem, entity.lastInput);
            if (target === null) return;
            
            target.block().handleItem(entity.lastItem, target, tile);
            entity.items.remove(entity.lastItem, 1);
            entity.lastItem = null;
        }
    }
})
