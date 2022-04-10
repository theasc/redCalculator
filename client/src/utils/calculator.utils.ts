import {calculateStack} from "../api";

export const OPERATORS = ['/', '*', '-', '+'];

export const concat = (stack: string[], value: string, allowDot: boolean, resultTag: boolean): [string[], boolean, boolean] => {
    const lastString = stack[stack.length - 1];

    switch (value) {
        case '/': case '*': case '+': case '-':
            if (!OPERATORS.includes(lastString[0]) && lastString[lastString.length - 1] !== '.') {
                stack.push(value);
                allowDot = true;
                resultTag = false;
            }
            break;
        case '.':
            if (lastString.length > 0 && allowDot && !OPERATORS.includes(lastString[0])) {
                stack[stack.length - 1] = stack[stack.length - 1] + value;
                allowDot = false;
                resultTag = false;
            }
            break;
        case '0':
            if (resultTag) {
                stack = [''];
                resultTag = false;
            }
            if (OPERATORS.includes(lastString[0])) {
                stack.push(value);
            } else if (lastString[0] !== '0' || lastString.length > 1) {
                stack[stack.length - 1] = stack[stack.length - 1] + value;
            }
            break;
        default:
            if (resultTag) {
                stack = [''];
                allowDot = true;
                resultTag = false;
            }
            if (lastString[0] === '0' && lastString.length === 1) {
                stack[stack.length - 1] = value;
            } else if (OPERATORS.includes(lastString[0])) {
                stack.push(value);
            } else {
                stack[stack.length - 1] = stack[stack.length - 1] + value;
            }
            break;
    }

    return [stack, allowDot, resultTag];
}

export const removeLastChar = (stack: string[], allowDot: boolean, resultTag: boolean, mainDisplay: string): [string[], boolean, boolean] => {
    if (resultTag) {
        resultTag = false;
        allowDot = true;
    }

    let lastString = stack[stack.length - 1];
    const deletedValue = mainDisplay[mainDisplay.length - 1];

    if (OPERATORS.includes(deletedValue)) {
        stack.splice(-1, 1);
    } else if (deletedValue === '.') {
        lastString = lastString.slice(0, -1);
        stack.splice(-1, 1);
        stack.push(lastString);
        allowDot = true;
    } else if (lastString.length > 1) {
        lastString = lastString.slice(0, -1);
        stack.splice(-1, 1);
        stack.push(lastString);
    } else if (lastString.length === 1 && stack.length > 1) {
        stack.splice(-1, 1);
    } else {
        stack = ['0'];
    }
    return [stack, allowDot, resultTag];
}

export const makeCalulation = async (stack: string[], allowDot: boolean): Promise<[string[], boolean]> => {
    const lastString = stack[stack.length - 1];

    if (lastString[lastString.length - 1] === '.') {
        stack[stack.length - 1] = stack[stack.length - 1].slice(0, -1);
        allowDot = true;
    }

    if (OPERATORS.includes(stack[stack.length - 1])) {
        stack.splice(-1, 1);
    }

    const { data } = await calculateStack(stack)
    stack = data;

    stack[0] = stack[0].slice(0,23);
    if (stack[0] === 'NaN' || stack[0] === 'Infinity') {
        stack = ['0'];
    }
    if (stack[0].includes('.')) {
        allowDot = false;
    }

    return [stack, allowDot];
}
