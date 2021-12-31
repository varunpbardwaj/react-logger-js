import { logSubject, devSubject } from "./subject";

const makeLogs = (flagr: string, log: unknown) => {
  if(devSubject.getValue().includes(window.location.host)) {
    const addLog = {
      logger_flagr: flagr ? flagr : "unknown",
      data: log,
    };
    logSubject.next([...logSubject.getValue(), addLog]);
  }
};

export default makeLogs;
