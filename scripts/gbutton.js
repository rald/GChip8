import GUtil from "./gutil.js";

class GButton {

  static UP=0;
  static DOWN=1;

  constructor(font,text,x,y,width,height,alpha) {
    this.font=font;
  	this.text=text;
  	this.x=x;
  	this.y=y;
  	this.width=width;
  	this.height=height;
  	this.state=GButton.UP;
  	this.alpha=alpha;
  	
  	this.hold=false;
  	
  	this.backColorUp=palette[9]+alpha;
  	this.borderColorUp=palette[10]+alpha;
  	this.textColorUp=palette[12]+alpha;
  	
  	this.backColorDown=palette[10]+alpha;
  	this.borderColorDown=palette[9]+alpha;
  	this.textColorDown=palette[12]+alpha;
  	
  }
  
  draw(ctx) {
    
    ctx.font=this.font;
    
    ctx.textAlign="center";
    ctx.textBaseline="middle";
    
		switch(this.state) {
			case GButton.UP:

	      ctx.fillStyle=this.backColorUp;
				ctx.fillRect(this.x,this.y,this.width,this.height);
				
				ctx.strokeStyle=this.borderColorUp;
				ctx.strokeRect(this.x,this.y,this.width,this.height);
				
				ctx.textAlign="center";
				ctx.textBaseline="middle";
				ctx.fillStyle=this.textColorUp;
				ctx.fillText(this.text,this.x+this.width/2,this.y+this.height/2);

				break;

			case GButton.DOWN:
	      
	      ctx.fillStyle=this.backColorDown;
				ctx.fillRect(this.x,this.y,this.width,this.height);
			
				ctx.strokeStyle=this.borderColorDown;
				ctx.strokeRect(this.x,this.y,this.width,this.height);
				
				ctx.textAlign="center";
				ctx.textBaseline="middle";
				ctx.fillStyle=this.textColorDown;
			  ctx.fillText(this.text,this.x+this.width/2,this.y+this.height/2);

				break;
		}

	}

	handleEvents(gInput) {
	  let result=false;
	  this.state=GButton.UP;
    if(gInput.touches!==null) {
      for(let i=0;i<gInput.touches.length;i++) {
    	  if(GUtil.inrect(gInput.touches[i].clientX,gInput.touches[i].clientY,this.x,this.y,this.width,this.height)) {
      	  this.state=GButton.DOWN;
      	  result=true;
    	  } 
	    }
    }
    if(gInput.mouse.isDown) {
     if(GUtil.inrect(gInput.mouse.x,gInput.mouse.y,this.x,this.y,this.width,this.height)) {
      	  this.state=GButton.DOWN;
      	  result=true;
    	} 
    }
    return result;
	}

}

export default GButton;
