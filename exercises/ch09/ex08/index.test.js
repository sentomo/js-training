import { AlarmClock } from './index.js';

describe('AlarmClock test', () => {
  let clock;

  beforeEach(() => {
    clock = new AlarmClock();
  });

  it('初期状態は normal', () => {
    expect(clock.getState()).toBe("normal");
  });

  describe('handleEventメソッドのテスト', () => {
    const testCases = [
      { state: "normal", event: "setAlarm", expectedState: "alarmSet", expectedAction: "none" },
      { state: "normal", event: "cancelAlarm", expectedState: "normal", expectedAction: "none" },
      { state: "normal", event: "reachedToAlarmTime", expectedState: "normal", expectedAction: "none" },
      { state: "normal", event: "snooze", expectedState: "normal", expectedAction: "none" },
      { state: "normal", event: "elapseSnoozeTime", expectedState: "normal", expectedAction: "none" },
      { state: "alarmSet", event: "setAlarm", expectedState: "alarmSet", expectedAction: "none" },
      { state: "alarmSet", event: "cancelAlarm", expectedState: "normal", expectedAction: "none" },
      { state: "alarmSet", event: "reachedToAlarmTime", expectedState: "alarmSounding", expectedAction: "soundAlarm" },
      { state: "alarmSet", event: "snooze", expectedState: "alarmSet", expectedAction: "none" },
      { state: "alarmSet", event: "elapseSnoozeTime", expectedState: "alarmSet", expectedAction: "none" },
      { state: "alarmSounding", event: "setAlarm", expectedState: "alarmSounding", expectedAction: "none" },
      { state: "alarmSounding", event: "cancelAlarm", expectedState: "normal", expectedAction: "stopAlarm" },
      { state: "alarmSounding", event: "reachedToAlarmTime", expectedState: "alarmSounding", expectedAction: "none" },
      { state: "alarmSounding", event: "snooze", expectedState: "snoozing", expectedAction: "stopAlarm" },
      { state: "alarmSounding", event: "elapseSnoozeTime", expectedState: "alarmSounding", expectedAction: "none" },
      { state: "snoozing", event: "setAlarm", expectedState: "snoozing", expectedAction: "none" },
      { state: "snoozing", event: "cancelAlarm", expectedState: "normal", expectedAction: "none" },
      { state: "snoozing", event: "reachedToAlarmTime", expectedState: "snoozing", expectedAction: "none" },
      { state: "snoozing", event: "snooze", expectedState: "snoozing", expectedAction: "none" },
      { state: "snoozing", event: "elapseSnoozeTime", expectedState: "alarmSounding", expectedAction: "soundAlarm" },
    ];

    testCases.forEach(({ state, event, expectedState, expectedAction }) => {
      it(`状態が ${state} のとき、イベント ${event} で ${expectedAction} が返り、新しい状態は ${expectedState} になる`, () => {
        clock.setState(state);
        expect(clock.handleEvent(event)).toBe(expectedAction);
        expect(clock.getState()).toBe(expectedState);
      });
    });
  });
});

