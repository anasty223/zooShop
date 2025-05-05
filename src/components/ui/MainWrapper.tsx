import React, { ReactNode } from 'react';

interface MainWrapperProps {
  children: ReactNode;
  customOuter?: { [key: string]: string } | string;
  customInner?: string;
}

export const MainWrapper: React.FC<MainWrapperProps> = ({ children, customOuter, customInner }) => {
    return (
      <div className={`p-0 flex flex-col items-center w-[100%] ${customOuter ? customOuter : ''}`}>
      <div className={`flex flex-col w-full max-w-[1170px] ${customInner ? customInner : ''}`}>
          {children}
        </div>
      </div>
    );
  };
  
