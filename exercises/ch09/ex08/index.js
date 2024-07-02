export class AlarmClock {
  constructor() {
    this.state = "normal";
  }

  getState() {
    return this.state;
  }

  setState(newState) {
    this.state = newState;
  }

  handleEvent(event) { // すべてのイベントを handleEventメソッドで処理するように。
    const actions = {
      setAlarm: {
        normal: () => {
          this.state = "alarmSet";
          return "none";
        },
        default: () => "none"
      },
      cancelAlarm: {
        alarmSet: () => {
          this.state = "normal";
          return "none";
        },
        alarmSounding: () => {
          this.state = "normal";
          return "stopAlarm";
        },
        snoozing: () => {
          this.state = "normal";
          return "none";
        },
        default: () => "none"
      },
      reachedToAlarmTime: {
        alarmSet: () => {
          this.state = "alarmSounding";
          return "soundAlarm";
        },
        default: () => "none"
      },
      snooze: {
        alarmSounding: () => {
          this.state = "snoozing";
          return "stopAlarm";
        },
        default: () => "none"
      },
      elapseSnoozeTime: {
        snoozing: () => {
          this.state = "alarmSounding";
          return "soundAlarm";
        },
        default: () => "none"
      }
    };

    const actionHandlers = actions[event] || {};
    const actionHandler = actionHandlers[this.state] || actionHandlers.default;
    return actionHandler();
  }
}