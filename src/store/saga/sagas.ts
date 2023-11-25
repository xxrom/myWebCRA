import { all, call, spawn } from 'redux-saga/effects';
import { scroll } from './scroll';

// TODO:
// 1.[x] - add saga that will run onScroll (scrollY) watch event and
// - will wait until it will be ended by other type event =)
// 2.[] - add watchers on change in scrollY and will update compnents
// - information isInView, offsetTop

/*
 * Handle all sagas one by one with try/catch
 */
export default function* rootSaga() {
  const sagas = [scroll];

  yield all(
    sagas.map((saga) =>
      spawn(function* () {
        while (true) {
          try {
            yield call(saga);
            break;
          } catch (err) {
            console.error('rootSaga', err);
          }
        }
      })
    )
  );
}
