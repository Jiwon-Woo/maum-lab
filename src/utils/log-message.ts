export function plainLogMessage(functionName: string) {
  return `Function '${functionName}' is called`;
}

export function errorLogMessage(functionName: string) {
  return `Error occurred in '${functionName}' function`;
}
