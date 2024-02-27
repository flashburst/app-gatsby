export function CustomException({ message, ...metadata }) {
    const error = new Error(message);
    Object.assign(error, metadata);
    return error;
}
