export const routeize = (routish = {}) => ({
  id: '',
  name: '',
  methods: [],
  pattern: '',
  target: '',
  ...routish,
  order: parseInt(routish.order || 0, 10)
});