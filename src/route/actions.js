export const EXPAND_ROUTE = 'route/EXPAND';
export const CONTRACT_ROUTE = 'route/CONTRACT';

export function expandRoute(id) {
  return {
    type: EXPAND_ROUTE,
    id
  };
};

export function contractRoute(id) {
  return {
    type: CONTRACT_ROUTE,
    id
  };
};
