# `react-wrap-with`

Creates higher-order component (HOC) for wrapping component in another component. Also reduce code complexity for React Context by mixing components into a new component.

## Background

> This package targets React developers who build reusable components.

When using React Context or building reusable components, an intermediate component are often needed. This package will help reduce code complexity by wrapping as an intermediate component.

## How to use

The following samples assumes a theme is set for the whole component via React Context with corresponding provider component and a HOC function.

### Before using `react-wrap-with`

```tsx
import { createContext } from 'react';

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => <ThemeContext.Provider>{children}</ThemeContext.Provider>;

const withTheme = Component => props => (
  <ThemeProvider>
    <Component {...props} />
  </ThemeProvider>
);

export { ThemeProvider, withTheme };
```

### After using `react-wrap-with`

```diff
  import { createContext } from 'react';
+ import { wrapWith } from 'react-wrap-with';

  const ThemeContext = createContext();

  const ThemeProvider = ({ children }) => <ThemeContext.Provider>{children}</ThemeContext.Provider>;

- const withTheme = Component => props => (
-   <ThemeProvider>
-     <Component {...props} />
-   </ThemeProvider>
- );
+ const withTheme = wrapWith(ThemeProvider);

  export { ThemeProvider, withTheme };
```

### Extracting props

Let's assume a prop named `accent` need to be extracted and passed to the `<ThemeProvider>` component in the following manner:

```ts
const ButtonWithTheme = withTheme(Button);

// `accent` with value of `"blue"` will be passed to `<ThemeProvider>`, while `text` will be passed to `<Button>`.
render(<ButtonWithTheme accent="blue" text="Submit" />);
```

#### Before using `react-wrap-with`

```tsx
const ThemeProvider = ({ accent, children }) => (
  <ThemeContext.Provider value={{ accent }}>{children}</ThemeContext.Provider>
);

const withTheme =
  Component =>
  ({ accent, ...props }) => (
    // "accent" props is extracted and passed to <ThemeProvider> only.
    <ThemeProvider accent={accent}>
      <Component {...props} />
    </ThemeProvider>
  );
```

#### After using `react-wrap-with`

```tsx
import { Extract, wrapWith } from 'react-wrap-with';

const ThemeProvider = ({ accent, children }) => (
  <ThemeContext.Provider value={{ accent }}>{children}</ThemeContext.Provider>
);

// Mark "accent" prop for extraction.
const withTheme = wrapWith(ThemeProvider, { accent: Extract });
```

Props marked with `Extract` will not be passed to content component. To pass the prop to both the container component and the content component. Please use `Spy`.

### Initializing props

Instead of extracting props, values can be passed to the `wrapWith()` function when we build the HOC function.

#### Before using `react-wrap-with`

```tsx
const ThemeProvider = ({ accent, children }) => (
  <ThemeContext.Provider value={{ accent }}>{children}</ThemeContext.Provider>
);

const withTheme = Component => props => (
  // Pass "blue" to "accent" prop.
  <ThemeProvider accent="blue">
    <Component {...props} />
  </ThemeProvider>
);
```

#### After using `react-wrap-with`

```tsx
import { Extract, wrapWith } from 'react-wrap-with';

const ThemeProvider = ({ accent, children }) => (
  <ThemeContext.Provider value={{ accent }}>{children}</ThemeContext.Provider>
);

// Pass "blue" to "accent" prop.
const withTheme = wrapWith(ThemeProvider, { accent: 'blue' });
```

### Spying props

Spying is a useful technique to pass the prop to both the container component and the content component.

#### Before using `react-wrap-with`

```tsx
const ThemeProvider = ({ accent, children }) => (
  <ThemeContext.Provider value={{ accent }}>{children}</ThemeContext.Provider>
);

const withTheme = Component => props => (
  // Pass "accent" prop to <ThemeProvider> without extracting it.
  <ThemeProvider accent={props.accent}>
    <Component {...props} />
  </ThemeProvider>
);
```

#### After using `react-wrap-with`

```tsx
import { Spy, wrapWith } from 'react-wrap-with';

const ThemeProvider = ({ accent, children }) => (
  <ThemeContext.Provider value={{ accent }}>{children}</ThemeContext.Provider>
);

// Mark "accent" prop for spying.
const withTheme = wrapWith(ThemeProvider, { accent: Spy });
```

Both the `<ThemeProvider>` and the content component will receive the prop `accent`.

### Referencing

Refs are automatically forwarded to the content component. If `{ ref: Extract }` is passed, the `ref` prop will reference the container component instead.

In TypeScript, you may need to explicitly set the generic types of `forwardRef()` function.

```tsx
type Props = { text: string };

const Button = forwardRef<HTMLButtonElement, Props>(({ text }, ref) => <button ref={ref}>{text}</button>);

Button.displayName = 'Button';
```

### TypeScript helpers

#### Define generic type explicitly

To clearly define types, generic types can be set explicitly.

```tsx
import { Extract, Spy, wrapWith } from 'react-wrap-with';

type Props = PropsWithChildren<{
  effect: 'blink' | 'marquee';
  value: string;
}>;

const Effect = ({ children, effect, value }: Props) => (
  <span className={classNames(`effect effect--${effect}`, { 'effect--long': value.length > 10 })}>{children}</span>
);

const withEffect = wrapWith<typeof Effect, 'effect', 'value'>(Effect, { effect: Extract, value: Spy });
```

#### Using `satisfies`

You can use `satisfies` operator to type the second argument (`how`).

```tsx
import { Extract, Spy, wrapWith, type HowOf } from 'react-wrap-with';

type Props = PropsWithChildren<{
  className: 'blink' | 'marquee';
  value: string;
}>;

const Effect = ({ children, className, value }: Props) => (
  <span className={classNames(`effect effect--${effect}`, { 'effect--long': value.length > 10 })}>{children}</span>
);

const withEffect = wrapWith(Effect, { effect: Extract, value: Spy } satisfies HowOf<typeof Effect>);
```

## Behaviors

### TypeScript: All containers must have props of `children`

Containers must allow `children` props. This is because container is going to wrap around another component in parent-child relationship.

If you are seeing the following error in TypeScript, please make sure the container component allow `children` props. `React.PropsWithChildren<>` is a helper type to add `children` to any props. If the component does not have props, use this prop type: `{ children?: ReactNode }`.

```
Argument of type 'FC<Props>' is not assignable to parameter of type 'false | ComponentType<PropsWithChildren<EmptyProps>> | null | undefined'.
  Type 'FunctionComponent<Props>' is not assignable to type 'FunctionComponent<PropsWithChildren<EmptyProps>>'.
    Types of property 'propTypes' are incompatible.
      ...
```

## Contributions

Like us? [Star](https://github.com/compulim/react-wrap-with/stargazers) us.

Want to make it better? [File](https://github.com/compulim/react-wrap-with/issues) us an issue.

Don't like something you see? [Submit](https://github.com/compulim/react-wrap-with/pulls) a pull request.
