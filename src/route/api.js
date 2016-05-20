export const all = () => {
  return new Promise((resolve, reject) => {
    resolve([{
      "id": 1,
      "label": "Test route",
      "methods": ["GET", "POST", "PUT", "DELETE"],
      "pattern": "/test(.*)",
      "target": {
        "protocol": "http",
        "host": "example.com",
        "pathname": "/$1"
      }
    }, {
      "id": 2,
      "label": "Another Test route",
      "methods": ["GET", "POST", "PUT", "DELETE"],
      "pattern": "/test(.*)",
      "target": {
        "protocol": "http",
        "host": "another-example.com",
        "pathname": "/$1"
      }
    }])
  });
}
