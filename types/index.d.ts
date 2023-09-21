declare module '*.module.css';

declare namespace JSX {
  interface IntrinsicElements {
    'ion-icon': { name: string } & React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    >;
  }
}
