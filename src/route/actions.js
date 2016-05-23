export const EXPAND_ROUTE = 'route/EXPAND';
export const CONTRACT_ROUTE = 'route/CONTRACT';
export const STAGE_ROUTE = 'route/STAGE';
export const UNSTAGE_ROUTE = 'route/UNSTAGE';

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

export function stageRoute(route) {
  return {
    type: STAGE_ROUTE,
    route
  }
}

export function unstageRoute(id) {
  return {
    type: UNSTAGE_ROUTE,
    id
  }
}
