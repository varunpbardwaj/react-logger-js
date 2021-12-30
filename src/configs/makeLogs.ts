import { logSubject } from "./subject";

const makeLogs = (flagr: string, log: unknown) => {
  const addLog = {
    logger_flagr: flagr ? flagr : "unknown",
    data: log,
  };
  logSubject.next([...logSubject.getValue(), addLog]);
};

export default makeLogs;
