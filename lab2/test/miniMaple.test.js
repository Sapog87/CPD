import {MiniMaple} from "../src/miniMaple";

const  miniMaple = new MiniMaple();

test('differentiates a simple polynomial with one variable correctly', () => {
    const expr = "4*x^3 - 2*x^2 + 5*x - 7";
    const result = miniMaple.diffPolynomial(expr, "x");
    expect(result).toBe("12*x^2-4*x+5");
});

test('differentiates a polynomial with multiple variables correctly (differentiate by x)', () => {
    const expr = "3*y*x^2+5*x-y";
    const result = miniMaple.diffPolynomial(expr, "x");
    expect(result).toBe("6*y*x+5");
});

test('differentiates a polynomial with multiple variables correctly (differentiate by y)', () => {
    const expr = "3*y*x^2 +5*x-y";
    const result = miniMaple.diffPolynomial(expr, "y");
    expect(result).toBe("3*x^2-1");
});

test('returns 0 when the variable is not present in the polynomial', () => {
    const expr = "5*y^2+7";
    const result = miniMaple.diffPolynomial(expr, "x");
    expect(result).toBe("0");
});

test('handles a constant polynomial correctly', () => {
    const expr = "42";
    const result = miniMaple.diffPolynomial(expr, "x");
    expect(result).toBe("0");
});

test('differentiates correctly with higher powers of the variable', () => {
    const expr = "10*x^5-3*x^4+2*x^3";
    const result = miniMaple.diffPolynomial(expr, "x");
    expect(result).toBe("50*x^4-12*x^3+6*x^2");
});

test('differentiates a polynomial with complex multivariable terms', () => {
    const expr = "4*y*z^2*x^3-2*z*x^2+5*x-3*y";
    const result = miniMaple.diffPolynomial(expr, "x");
    expect(result).toBe("12*y*z^2*x^2-4*z*x+5");
});

test('returns correct derivative when variable has no exponent', () => {
    const expr = "3*x+7";
    const result = miniMaple.diffPolynomial(expr, "x");
    expect(result).toBe("3");
});

test('returns correct derivative for a single variable term with exponent', () => {
    const expr = "2*x^3";
    const result = miniMaple.diffPolynomial(expr, "x");
    expect(result).toBe("6*x^2");
});

test('returns correct derivative when differentiating by a variable that is not in the term', () => {
    const expr = "4*y*x^3";
    const result = miniMaple.diffPolynomial(expr, "y");
    expect(result).toBe("4*x^3");
});

test('throws error for invalid input - no signs', () => {
    const expr = "4yx^3";
    expect(() => miniMaple.diffPolynomial(expr, "y")).toThrow("Invalid expression");
});

test('throws error for invalid input', () => {
    const expr = "4*x^2/t";
    expect(() => miniMaple.diffPolynomial(expr, "x")).toThrow("Invalid expression");
});