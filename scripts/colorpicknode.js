const colorpicknode=extendContent(PowerNode,"colorpicknode",{
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
        Draw.color(tile.ent().getColOn(), tile.ent().getColOff(), fract * 0.86 + Mathf.absin(3, 0.1));
        Draw.alpha(opacity);
        Drawf.laser(this.laser, this.laserEnd, x1, y1, x2, y2, 0.25);
        Draw.color();
      },
      buildConfiguration(tile, table){
        var col1 = 1; var col2 = 1;
        table.addImageButton(Icon.pick, run(() => {
          Vars.ui.picker.show(Tmp.c1.set(tile.ent().getColOn()), true, cons(res => {
            col1 = res.rgba();
          }));
          Vars.ui.picker.show(Tmp.c1.set(tile.ent().getColOff()), true, cons(res => {
            col2 = res.rgba();
          }));
          tile.configure(col1,col2);
          Vars.control.input.frag.config.hideConfig();
        })).size(40);
      },
      configured(tile, player, value){
        if(player==null) return;
        tile.ent().setColOn(value[0]);
        tile.ent().setColOff(value[1]);
      }
});
colorpicknode.entityType = prov(() => {
	const entity = extend(TileEntity, {
		getColOn: function(){
			return this._colon;
		},
		setColOn: function(val){
			this._colon = val;
		},
		getColOff: function(){
			return this._coloff;
		},
		setColOff: function(val){
			this._coloff = val;
		}
	});
	entity.setColOn(Color.valueOf("32ff4b"));
  entity.setColOff(Color.valueOf("ffffff"));
	return entity;
});
