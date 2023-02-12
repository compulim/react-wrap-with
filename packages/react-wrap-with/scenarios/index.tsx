import { render } from 'react-dom';
import React, { Fragment, memo } from 'react';

import { createComponentStrategy, wrapWith } from '../src/index';

import type { ComponentMiddleware } from '../src/index';
import type { PropsWithChildren } from 'react';

type LinkProps = PropsWithChildren<{ href: string }>;

const { Provider: LinkComponentProvider, Proxy: Link } = createComponentStrategy<LinkProps>();

function isExternalLink(href: string): boolean {
  try {
    new URL(href);

    return true;
  } catch {}

  return false;
}

// Middleware for internal links.

const InternalLink = memo(({ children, href }: LinkProps) => <a href={href}>{children}</a>);

const internalLinkMiddleware: ComponentMiddleware<LinkProps> = () => next => props => {
  return wrapWith(!isExternalLink(props.href) && InternalLink)(next(props));
};

// Middleware for external links.

const ExternalLink = memo(({ children, href }: LinkProps) => (
  <a href={href} rel="noopener noreferrer" target="_blank">
    {children}
  </a>
));

const externalLinkMiddleware: ComponentMiddleware<LinkProps> = () => next => props => {
  return wrapWith(isExternalLink(props.href) && ExternalLink)(next(props));
};

// Middleware for decorating external links with "Open in new window" icon and alt text.

const AccessibleOpenInNewWindow = ({ children }: LinkProps) => {
  return (
    <Fragment>
      <span className="sr-only">Open in new window.</span>
      {children}&nbsp;
      <span className="ms-Icon ms-Icon--OpenInNewTab" />
    </Fragment>
  );
};

const accessibleOpenInNewWindowDecorator: ComponentMiddleware<LinkProps> = () => next => props => {
  return wrapWith(next(props))(isExternalLink(props.href) && AccessibleOpenInNewWindow);
};

const App = () => {
  const middleware: ComponentMiddleware<LinkProps>[] = [
    accessibleOpenInNewWindowDecorator,
    externalLinkMiddleware,
    internalLinkMiddleware,
    () =>
      () =>
      () =>
      ({ children }) =>
        <Fragment>{children}</Fragment>
  ];

  return (
    <LinkComponentProvider middleware={middleware}>
      <Link href="/sitemap.html">Site map</Link>
      <br />
      <Link href="https://example.com/">Example.com</Link>
    </LinkComponentProvider>
  );
};

render(<App />, document.getElementById('root'));

export default App;
