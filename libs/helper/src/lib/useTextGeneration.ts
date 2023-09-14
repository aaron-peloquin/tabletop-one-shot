
export function useTextGeneration() {
  return (text: string) => {
    // fetch()
    return `${text}, then some more text`
  };
}
 