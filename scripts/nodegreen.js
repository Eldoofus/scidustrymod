const color1=Color.valueOf("84f491");const color1off=Color.valueOf("62ae7f");
const nodegreen=extendContent(PowerNode,"nodegreen",{
    drawLaser(tile,target){
        var opacityPercentage = Core.settings.getInt("lasersopacity");
        if(opacityPercentage == 0) return;
        var opacity = opacityPercentage / 100;
    
        var x1 = tile.drawx(); var y1 = tile.drawy();
        var x2 = target.drawx(); var y2 = target.drawy();
    
        var angle1 = Angles.angle(x1, y1, x2, y2);
        this.t1.trns(angle1, tile.block().size * Vars.tilesize / 2 - 1.5);
        this.t2.trns(angle1 + 180, target.block().size * Vars.tilesize / 2 - 1.5);
    
        x1 += this.t1.x;
        y1 += this.t1.y;
        x2 += this.t2.x;
        y2 += this.t2.y;
    
        var fract = 1 - target.ent().power.graph.getSatisfaction();
        Draw.color(color1, color1off, fract * 0.86 + Mathf.absin(3, 0.1));
        Draw.alpha(opacity);
        Drawf.laser(this.laser, this.laserEnd, x1, y1, x2, y2, 0.25);
        Draw.color();
      },
});