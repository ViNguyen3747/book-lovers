import EventEmitter from "./EventEmitter";
export default class Time extends EventEmitter {
  constructor() {
    super();

    //setup
    this.start = Date.now(); //timestamp when the experience starts and will stay the same
    this.current = this.start; //current timestamp and will change each frame
    this.elapsed = 0; //how much time was spent since the start
    this.delta = 16; //how much time spent since previous frame (16 by default because it's close to how many milliseconds there is between 2 frames at 60fps)

    window.requestAnimationFrame(() => {
      this.tick();
    }); // wait one frame until call the tick
  }

  tick() {
    const currentTime = Date.now();
    this.delta = currentTime - this.current;
    this.current = currentTime;
    this.elapsed = this.current - this.start;

    this.trigger("tick");

    window.requestAnimationFrame(() => {
      this.tick();
    });
  }
}
