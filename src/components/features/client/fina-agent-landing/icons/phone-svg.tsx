import React from 'react';

interface Props{
  isMobile: boolean
}

const PhoneSvg = React.memo(({ isMobile }: Props)=> {
  const length = isMobile ? '40' : '72';
  return (
    <svg width={length} height={length} viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M52.86 32.25C51.57 32.25 50.55 31.2 50.55 29.94C50.55 28.83 49.44 26.52 47.58 24.51C45.75 22.56 43.74 21.42 42.06 21.42C40.77 21.42 39.75 20.37 39.75 19.11C39.75 17.85 40.8 16.8 42.06 16.8C45.06 16.8 48.21 18.42 50.97 21.33C53.55 24.06 55.2 27.4501 55.2 29.91C55.2 31.2001 54.15 32.25 52.86 32.25Z" fill="#FF6C0E"/>
      <path d="M63.6893 32.25C62.3993 32.25 61.3793 31.2 61.3793 29.94C61.3793 19.29 52.7093 10.65 42.0893 10.65C40.7993 10.65 39.7793 9.6 39.7793 8.34C39.7793 7.08 40.7993 6 42.0593 6C55.2593 6 65.9993 16.74 65.9993 29.94C65.9993 31.2 64.9493 32.25 63.6893 32.25Z" fill="#FF6C0E"/>
      <path d="M8.47271 14.3871L8.47274 14.3871L8.47585 14.3792C9.11011 12.7671 10.1198 11.2691 11.5593 9.91109L11.5709 9.90016L11.5823 9.88898C13.2759 8.22185 15.0137 7.5 16.77 7.5C17.4 7.5 18.0163 7.63567 18.5509 7.89228L18.5611 7.89719L18.5714 7.90194C19.1286 8.15909 19.6016 8.53203 19.9767 9.07382L19.9816 9.08092L19.9866 9.08796L26.9466 18.898L26.9466 18.898L26.9527 18.9065C27.4384 19.581 27.7649 20.1681 27.9817 20.6979L27.9864 20.7095L27.9913 20.7209C28.2028 21.2144 28.29 21.6415 28.29 21.96C28.29 22.3781 28.1703 22.8311 27.8787 23.3101L27.8661 23.3308L27.8542 23.3519C27.5479 23.8937 27.0714 24.5073 26.4193 25.1593L26.4091 25.1696L26.399 25.1801L24.1276 27.5411C23.5013 28.1735 23.22 28.9515 23.22 29.79C23.22 30.1721 23.2702 30.5053 23.3548 30.8438L23.3755 30.9267L23.4055 31.0067C23.4584 31.1478 23.5115 31.273 23.5491 31.3618C23.5528 31.3705 23.5564 31.3789 23.5598 31.387C23.6027 31.4884 23.6181 31.5277 23.627 31.5543L23.6692 31.681L23.7332 31.7983C24.344 32.9182 25.3484 34.2976 26.6949 35.8889L26.7003 35.8953L26.7057 35.9016C28.071 37.4792 29.5325 39.0932 31.1193 40.7105L31.1243 40.7156L31.1293 40.7207C31.2924 40.8837 31.4612 41.0444 31.6146 41.1906L31.6205 41.1962C31.7805 41.3485 31.9245 41.4858 32.0593 41.6207L32.0661 41.6274L32.0728 41.634C32.6812 42.2271 32.6916 43.1871 32.0893 43.7893L26.5393 49.3393C25.9636 49.9151 25.0407 49.9372 24.4146 49.3533C24.2428 49.182 24.073 49.0199 23.9163 48.8703L23.9107 48.865C23.7446 48.7064 23.5928 48.5614 23.4428 48.4115C20.4062 45.3451 17.6675 42.1347 15.2251 38.7805C12.8209 35.4376 10.9022 32.1177 9.51373 28.8509C8.16505 25.5774 7.5 22.5048 7.5 19.62C7.5 17.7578 7.82828 15.9982 8.47271 14.3871Z" stroke="#064DD6" strokeWidth="3"/>
      <path d="M63.8184 57.5893L63.8109 57.6044L63.8037 57.6196C63.3532 58.5736 62.7738 59.4685 62.0086 60.3128C60.7254 61.7268 59.348 62.7319 57.826 63.3901H57.8166L57.5449 63.5007C55.9549 64.1474 54.2269 64.5001 52.35 64.5001C49.5273 64.5001 46.4574 63.836 43.158 62.4302C39.825 61.01 36.4752 59.0902 33.139 56.6619C32.423 56.1295 31.7224 55.6083 31.0421 55.0793L38.7759 47.3456C39.2583 47.6664 39.7132 47.9384 40.134 48.1589L40.2019 48.1944L40.273 48.2228C40.3082 48.2369 40.3577 48.259 40.4526 48.3025C40.4601 48.3059 40.4679 48.3095 40.4759 48.3132C40.5579 48.3508 40.6646 48.3997 40.7792 48.4488L40.811 48.4625L40.8434 48.4746C41.3026 48.6468 41.7339 48.6901 42.12 48.6901C43.0471 48.6901 43.8114 48.3382 44.4067 47.7447L46.6837 45.4978L46.6837 45.4978L46.6907 45.4908C47.3801 44.8014 47.9778 44.3441 48.4839 44.08L48.5277 44.0571L48.57 44.0314C49.0544 43.7366 49.4777 43.6201 49.92 43.6201C50.2702 43.6201 50.6776 43.6921 51.1821 43.8984C51.713 44.1156 52.3053 44.4445 52.9943 44.9122L62.9117 51.9532L62.9189 51.9584L62.9262 51.9634C63.504 52.3634 63.8438 52.7807 64.0474 53.2324C64.286 53.8356 64.41 54.3883 64.41 54.9901C64.41 55.65 64.2925 56.3453 64.0517 57.0237C63.9601 57.2679 63.8966 57.4328 63.8184 57.5893Z" stroke="#064DD6" strokeWidth="3"/>
    </svg>
  );
});
export default PhoneSvg;