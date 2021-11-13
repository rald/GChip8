import Renderer from './renderer.js';
import Keyboard from './keyboard.js';
import Speaker from './speaker.js';
import GInput from './ginput.js';
import CPU from './cpu.js';

const state={running:false,message:""};
const font="24px monospace";
const renderer = new Renderer(64,32,state);
const keyboard = new Keyboard(renderer,font,64,64,"80");
const gInput = new GInput(renderer.canvas);
const speaker = new Speaker();
const cpu = new CPU(renderer, keyboard, speaker, gInput, state);

let loop;

let fps = 60, fpsInterval, startTime, now, then, elapsed;

function init() {
	fpsInterval = 1000 / fps;
	then = Date.now();
	startTime = then;

	cpu.loadSpritesIntoMemory();
	cpu.loadRom('x');
	loop = requestAnimationFrame(step);
}

function step() {
  
    if(state.running) {
      
    	now = Date.now();
    	elapsed = now - then;
    
    	if (elapsed > fpsInterval) {
    	  cpu.cycle();
    	}
  
    }

	loop = requestAnimationFrame(step);
}

init();