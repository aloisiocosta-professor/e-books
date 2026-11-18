import test from "node:test";
import assert from "node:assert/strict";
import { createStory } from "../src/story.js";
test("gera história determinística com quatro páginas", () => {
  const book = createStory({ name: "Ana", age: 5, theme: "floresta" });
  assert.equal(book.pages.length, 4);
  assert.match(book.title, /Ana/);
  assert.equal(book.mode, "mock");
});
test("rejeita idade fora do intervalo", () => assert.throws(() => createStory({ name: "Ana", age: 2, theme: "oceano" })));
test("rejeita tema desconhecido", () => assert.throws(() => createStory({ name: "Ana", age: 5, theme: "inexistente" })));
test("rejeita nome com markup", () => assert.throws(() => createStory({ name: "<script>", age: 5, theme: "espaco" })));
