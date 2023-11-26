# Nikita Chernyshov project

# redux saga good example with TS:

- https://medium.com/simform-engineering/redux-saga-with-typescript-in-react-native-application-d4b9b62d9a62

# redux saga example with fork and bgTask

- https://redux-saga.js.org/docs/advanced/TaskCancellation

# Redux saga: eventChannel example

```
function* someFunc(event) {
    // ...
}

function* rootSaga() {
    const clickChannel = eventChannel((emitter) => {
        document.addEventListener('click', emitter);
        return () => document.removeEventListener('click', emitter);
    });
    yield takeEvery(clickChannel, someFunc);
}
```

# React add components ref in array of refs example:

```
export const Main = memo(() => {
  //const { components, subscribeComponents } = useInView();
  //console.log('Main', components);
  const componentRefs = useRef<any>(Array(Components.length));

  const addRefElement = useCallback((element: HTMLElement, index: number) => {
    componentRefs.current[index] = element;
  }, []);

  useLayoutEffect(() => {
    console.log('MAIN', componentRefs);

    //subscribeComponents(componentRefs);
  }, [componentRefs]);

  return (
    <Column>
      {Components.map((Component, index) => (
        <div
          key={index}
          data-component-index={index}
          ref={(element) => element && addRefElement(element, index)}
        >
          <Component index={index} />
        </div>
      ))}
    </Column>
  );
});

```
