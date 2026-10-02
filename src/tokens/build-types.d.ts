declare module '*/tokens/build/tokens.js' {
  export const tokens: {
    name: string;
    group: string;
    /** Light / default value, references resolved */
    value: string;
    /** Original reference, e.g. "{color.white}" */
    ref?: string;
    /** Dark theme value, references resolved */
    dark?: string;
    darkRef?: string;
    source: string;
  }[];
}
