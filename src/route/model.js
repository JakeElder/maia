export const routeize = (routish = {}) => ({
  id: '',
  name: '',
  methods: [],
  pattern: '',
  secure: true,
  target: '',
  ...routish,
  order: parseInt(routish.order || 0, 10)
});
