import { useState, useEffect } from "react";

export interface TypewriterConfig {
  text: string;
  monoText: string;
  typingSpeed: number;
  deleteSpeed: number;
  pauseTime: number;
}

export const useTypewriter = (config: TypewriterConfig) => {
  const [typedText, setTypedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const { text, monoText, typingSpeed, deleteSpeed, pauseTime } = config;
  const monoStartIndex = text.indexOf(monoText);
  const monoEndIndex = monoStartIndex + monoText.length;

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        if (!isDeleting && currentIndex < text.length) {
          setTypedText(text.substring(0, currentIndex + 1));
          setCurrentIndex(currentIndex + 1);
        } else if (isDeleting && typedText.length > 0) {
          setTypedText(text.substring(0, typedText.length - 1));
        } else if (typedText.length === 0 && isDeleting) {
          setIsDeleting(false);
          setCurrentIndex(0);
        } else if (currentIndex === text.length) {
          setTimeout(() => {
            setIsDeleting(true);
          }, pauseTime);
        }
      },
      isDeleting ? deleteSpeed : typingSpeed
    );
    return () => clearTimeout(timeout);
  }, [
    currentIndex,
    isDeleting,
    typedText,
    text,
    deleteSpeed,
    pauseTime,
    typingSpeed,
  ]);

  const renderTypedText = () => {
    if (typedText.length <= monoStartIndex) {
      return <span>{typedText}</span>;
    } else if (typedText.length <= monoEndIndex) {
      const beforeMono = typedText.substring(0, monoStartIndex);
      const monoPart = typedText.substring(monoStartIndex);

      return (
        <>
          <span>{beforeMono}</span>
          <span className="font-mono font-black">{monoPart}</span>
        </>
      );
    } else {
      const beforeMono = typedText.substring(0, monoStartIndex);
      const monoPart = typedText.substring(monoStartIndex, monoEndIndex);
      const afterMono = typedText.substring(monoEndIndex);

      return (
        <>
          <span>{beforeMono}</span>
          <span className="font-mono">{monoPart}</span>
          <span className="text-[var(--acm-blue)]">{afterMono}</span>
        </>
      );
    }
  };

  return {
    typedText,
    renderTypedText,
    isDeleting,
    isComplete: currentIndex === text.length && !isDeleting,
  };
};
