import { Injectable } from '@angular/core';
import { Log } from '../models/log';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { of } from 'rxjs/observable/of';

@Injectable()
export class LogService {
  logs: Log[];

  private logSource = new BehaviorSubject<Log>({id: null, text: null, date: null});
  selectedLog = this.logSource.asObservable();

  private stateSource = new BehaviorSubject<boolean>(true);
  stateClear = this.stateSource

  constructor() {
    // this.logs = [
    //   {
    //     id: '1',
    //     text: 'Genrated Components',
    //     date: new Date('12/26/2017')
    //   },
    //   {
    //     id: '2',
    //     text: 'Added Bootstrap',
    //     date: new Date('12/06/2017')
    //   },
    //   {
    //     id: '3',
    //     text: 'Added Logs Components',
    //     date: new Date('10/26/2016')
    //   }
    // ]
    this.logs = [];
   }

   getLogs(): Observable<Log[]> {
    if(localStorage.getItem('logs') === null) {
      this.logs = [];
    } else {
      this.logs = JSON.parse(localStorage.getItem('logs'));
    }

    return of(this.logs.sort((a, b) => {
      return b.date = a.date;
    }));
   }

   setFormLog(log: Log) {
     this.logSource.next(log);
   }

   addLog(log: Log) {
     this.logs.unshift(log);

     // Add to local storage
     localStorage.setItem('logs', JSON.stringify(this.logs));
   }

   updateLog(log: Log) {
    this.logs.forEach((cur, index) => {
      if(log.id === cur.id) {
        this.logs.splice(index, 1);
      }
    });
    this.logs.unshift(log);

    // Update to local storage
    localStorage.setItem('logs', JSON.stringify(this.logs));
   }

   deleteLog(log: Log) {
    this.logs.forEach((cur, index) => {
      if(log.id === cur.id) {
        this.logs.splice(index, 1);
      }
    });

    // Delete local storage
    localStorage.setItem('logs', JSON.stringify(this.logs));
   }

   clearState() {
     this.stateSource.next(true);
   }

}
