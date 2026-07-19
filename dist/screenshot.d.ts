declare function removeHighlight(): void;
interface HighlightRect {
    left: number;
    top: number;
    width: number;
    height: number;
}
export declare function captureScreenshot(highlight?: HighlightRect): Promise<string>;
export declare function captureElementWithHighlight(element: HTMLElement): Promise<string>;
export { removeHighlight };
