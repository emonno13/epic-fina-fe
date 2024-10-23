import Link from 'next/link';

const ClientAlmaHeaderLogos = () => {
  return (
    <div className="client-alma-header-logos">
      <Link href="/">
        <div className="logo-wrapper fina">
          <img src="/assets/images/fina-alma-logo.png" />
        </div>
      </Link>
      <div className="logo-wrapper alma">
        <img src="/assets/images/alma-logo.png" />
      </div>
    </div>
  );
};

export default ClientAlmaHeaderLogos;