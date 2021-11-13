import Renderer from "./renderer.js";
import Keyboard from "./keyboard.js";

class GInput {
  
  constructor(canvas) {

    this.canvas=canvas;

    this.touches=null;

    this.mouse={ x:0, y:0, isDown:false };

    this.canvas.addEventListener("mousedown", (function (e) {
    	const mousePos = this.getMousePos(canvas, e);
    	this.mouse.x=mousePos.x;
    	this.mouse.y=mousePos.y;
    	this.mouse.isDown=true;
    }).bind(this), false);
    
    this.canvas.addEventListener("mouseup", (function (e) {
    	const mousePos = this.getMousePos(canvas, e);
    	this.mouse.x=mousePos.x;
    	this.mouse.y=mousePos.y;
    	this.mouse.isDown=false;
    }).bind(this), false);
    
    this.canvas.addEventListener("mousemove", (function (e) {
    	const mousePos = this.getMousePos(canvas, e);
    	this.mouse.x=mousePos.x;
    	this.mouse.y=mousePos.y;
    }).bind(this), false);
    
    // Set up touch events for mobile, etc
    this.canvas.addEventListener("touchstart", (function (e) {
      const mousePos = this.getTouchPos(canvas, e);
      this.touches=e.touches;
    	let touch = e.touches[0];
    	let mouseEvent = new MouseEvent("mousedown", {
    		clientX: touch.clientX,
    		clientY: touch.clientY
    	});
    	this.canvas.dispatchEvent(mouseEvent);
    }).bind(this), false);
    
    this.canvas.addEventListener("touchend", (function (e) {
      this.touches=e.touches;
    	let mouseEvent = new MouseEvent("mouseup", {});
    	this.canvas.dispatchEvent(mouseEvent);
    }).bind(this), false);
    
    this.canvas.addEventListener("touchmove", (function (e) {
      this.touches=e.touches;
    	let touch = this.touches[0];
    	let mouseEvent = new MouseEvent("mousemove", {
    		clientX: touch.clientX,
    		clientY: touch.clientY
    	});
    	this.canvas.dispatchEvent(mouseEvent);
    }).bind(this), false);
    
    // Prevent scrolling when touching the canvas
    document.body.addEventListener("touchstart", (function (e) {
    	if (e.target == canvas) {
    		e.preventDefault();
    	}
    }).bind(this), false);
    
    document.body.addEventListener("touchend", (function (e) {
    	if (e.target == canvas) {
    		e.preventDefault();
    	}
    }).bind(this), false);
    
    document.body.addEventListener("touchmove", (function (e) {
    	if (e.target == canvas) {
    		e.preventDefault();
    	}
    }).bind(this), false);
  
  }
  
  // Get the position of the mouse relative to the canvas
  getMousePos(canvasDom, mouseEvent) {
  	let rect = canvasDom.getBoundingClientRect();
  	return {
  		x: mouseEvent.clientX - rect.left,
  		y: mouseEvent.clientY - rect.top
  	};
  }
    
  // Get the position of a touch relative to the canvas
  getTouchPos(canvasDom, touchEvent) {
  	let rect = canvasDom.getBoundingClientRect();
  	
  	this.touches=touchEvent.touches;
  	
  	return {
  		x: touchEvent.touches[0].clientX - rect.left,
  		y: touchEvent.touches[0].clientY - rect.top
  	};
  }
    
}


export default GInput; 