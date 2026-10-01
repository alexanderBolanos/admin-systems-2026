const test = require("node:test");
const assert = require("node:assert/strict");
const { app } = require("../server");

test("GET /hola-mundo returns Hola Mundo", async (t) => {
  const server = app.listen(0);
  t.after(() => server.close());

  const port = server.address().port;
  const response = await fetch(`http://127.0.0.1:${port}/hola-mundo`);
  const text = await response.text();

  assert.equal(response.status, 200);
  assert.equal(text, "Hola Mundo");
});
