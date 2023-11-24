import { Task, eventChannel } from 'redux-saga';
import {
  take,
  put,
  call,
  fork,
  cancel,
  cancelled,
  delay,
  takeEvery,
} from 'redux-saga/effects';
import { setOffsetTop } from '../slices/scrollSlice';
import { useAppDispatch } from '../store';

export const SCROLL_STOP_WATCH = 'STOP_SCROLL_WATCH';
export const SCROLL_START_WATCH = 'START_SCROLL_WATCH';

//function onScroll() {
//console.log('SCROLL', window.scrollY);
//const dispatch = useAppDispatch();
//dispatch(setOffsetTop(window.scrollY));
//}

function* updateScrollPosition() {
  console.log('SCROLL', window.scrollY);
  yield put(setOffsetTop(window.scrollY));
}

function* bgScrollWatcher(): any {
  try {
    //window.addEventListener('scroll', onScroll);
    //
    const scrollChannel = eventChannel((emitter) => {
      document.addEventListener('scroll', emitter);
      return () => document.removeEventListener('scroll', emitter);
    });

    yield takeEvery(scrollChannel, updateScrollPosition);

    while (true) {
      console.log('tick');
      yield delay(5000);
    }
  } catch (err) {
    console.error('bgSync', err);
  } finally {
    if (yield cancelled()) {
      // task was canceld from parent
      console.log('BG SCROLL WATCHER Is cancelled from parent');
    }

    //window.removeEventListener('scroll', onScroll);
  }
}

export function* scroll() {
  while (true) {
    // starts the task in the background
    const bgScrollTask: Task<any> = yield fork(bgScrollWatcher);

    // wait for the user stop action
    yield take(SCROLL_STOP_WATCH);
    // user clicked stop. cancel the background task
    // this will cause the forked bgSync task to jump into its finally block
    yield cancel(bgScrollTask);
    // wait for command to start watch mode again
    yield take(SCROLL_STOP_WATCH);
  }
}
