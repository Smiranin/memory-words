import { useEffect, useRef } from 'react';

export default function FlexText({ text }: { text: string }) {
  const innerEl = useRef<HTMLDivElement>(null);
  const contEl = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (innerEl.current && contEl.current) {
        innerEl.current.style.display = 'inline-block';
        let innerW = innerEl.current.offsetWidth;
        let parentW = contEl.current.offsetWidth;
        console.log(
          '%c Debug:',
          'background: #0E1926; color: #8EFF1E; padding: 8px 12px; font-size: 14px;',
          innerW,
          parentW
        );

        const containrPadding = 8;
        const scaleX = parentW / (innerW + containrPadding);

        innerEl.current.style.transform = `scale(${scaleX})`;
        innerEl.current.style.transformOrigin = `top left`;
      }
    };

    // Initial size setup
    handleResize();

    // Event listener for window resize
    // window.addEventListener('resize', handleResize);

    // Cleanup on unmount
    return () => {
      //   window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      ref={contEl}
      className="p-2 w-48 h-48 mx-auto my-10 bg-slate-50 shadow-md shadow-black rounded-md text-2xl flex items-center content-center"
    >
      <span ref={innerEl}>{text}</span>
    </div>
  );
}
