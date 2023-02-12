# `react-wrap-with`

Wrap a React component in another component by Higher-Order Component.

## Background

When using React Context, sometimes it is inevitable to create an intermediate component to consume the context.

This function will wrap as an intermediate component and reduce complexity in the code.

## How to use

```tsx
import { createRoot } from 'react-render';
import { wrapWith } from 'react-wrap-with';

const Blink = ({ children, effect }) => <span className={`effect effect--${effect}`}>{children}</span>;
const withBlink = wrapWith(Blink, { effect: 'blink' });

const Hello = withBlink(() => <h1>Hello</h1>);

createRoot(document.getElementById('root')).render(<Hello />);
```

Will produce the HTML:

```html
<span class="effect effect--blink">
  <h1>Hello</h1>
</span>
```

## API

```ts
function wrapWith(
  wrapperComponentType: ComponentType<WrapperProps>,
  props: WrapperProps
): (wrappedComponentType: ComponentType<WrappedProps>) => ComponentType<WrappedProps>;
```

## Behaviors

### TypeScript: All wrappers must have props of `children`

Wrappers must allow `children` props. This is because wrapper is going to wrap around another component in parent-child relationship.

If you are seeing the following error in TypeScript, please make sure the wrapper component allow `children` props. `React.PropsWithChildren<>` is a typing helper to add `children` to any props.

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
