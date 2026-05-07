export interface UseLottieAnimationProps {
  animationPath: any;
  progress: number;
}

export function useLottieAnimation({ animationPath, progress }: UseLottieAnimationProps) {
  return {
    animationPath,
    progress,
  };
}
