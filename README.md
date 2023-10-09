# `react-wrap-with`

Creates higher-order component (HOC) for wrapping component in another component. Also reduce code complexity for React Context by mixing components into a new component.

## Background

> This package targets React developers who build reusable components.

When using React Context or building reusable components, an intermediate component are often needed. This package will help reduce code complexity by wrapping as an intermediate component.

## How to use

The following samples assumes a theme is set for the whole component via React Context with corresponding provider component and a HOC function.

### Before

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

### After

```tsx
import { createContext } from 'react';
import { wrapWith } from 'react-wrap-with';

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => <ThemeContext.Provider>{children}</ThemeContext.Provider>;

const withTheme = wrapWith(ThemeProvider);

export { ThemeProvider, withTheme };
```

### Extracting props

Let's assume a prop named `accent` need to be extracted and passed to the `<ThemeProvider>` component in the following manner:

```ts
const ButtonWithTheme = withTheme(Button);

// `accent` with value of `"blue"` will be passed to `<ThemeProvider>`, while `text` will be passed to `<Button>`.
render(<ButtonWithTheme accent="blue" text="Submit" />);
```

#### Before

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

#### After

```tsx
import { Extract, wrapWith } from 'react-wrap-with';

const ThemeProvider = ({ accent, children }) => (
  <ThemeContext.Provider value={{ accent }}>{children}</ThemeContext.Provider>
);

// Mark "accent" prop for extraction.
const withTheme = wrapWith(ThemeProvider, { accent: Extract });
```

Props marked with `Extract` will not be passed to content component. To pass the prop to both the container component and the content component. Please use `Spy`.

### Spying props

Spying is a useful technique to pass the prop to both the container component and the content component.

#### Before

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

#### After

```tsx
import { Spy, wrapWith } from 'react-wrap-with';

const ThemeProvider = ({ accent, children }) => (
  <ThemeContext.Provider value={{ accent }}>{children}</ThemeContext.Provider>
);

// Mark "accent" prop for spying.
const withTheme = wrapWith(ThemeProvider, { accent: Spy });
```

Both the `<ThemeProvider>` and the content component will receive the prop `accent`.

### Initializing props

If not every props on the container component need to be extracted or spied, the `withProps` HOC can help setting some of the props to a fixed value.

```tsx
import { withProps, wrapWith } from 'react-wrap-with';

const ThemeProvider = ({ accent, children }) => (
  <ThemeContext.Provider value={{ accent }}>{children}</ThemeContext.Provider>
);

const BlueThemeProvider = withProps(Theme, { accent: 'blue' });
const withBlueTheme = wrapWith(BlueThemeProvider);
```

### Referencing

Refs are automatically forwarded to the content component. If `{ ref: Extract }` is passed, the `ref` prop will reference the container component instead.

In TypeScript, you may need to explicitly set the generic types of `forwardRef()` function.

```tsx
type Props = { text: string };

const Button = forwardRef<HTMLButtonElement, Props>(({ text }, ref) => <button ref={ref}>{text}</button>);

Button.displayName = 'Button';
```

## Breaking changes

### 0.0.3 - Extract props signature changed

> Related to [pull request #30](https://github.com/compulim/react-wrap-with/pull/30).

```diff
- wrapWith(Container, {}, 'effect')
+ wrapWith(Container, { effect: Extract })
```

### 0.0.3 - Initial props is removed and replaced by `withProps` HOC

> Related to [pull request #35](https://github.com/compulim/react-wrap-with/pull/35).

```diff
- wrapWith(Container, { effect: 'blink', emphasis: Spy })
+ wrapWith(
    withProps(Container, { effect: 'blink' }),
    { emphasis: Spy }
  )
```

### 0.0.3 - No longer accept falsy component type, if falsy is expected, coalesce to `<Fragment>` instead

> Related to [pull request #36](https://github.com/compulim/react-wrap-with/pull/36).

```diff
- wrapWith(undefined)
+ wrapWith(undefined || Fragment)
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
