const unimask=extendContent(ItemSource,"unimask",{
    update(tile){
        var entity=tile.ent();
        if(tile.entity.cons.valid()){
            if((tile.entity.outputItem == null) || (tile.entity.items.total() == 0)) return;
            tile.entity.items.add(entity.outputItem, 1);
            dump(tile.entity.outputItem);
            tile.entity.items.clear();
          entity.cons.trigger();
        }
        else return;
    },
    acceptItem(item, tile, source){
        if(tile.entity.cons.valid()) return true;
        return false;
    }
});
// const unimask=extendContent(Sorter,"unimask",{
//     getTT(item, dest, source, flip){
//         item = Vars.content.item(15);
//         var entity = dest.ent();
//         var dir = source.relativeTo(dest.x, dest.y);
//         if(dir == -1) return null;
//         var a = dest.getNearby(Mathf.mod(dir - 1, 4));
//         var b = dest.getNearby(Mathf.mod(dir, 4));
//         var c = dest.getNearby(Mathf.mod(dir + 1, 4));
//         var ac = a != null && !(a.block().instantTransfer && source.block().instantTransfer) && a.block().acceptItem(item, a, dest);
//         var bc = b != null && !(b.block().instantTransfer && source.block().instantTransfer) && b.block().acceptItem(item, b, dest);
//         var cc = c != null && !(c.block().instantTransfer && source.block().instantTransfer) && c.block().acceptItem(item, c, dest);
//         if(ac && !bc && !cc){
//             to = a;
//         } else if(bc && !ac && !cc){
//             to = b;
//         } else if(cc && !ac && !bc){
//             to = c;
//         } else if(ac && bc && !cc){
//             if(dest.rotation() == 0){
//                 to = a;
//                 if(flip)dest.rotation(1);
//             } else if(dest.rotation == 1){
//                 to = b;
//                 if(flip)dest.rotation(2);
//             } else {
//                 if(flip)dest.rotation(0);
//                 return null;
//             }
//         } else if(ac && !bc && cc){
//             if(dest.rotation() == 0){
//                 to = a;
//                 if(flip)dest.rotation(1);
//             } else if(dest.rotation == 1){
//                 if(flip)dest.rotation(2);
//                 return null;
//             } else {
//                 to = c;
//                 if(flip)dest.rotation(0);
//             }
//         } else if(!ac && bc && cc){
//             if(dest.rotation() == 0){
//                 if(flip)dest.rotation(1);
//                 return null;
//             } else if(dest.rotation == 1){
//                 to = b;
//                 if(flip)dest.rotation(2);
//             } else {
//                 to = c;
//                 if(flip)dest.rotation(0);
//             }
//         } else if(!ac && !bc && !cc){
//             return null;
//         } else if(ac && bc && cc){
//             if(dest.rotation() == 0){
//                 to = a;
//                 if(flip)dest.rotation(1);
//             } else if(dest.rotation == 1){
//                 to = b;
//                 if(flip)dest.rotation(2);
//             } else {
//                 to = c;
//                 if(flip)dest.rotation(0);
//             }
//         } 
//         return to;
//     },
//     acceptItem(item, tile, source){
//         var to = this.getTT(item, tile, source, false);
//         if(tile.entity.cons.valid()){
//             tile.entity.cons.trigger();
//             return to != null && to.block().acceptItem(Vars.content.item(15), to, tile) && to.getTeam() == tile.getTeam();;
//         } else return false;
//     },
//     handleItem(item, tile, source){
//         var to = this.getTT(item, tile, source, true);
//         return to.handleItem(Vars.content.item(15), to, tile);
//     }
// });
