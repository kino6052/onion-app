import { BehaviorSubject } from "rxjs";

export interface IStateManager<T> {
  getState: () => T;
  setState: (cb: (state: T) => T) => void;
  subscribe: (cb: (state: T) => void) => void;
  waitFor: (predicate: (state: T) => boolean) => void;
}

export class StateManager<T> implements IStateManager<T> {
  private state$: BehaviorSubject<T>;

  constructor(initialState: T) {
    this.state$ = new BehaviorSubject(initialState);
  }

  getState() {
    return this.state$.getValue();
  }

  setState(updateFn: (state: T) => T) {
    this.state$.next(updateFn(this.getState()));
  }

  subscribe(callback: (state: T) => void) {
    return this.state$.subscribe(callback);
  }

  async waitFor(predicate: (state: T) => boolean) {
    return new Promise<void>((resolve) => {
      const subscription = this.state$.subscribe((state) => {
        if (predicate(state)) {
          subscription.unsubscribe();
          resolve();
        }
      });
    });
  }
}
