class Renderer {
    
  constructor(cols,rows,state) {

    this.mc=0;
    
    this.state=state;

    this.canvas=document.getElementById("canvas");

    this.ctx=canvas.getContext("2d");

    this.canvas.width = window.innerWidth; 
    this.canvas.height = window.innerHeight;

    this.cols = cols;
    this.rows = rows;

    this.scaleX=Math.floor(window.innerWidth/this.cols);
    this.scaleY=Math.floor(window.innerHeight/this.rows);
    
    this.scale=Math.min(this.scaleX,this.scaleY);

    this.screenWidth=this.cols*this.scale;
    this.screenHeight=this.rows*this.scale;
    
    this.screenX=Math.floor(window.innerWidth-this.screenWidth)/2;
    this.screenY=Math.floor(window.innerHeight-this.screenHeight)/2;

    this.backColor=palette[0];
    this.screenColor=palette[1];
    
    this.display = new Array(this.cols*this.rows);
    
    for(let i=0;i<this.display.length;i++) {
      this.display[i]=0;
    }
    
    this.clear();
  
    this.isResized=false;

    window.addEventListener("resize",this.onResize.bind(this),false);

  }

  setPixel(x,y) {

    while (x >= this.cols) {
        x -= this.cols;
    }
    
    while (x < 0) {
        x += this.cols;
    }
    
    while (y >= this.rows) {
        y -= this.rows;
    }
    
    while (y < 0) {
        y += this.rows;
    }

    let pixelLoc = x + (y * this.cols);

    this.display[pixelLoc] ^= 1;

    return !this.display[pixelLoc];

  }

  clear() {
    this.display = new Array(this.cols*this.rows);
    for(let i=0;i<this.display.length;i++) {
      this.display[i]=0;
    }

  }

  render() {

    let ctx=this.ctx;

    ctx.fillStyle=this.backColor;
    ctx.fillRect(0,0,this.canvas.width,this.canvas.height);

    ctx.fillStyle=this.screenColor;
    ctx.fillRect(this.screenX,this.screenY,this.screenWidth,this.screenHeight);

    for (let i = 0; i < this.cols * this.rows; i++) {
        
      let x = (i % this.cols) * this.scale + this.screenX;

      let y = Math.floor(i / this.cols) * this.scale + this.screenY;

      ctx.fillStyle = this.display[i]?palette[12]:palette[1];

      ctx.fillRect(x, y, this.scale, this.scale);
    }
    
    ctx.textAlign="left";
    ctx.textBaseline="top";
    ctx.fillStyle=palette[12];
    ctx.fillText(this.state.message,16,16);
  
  }
  
  onResize() {
    this.canvas.width = window.innerWidth; 
    this.canvas.height = window.innerHeight;

    this.scaleX=Math.floor(window.innerWidth/this.cols);
    this.scaleY=Math.floor(window.innerHeight/this.rows);
    
    this.scale=Math.min(this.scaleX,this.scaleY);

    this.screenWidth=this.cols*this.scale;
    this.screenHeight=this.rows*this.scale;
    
    this.screenX=Math.floor(window.innerWidth-this.screenWidth)/2;
    this.screenY=Math.floor(window.innerHeight-this.screenHeight)/2;

    this.isResized=true;
  }

}

export default Renderer;
