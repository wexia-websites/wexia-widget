import type { WexiaWidgetConfig } from './types';
export declare function injectStyles(primaryColor: string, position: 'bottom-right' | 'bottom-left'): void;
export interface UIElements {
    button: HTMLButtonElement;
    panel: HTMLDivElement;
    categorySelect: HTMLSelectElement;
    commentTextarea: HTMLTextAreaElement;
    emailInput: HTMLInputElement;
    pickRow: HTMLDivElement;
    screenshotPreview: HTMLDivElement;
    submitBtn: HTMLButtonElement;
    errorEl: HTMLDivElement;
    panelBody: HTMLDivElement;
}
export declare function createUI(config: WexiaWidgetConfig): UIElements;
export declare function showPickOverlay(onPick: (element: HTMLElement) => void, onCancel: () => void): () => void;
export declare function showToast(message: string): void;
