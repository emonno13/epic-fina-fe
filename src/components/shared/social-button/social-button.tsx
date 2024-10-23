import cn from 'classnames';

const SocialButton = ({ children, className = '', ...divProps }) => {
  return (
    <div {...divProps} className={cn('social-btn', className)}>
      
      {children}

      <style jsx>{`
      .social-btn {
        border-radius: 50%;
        width: 48px;
        height: 48px;
        cursor: pointer;
      }
      `}</style>
    </div>
  );
};

export default SocialButton;
