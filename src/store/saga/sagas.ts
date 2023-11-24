import { put, takeEvery, all, call, spawn } from 'redux-saga/effects';
import { scroll } from './scroll';

export const delay = (ms = 1000) => new Promise((res) => setTimeout(res, ms));

// TODO:
// 1.[] - add saga that will run onScroll (scrollY) watch event and
// - will wait until it will be ended by other type event =)
// 2.[] - add watchers on change in scrollY and will update compnents
// - information isInView, offsetTop

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
