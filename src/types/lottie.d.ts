// Declaração de tipos para Lottie Web Components
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'dotlottie-wc': {
        src?: string;
        autoplay?: boolean;
        loop?: boolean;
        style?: React.CSSProperties;
        children?: React.ReactNode;
      };
    }
  }
}

export {};