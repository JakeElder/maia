let routes = [];

export const __setRoutes = nextRoutes => { routes = nextRoutes; }
export const all = () => Promise.resolve(routes);
