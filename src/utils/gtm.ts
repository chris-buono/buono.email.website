export const pushToDataLayer = (eventData: Record<string, any>) => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(eventData);
};