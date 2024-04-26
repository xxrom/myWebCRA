// global.d.ts
export {}; // this file needs to be a module

declare global {
  interface Window {
    MOD3: any;
    THREE: any; // You can replace 'any' with a more specific type if you have one.
    nc: any;
    tracker: any;
  }
}
