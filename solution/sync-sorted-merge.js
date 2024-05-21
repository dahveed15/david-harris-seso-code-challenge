"use strict";

// Print all entries, across all of the sources, in chronological order.

module.exports = (logSources, printer) => {

  let lowestLogs = [];

  //first step is to get first entry from each log source
  //by doing log source by logsource.pop
  for (let index = 0; index < logSources.length; index++) {
    const logSource = logSources[index];

    lowestLogs.push(logSource.pop());
  }

  //while loop call until drained status are set to true
  while (true) {
    let lowestDateIdx = -1;

    //compare dates and find the soonest one by date
    for (let index = 0; index < lowestLogs.length; index++) {
      const tempLog = lowestLogs[index];
      const currentLowestLog = lowestLogs[lowestDateIdx];

      if (!tempLog) {
        continue;
      }

      if (!currentLowestLog || tempLog.date < currentLowestLog.date) {
        lowestDateIdx = index;
      }
    }

    //breaks while loop if all log sources are drained
    if (lowestDateIdx === -1) {
      break;
    }

    //on that log source, we call printer.print(log) on it
    printer.print(lowestLogs[lowestDateIdx]);

    //then we call logsource.pop on the one that was passed to printer.print
    lowestLogs[lowestDateIdx] = logSources[lowestDateIdx].pop();
  }

  printer.done()



  return console.log("Sync sort complete.");
};
