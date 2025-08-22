/* eslint-disable @typescript-eslint/no-explicit-any */


export const generateRoutes = (sidebarItems: { items: any[]; }[]) => {
    return sidebarItems.flatMap((section) => 
    section.items.map((route) => ({
             path: route.url,
             Component: route.component
    })))
};

export default generateRoutes;