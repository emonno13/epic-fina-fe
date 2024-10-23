import { useIsAuthenticated } from '@lib/providers/auth';
import { NextPage } from 'next';
import withConditionalRedirect from './withConditionalRedirect';

/**
 * Require the user to be authenticated in order to render the component.
 * If the user isn't authenticated, forward to the given URL.
 */
export default function withAuth<CP, IP>(
  WrappedComponent: NextPage<CP, IP>,
  location = '/users/login',
): NextPage<CP, IP> {
  return withConditionalRedirect({
    WrappedComponent,
    location,
    clientCondition: function withAuthClientCondition() {
      console.log('!useIsAuthenticated()', !useIsAuthenticated());
      return !useIsAuthenticated();
    },
    serverCondition: function withAuthServerCondition(ctx) {
      return !ctx.req?.cookies.h2token;
    },
  });
}
