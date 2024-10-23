import Link from 'next/link';
import { RootStateOrAny, useSelector } from 'react-redux';

import Counter from './counter';
import Clock from './clock';

function Page(props: any) {
  const { linkTo, NavigateTo, title } = props;
  const placeholderData = useSelector((state: RootStateOrAny) => state.placeholderData);
  const error = useSelector((state: RootStateOrAny) => state.error);
  const light = useSelector((state: RootStateOrAny) => state.light);
  const lastUpdate = useSelector((state: RootStateOrAny) => state.lastUpdate);

  return (
    <div>
      <Link href="/admin">admin</Link>
      <h1>{title}</h1>
      <Clock lastUpdate={lastUpdate} light={light} />
      <Counter />
      <nav>
        <Link href={linkTo}>
          <a>
            Navigate đâs:
            {NavigateTo}
          </a>
        </Link>
      </nav>
      {placeholderData && (
        <pre>
          <code>{JSON.stringify(placeholderData, null, 2)}</code>
        </pre>
      )}
      {error && (
        <p style={{ color: 'red' }}>
        Error:
          {error.message}
        </p>
      )}
    </div>
  );
}

export default Page;
