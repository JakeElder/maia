export function all() {
  return new Promise((resolve, reject) => {
    resolve([{
      "id": 1,
      "name": "Test route",
      "methods": ["GET", "POST"],
      "pattern": "/test(.*)",
      "target": "http://example.com/$1"
    }, {
      "id": 2,
      "name": "Another Test route",
      "methods": ["GET", "POST", "PUT", "DELETE"],
      "pattern": "/test(.*)",
      "target": "http://another-example.com/$1"
    }])
  });
}
