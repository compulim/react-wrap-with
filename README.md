# `react-wrap-with`

Creates higher-order component (HOC) for wrapping component in another component.

## Background

> This package is for React developers who build reusable components.

When using React Context, sometimes it is inevitable to create an intermediate component to consume the context.

This function will wrap as an intermediate component and reduce code complexity.

## How to use

### Before using `react-wrap-with`

```tsx
import { wrapWith } from 'react-wrap-with';

const Effect = ({ children }) => <span className="effect effect--blink">{children}</span>;
const Hello = ({ value }) => <h1>{value}</h1>;

const withEffect = componentType => props =>
  <Effect>
    {createElement(componentType, props)}
  </Effect>
};

const HelloWithEffect = withEffect(Hello);

render(<HelloWithEffect value="Hello, World!" />);
```

Will produce the HTML:

```html
<span class="effect effect--blink">
  <h1>Hello, World!</h1>
</span>
```

### After using `react-wrap-with`

```diff
  import { wrapWith } from 'react-wrap-with';

  const Effect = ({ children }) => <span className="effect effect--blink">{children}</span>;
  const Hello = ({ value }) => <h1>{value}</h1>;

- const withEffect = componentType => props =>
-   <Effect>
-     {createElement(componentType, props)}
-   </Effect>
- };
+ const withEffect = wrapWith(Effect);

  const HelloWithEffect = withEffect(Hello);

  render(<HelloWithEffect value="Hello, World!" />);
```

### Initializing props

Initial props per higher-order component (HOC) function.

In the following sample, the `effect` will be initialized with `blink` during the lifetime of the HOC function.

```diff
  import { wrapWith } from 'react-wrap-with';

- const Effect = ({ children }) => <span className="effect effect--blink">{children}</span>;
+ const Effect = ({ children, effect }) => <span className={`effect effect--${effect}`}>{children}</span>;
  const Hello = ({ value }) => <h1>{value}</h1>;

- const withEffect = wrapWith(Effect);
+ const withEffect = wrapWith(Effect, { effect: 'blink' });

  const HelloWithEffect = withEffect(({ value } ) => <h1>{value}</h1>);

  render(<HelloWithEffect value="Hello, World!" />);
```

Will produce the HTML:

```html
<span class="effect effect--blink">
  <h1>Hello, World!</h1>
</span>
```

### Extracting props

Extract and pass props into the container component during render. Props marked for extraction will not pass to the content component.

In the following sample, the `effect` prop can be passed when rendering the component.

```diff
- import { wrapWith } from 'react-wrap-with';
+ import { ExtractProp, wrapWith } from 'react-wrap-with';

  const Effect = ({ children, effect }) => <span className={`effect effect--${effect}`}>{children}</span>;
  const Hello = ({ value }) => <h1>{value}</h1>;

- const withEffect = wrapWith(Effect, { className: 'blink' });
+ const withEffect = wrapWith(Effect, { className: ExtractProp });

  const HelloWithEffect = withEffect(({ value } ) => <h1>{value}</h1>);

- render(<HelloWithEffect value="Hello, World!" />);
+ render(<HelloWithEffect effect="blink" value="Hello, World!" />);
```

Will produce the HTML:

```html
<span class="effect effect--blink">
  <h1>Hello, World!</h1>
</span>
```

### Spying props

Props marked as spying will be passed to both inner component and outer component.

In the following sample, when the `value` props is longer than 10 characters, CSS class `effect--long` will be applied.

```diff
- import { ExtractProp, wrapWith } from 'react-wrap-with';
+ import { ExtractProp, SpyProp, wrapWith } from 'react-wrap-with';
+ import classNames from 'classnames';

- const Effect = ({ children, effect }) => <span className={`effect effect--${effect}`}>{children}</span>;
+ const Effect = ({ children, effect, value }) => <span className={classNames(`effect effect--${effect}`, { 'effect--long': value.length > 10 })}>{children}</span>;
  const Hello = ({ value }) => <h1>{value}</h1>;

- const withEffect = wrapWith(Effect, { className: ExtractProp });
+ const withEffect = wrapWith(Effect, { className: ExtractProp, value: SpyProp });

  const HelloWithEffect = withEffect(({ value } ) => <h1>{value}</h1>);

  render(<HelloWithEffect value="Hello, World!" />);
```

Will produce the HTML:

```html
<span class="effect effect--blink effect--long">
  <h1 className="hello hello--blink">Hello, World!</h1>
</span>
```

### Referencing

Refs are automatically forwarded to the inner component.

### TypeScript helpers

#### Define generic type explicitly

To clearly define types, generic types can be set explicitly.

```tsx
  import { ExtractProp, SpyProp, wrapWith } from 'react-wrap-with';

+ type Props = PropsWithChildren<{
+   effect: 'blink' | 'marquee';
+   value: string;
+ }>

- const Effect = ({ children, effect, value }) => <span className={classNames(`effect effect--${effect}`, { 'effect--long': value.length > 10 })}>{children}</span>;
+ const Effect = ({ children, effect, value }: Props) => <span className={classNames(`effect effect--${effect}`, { 'effect--long': value.length > 10 })}>{children}</span>;

- const withEffect = wrapWith(Effect, { effect: ExtractProp, value: SpyProp });
+ const withEffect = wrapWith<typeof Effect, 'effect', 'value'>(Effect, { effect: ExtractProp, value: SpyProp });
```

#### Using `satisfies`

You can use `satisfies` operator to type the second argument (`how`).

```tsx
- import { ExtractProp, SpyProp, wrapWith } from 'react-wrap-with';
+ import { ExtractProp, SpyProp, wrapWith, type HowOf } from 'react-wrap-with';

+ type Props = PropsWithChildren<{
+   className: 'blink' | 'marquee';
+   value: string;
+ }>

- const Effect = ({ children, effect, value }) => <span className={classNames(`effect effect--${effect}`, { 'effect--long': value.length > 10 })}>{children}</span>;
+ const Effect = ({ children, className, value }: Props) => <span className={classNames(`effect effect--${effect}`, { 'effect--long': value.length > 10 })}>{children}</span>;

- const withEffect = wrapWith(Effect, { effect: ExtractProp, value: SpyProp });
+ const withEffect = wrapWith(Effect, { effect: ExtractProp, value: SpyProp } satisfies HowOf<typeof Effect>);
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
