export const routeize = (routish = {}) => ({
  id: '',
  name: '',
  methods: [],
  tags: [],
  pattern: '',
  secure: true,
  target: '',
  ...routish,
  order: parseInt(routish.order || 0, 10)
});
