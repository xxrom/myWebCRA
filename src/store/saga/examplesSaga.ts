import { put, takeEvery, all, call, spawn } from 'redux-saga/effects';

export const delay = (ms = 1000) => new Promise((res) => setTimeout(res, ms));

export function* helloSaga() {
  console.log('Hello Sagas!');
  yield delay();
  console.log('Hello Sagas RUN!');
  yield put({ type: 'INCREMENT_ASYNC' });
  console.log('Hello Sagas FINISH!');
}

export function* incrementAsync() {
  console.log('INCREMENT ASYNC!');
  yield delay();
  yield put({ type: 'FINISH_ICREMENT_ASYNC' });
}

export function* watchIncrementAsync() {
  yield takeEvery('INCREMENT_ASYNC', incrementAsync);
}

export function* rerunIncrementAsync() {
  console.log('RERUN INCREMENT ASYNC!');
  yield delay();
  yield put({ type: 'INCREMENT_ASYNC' });
  throw Error('test error!');
}
export function* watchFinishIncrementAsync() {
  yield takeEvery('FINISH_ICREMENT_ASYNC', rerunIncrementAsync);
}

// TODO:
// 1.[] - add saga that will run onScroll (scrollY) watch event and
// - will wait until it will be ended by other type event =)
// 2.[] - add watchers on change in scrollY and will update compnents
// - information isInView, offsetTop

// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
  //const sagas = [helloSaga, watchIncrementAsync, watchFinishIncrementAsync];
  const sagas = [helloSaga, watchIncrementAsync, watchFinishIncrementAsync];

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

  //yield all([helloSaga(), watchIncrementAsync()]);
}
