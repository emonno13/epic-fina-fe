/* eslint-disable @next/next/inline-script-id */
import Script from 'next/script';

import './check-urban-planning.module.scss';

const CheckUrbanPlanningMeeymap = () => {
  return (
    <div>
      <div id="meeymapfrm"></div>
      <Script
        type="text/javascript"
        dangerouslySetInnerHTML={{ __html: `
					const mm = new MeeyMap();
					var conf = {
						containerID: "meeymapfrm",
						clientKey: "${process.env.NEXT_PUBLIC_CLIENT_KEY_MEEYMAP}",
						fullscreenDesktop: true,
					};

					mm.Init(conf);
					`,
        }}
      />
    </div>
  );
};

export default CheckUrbanPlanningMeeymap;
