# `react-wrap-with`

Creates higher-order component for wrapping component in another component.

## Background

When using React Context, sometimes it is inevitable to create an intermediate component to consume the context.

This function will wrap as an intermediate component and reduce code complexity.

## How to use

```tsx
import { createRoot } from 'react-render';
import { wrapWith } from 'react-wrap-with';

const Effect = ({ children, effect }) => <span className={`effect effect--${effect}`}>{children}</span>;
const withEffect = wrapWith(Effect, { effect: 'blink' });

const Hello = withEffect(() => <h1>Hello</h1>);

createRoot(document.getElementById('root')).render(<Hello />);
```

Will produce the HTML:

```html
<span class="effect effect--blink">
  <h1>Hello</h1>
</span>
```

### Extracting props

Sometimes, instead of initializing props during setup, you can extract and pass specific props into the container component during render.

```diff
  import { createRoot } from 'react-render';
  import { wrapWith } from 'react-wrap-with';

  const Effect = ({ children, effect }) => <span className={`effect effect--${effect}`}>{children}</span>;
- const withEffect = wrapWith(Effect, { effect: 'blink' });
+ const withEffect = wrapWith(Effect, {}, ['effect']); // "effect" prop will be extracted during render and passed to the container component <Effect>.

  const Hello = withEffect(() => <h1>Hello</h1>);

- createRoot(document.getElementById('root')).render(<Hello />);
+ createRoot(document.getElementById('root')).render(<Hello effect="blink" />); // Specifying "effect" prop during render.
```

### Referencing

Refs are automatically forwarded to the inner component.

## API

```ts
import { ComponentType } from 'react';

type ContainerProps = {};
type ContainerComponentType = ComponentType<ContainerProps>;

type ContentProps = {};
type ContentComponentType = ComponentType<ContentProps>;

function wrapWith(
  ContainerComponent: ContainerComponentType | false | null | undefined,
  initialProps?: Omit<ContainerProps, ExtractPropKey>,
  extractPropKeys: ExtractPropKey[] = []
): (
  ContentComponent: ContentComponentType | false | null | undefined
) => ComponentType<Pick<ContainerProps, ExtractPropKey> & ContentProps & { ref?: Ref }>;
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
