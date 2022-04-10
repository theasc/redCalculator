const calculate = async (stack) => {
    await simplify(['*', '/'], stack);
    await simplify(['+', '-'], stack);
    return stack;
}

const simplify = (operators, stack) => {
    while (stack.some(item => operators.includes(item))) {
        const index = stack.findIndex((value) => operators.includes(value));
        const result = makeOperation(stack[index], Number(stack[index - 1]), Number(stack[index + 1]));
        stack.splice(index - 1, 3, result.toString());
    }
}

const makeOperation = (operator, operand1, operand2) => {
    switch (operator) {
        case '*':
            return operand1 * operand2;
        case '/':
            return operand1 / operand2;
        case '+':
            return operand1 + operand2;
        default:
            return operand1 - operand2;
    }
}

module.exports = {calculate};
