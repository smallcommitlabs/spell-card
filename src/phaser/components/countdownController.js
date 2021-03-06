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
    this.initial = true;
    this.remain = 0;
  }

  /**
   * @param {() => void} callback
   * @param {number} duration
   */
  start(callback, duration) {
    this.duration = duration;
    this.time = duration;
    this.stop();
    this.callback = callback;

    this.timerEvent = this.scene.time.addEvent({
      delay: duration,
      callback: () => {
        if (duration < 60000) {
          this.label.text = '0';
        } else {
          this.label.text = '00:00';
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
      this.timerEvent.destroy();
      this.timerEvent = undefined;
    }
  }

  resume(duation) {
    this.start(this.callback, duation);
  }

  getRemain() {
    return this.remain;
  }

  update() {
    if (!this.timerEvent || this.duration <= 0) {
      return;
    }

    const elapsed = this.timerEvent.getElapsed();

    const remaining = this.duration - elapsed;
    this.remain = remaining;

    const minute = (remaining / 60000).toFixed(0);
    let seconds;

    let minuteToPrint;

    minuteToPrint = minute;

    // For time greater than 1min is in the form 00:00
    if (this.time >= 60000) {
      seconds = minute * 60 - remaining / 1000;

      if (minute * 60 > remaining / 1000) {
        seconds = minute * 60 - remaining / 1000;
        seconds = 60 - seconds;
      } else {
        seconds = remaining / 1000 - minute * 60;
      }

      if (seconds >= 30) {
        minuteToPrint = minuteToPrint - 1;
      }

      // Formating
      if (seconds > 59) {
        this.label.text = minuteToPrint + 1 + ':00';
      } else if (seconds <= 9 || seconds.toFixed(0) < 10) {
        this.label.text = minuteToPrint + ':0' + seconds.toFixed(0);
      } else {
        this.label.text = minuteToPrint + ':' + seconds.toFixed(0);
      }
    } else {
      seconds = remaining / 1000;
      this.label.text = seconds.toFixed(0);
    }
  }
}
