export function counterGroup() {
  let counters = [];

  return {
      newCounter: function() {
          let n = 0;
          const counter = {
              count: function() { return n++; },
              reset: function() { n = 0; },
              getValue: function() { return n; }
          };
          counters.push(counter);
          return counter;
      },
      total: function() {
        let sum = 0;
        for (const counter of counters) {
           sum += counter.getValue();
        }
        return sum;
      }
  };
}