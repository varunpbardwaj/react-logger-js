import { BehaviorSubject } from "rxjs";

const logSubject = new BehaviorSubject<any[]>([]);
const logObservable = logSubject.asObservable();

const devSubject = new BehaviorSubject<any[]>([]);

export { logSubject, logObservable, devSubject };
