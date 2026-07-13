import type { WexiaWidgetConfig } from './types';
declare class WexiaWidget {
    private config;
    private screenshotBase64;
    private pickCleanup;
    private initialized;
    constructor(config: WexiaWidgetConfig);
    init(): this;
    private submit;
    private showScreenshotPreview;
    private showError;
    private showSuccess;
    private resetForm;
    destroy(): void;
}
declare global {
    interface Window {
        WexiaWidget: typeof WexiaWidget;
    }
}
export default WexiaWidget;
export { WexiaWidget };
