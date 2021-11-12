import GButton from "./gbutton.js";

class Keyboard {
  
  constructor(renderer,font,buttonWidth,buttonHeight,alpha) {


    this.KEYMAP = {
  		49: 0x1, // 1
  		50: 0x2, // 2
  		51: 0x3, // 3
  		52: 0xC, // 4
  		81: 0x4, // Q
  		87: 0x5, // W
  		69: 0x6, // E
  		82: 0xD, // R
  		65: 0x7, // A
  		83: 0x8, // S
  		68: 0x9, // D
  		70: 0xE, // F
  		90: 0xA, // Z
  		88: 0x0, // X
  		67: 0xB, // C
  		86: 0xF  // V
  	};
  
    this.BUTTON_MAP = {
      "1": 49,
      "2": 50,
      "3": 51,
      "4": 52,
      "Q": 81,
      "W": 87,
      "E": 69,
      "R": 82,
      "A": 65,
      "S": 83,
      "D": 68,
      "F": 70,
      "Z": 90,
      "X": 88,
      "C": 67,
      "V": 86
    };
  
    this.renderer=renderer;
    
    this.onNextKeyPressed=null;
    
    this.font=font;
    
    this.buttonWidth=buttonWidth;
    this.buttonHeight=buttonHeight;

    this.alpha=alpha;

    this.buttons = [];
    

    this.keysPressed=null;
    
    this.createKeyPad();
    
    this.onNextKeyPress=null;
    
  }

  createKeyPad() {
    let offsetX=(this.renderer.screenWidth-this.buttonWidth*4)+this.renderer.screenX;
    let offsetY=(this.renderer.screenHeight-this.buttonHeight*4)+this.renderer.screenY;
 
    let objKeys=Object.keys(this.BUTTON_MAP);

    for(let i=0;i<objKeys.length;i++) {
      let x=(i%4)*this.buttonWidth+offsetX;
      let y=Math.floor(i/4)*this.buttonHeight+offsetY;
      let text=objKeys[i];
      this.buttons.push(new GButton(this.font,text,x,y,this.buttonWidth,this.buttonHeight,this.alpha));
    }
  }
  
  draw(ctx) {
    for(let i=0;i<this.buttons.length;i++) {
      this.buttons[i].draw(ctx);
    }
  }
  
  handleEvents(gInput) {

    this.keysPressed=new Array(this.buttons.length);
    
    for(let i=0;i<this.buttons.length;i++) {
      let key=this.KEYMAP[this.BUTTON_MAP[this.buttons[i].text]];
      this.buttons[i].handleEvents(gInput);
      if(this.buttons[i].state==GButton.DOWN) {
        this.keysPressed[key]=true;
        if(this.onNextKeyPress !== null && key) {
          this.onNextKeyPress(parseInt(key));
          this.onNextKeyPress = null;
        }
      } 
    }
    
    let key=this.KEYMAP[gInput.key.code];
    if(gInput.key.isDown) {
      this.keysPressed[key]=true;
      if(this.onNextKeyPress !== null && key) {
        this.onNextKeyPress(parseInt(key));
        this.onNextKeyPress = null;
      }
    }
    
    let result="";
    for(let i=0;i<this.keysPressed.length;i++) {
      if(i!=0) result+=", ";
      result+=this.keysPressed[i]?"1":"0";
    }
    this.renderer.state.message=result;
    
    
  }
  
  update() {
    let offsetX=(this.renderer.screenWidth-this.buttonWidth*4)+this.renderer.screenX;
    let offsetY=(this.renderer.screenHeight-this.buttonHeight*4)+this.renderer.screenY;
  
    for(let i=0;i<this.buttons.length;i++) {
      let x=(i%4)*this.buttonWidth+offsetX;
      let y=Math.floor(i/4)*this.buttonHeight+offsetY;
      this.buttons[i].x=x;
      this.buttons[i].y=y;
    }
  }
  
  isKeyPressed(key) {
    return this.keysPressed[key];
  }
  
}

export default Keyboard;
