export default class countdownController {
  /** @type {Phaser.Time.TimerEvent} */
  timerEvent;

  /** @type {Phaser.Scene} */
  scene;

  /** @type {Phaser.GameObjects.Text} */
  label;

  /**
   *
   * @param {Phaser.Scene} scene
   * @param {Phaser.GameObjects.Text} label
   */
  constructor(scene, label) {
    this.scene = scene;
    this.label = label;
  }

  /**
   * @param {() => void} callback
   * @param {number} duration
   */
  start(callback, duration) {
    this.duration = duration;
    this.time = duration;
    this.stop();

    this.timerEvent = this.scene.time.addEvent({
      delay: duration,
      callback: () => {
        if (duration < 60000) {
          this.label.text = '0';
        } else {
          this.label.text = '0:00';
        }

        this.stop();

        if (callback) {
          callback();
        }
      },
    });
  }

  stop() {
    if (this.timerEvent) {
      console.log('stop');
      this.timerEvent.destroy();
      this.timerEvent = undefined;
    }
  }

  update() {
    if (!this.timerEvent || this.duration <= 0) {
      return;
    }

    const elapsed = this.timerEvent.getElapsed();

    const remaining = this.duration - elapsed;

    const minute = (remaining / 60000).toFixed(0);
    // minute=minute.toFixed(0);
    let seconds;

    let minuteToPrint;

    // For time greater than 1min is in the form 00:00
    if (this.time > 60000) {
      console.log(remaining / 1000);
      seconds = minute * 60 - remaining / 1000;

      if (minute * 60 > remaining / 1000) {
        seconds = minute * 60 - remaining / 1000;
        seconds = 60 - seconds;
      } else {
        seconds = remaining / 1000 - minute * 60;
      }

      if (minute < 10) {
        minuteToPrint = '0' + minute;
      } else {
        minuteToPrint = minute;
      }

      if (seconds > 59) {
        this.label.text = minuteToPrint + ':00';
      } else if (seconds == 9 || seconds < 10) {
        this.label.text = minuteToPrint + ':0' + seconds.toFixed(0);
      } else {
        console.log('else');
        this.label.text = minuteToPrint + ':' + seconds.toFixed(0);
      }
    } else {
      seconds = remaining / 1000;
      console.log('10000');
      this.label.text = seconds.toFixed(0);
    }
  }
}
