import React, { ReactNode } from 'react';

interface MainWrapperProps {
  children: ReactNode;
  customOuter?: { [key: string]: string } | string;
  customInner?: string;
}

export const MainWrapper: React.FC<MainWrapperProps> = ({ children, customOuter, customInner }) => {
    return (
      <div className={`p-0 w-full  ${typeof customOuter === 'string' ? customOuter : ''}`}>
        <div className={`flex flex-col w-full max-w-[1400px] mx-auto ${customInner || ''}`}>
          {children}
        </div>
      </div>
    );
  };
  
