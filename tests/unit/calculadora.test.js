const calculadora = require("../../models/calculadora.js");

test("Somar 2 + 2 deveria retornar 4", () => {
  const resultado = calculadora.somar(2, 2);
  expect(resultado).toBe(4);
});

test("Somar 5 + 100 deveria retornar 500", () => {
  const resultado = calculadora.somar(5, 100);
  expect(resultado).toBe(105);
});

test("Somar 'banana' + 100 deveria retornar erro", () => {
  const resultado = calculadora.somar("banana", 100);
  expect(resultado).toBe("Erro");
});

test("Somar 5 + 'banana' deveria retornar erro", () => {
  const resultado = calculadora.somar(5, "banana");
  expect(resultado).toBe("Erro");
});
