

export function useTextGeneration() {
  return (text: string) => {
    return `${text}, then some more text`
  };
}
