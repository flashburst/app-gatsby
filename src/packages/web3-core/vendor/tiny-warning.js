const isProduction = process.env.NODE_ENV === 'production';
export function warning(condition, message) {
    // don't do anything in production
    // wrapping in production check for better dead code elimination
    if (!isProduction) {
        // condition passed: do not log
        if (condition) {
            return;
        }
        // Condition not passed
        const text = `Warning: ${message}`;
        // check console for IE9 support which provides console
        // only with open devtools
        if (typeof console !== 'undefined') {
            console.warn(text);
        }
        // Throwing an error and catching it immediately
        // to improve debugging
        // A consumer can use 'pause on caught exceptions'
        // https://github.com/facebook/react/issues/4216
        try {
            throw Error(text);
        }
        catch (x) {
            // swallow
        }
    }
}
