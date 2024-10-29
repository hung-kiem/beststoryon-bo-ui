import React, { useRef, useEffect } from "react";

interface Props {
  children: React.ReactNode;
  exceptionRef?: React.RefObject<HTMLElement>;
  onClick: () => void;
  className?: string;
}

const ClickOutside: React.FC<Props> = ({
  children,
  exceptionRef,
  onClick,
  className,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isClickInside = (event: MouseEvent) => {
      return (
        (wrapperRef.current &&
          wrapperRef.current.contains(event.target as Node)) ||
        (exceptionRef?.current &&
          (exceptionRef.current === event.target ||
            exceptionRef.current.contains(event.target as Node)))
      );
    };

    const handleClickListener = (event: MouseEvent) => {
      if (!isClickInside(event)) {
        onClick();
      }
    };

    document.addEventListener("click", handleClickListener);

    return () => {
      document.removeEventListener("click", handleClickListener);
    };
  }, [exceptionRef, onClick]);

  return (
    <>
      <div ref={wrapperRef} className={className}>
        {children}
      </div>
    </>
  );
};

export default ClickOutside;
