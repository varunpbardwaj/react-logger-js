import { BehaviorSubject } from "rxjs";

const logSubject = new BehaviorSubject<any[]>([]);
const logObservable = logSubject.asObservable();

export { logSubject, logObservable };
