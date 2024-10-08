export const generateRandomString = (length: string): string => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  const charactersLength = characters.length

  // Parse the length string to an integer
  const stringLength = parseInt(length, 10)

  // Check if the parsed length is a valid number
  if (isNaN(stringLength) || stringLength <= 0) {
    throw new Error(
      'Invalid length. Please provide a positive integer as a string.',
    )
  }

  for (let i = 0; i < stringLength; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }

  return result
}

export const generateTextOutput = (
  callback: (result: string) => void,
  delay: number = 10000,
): void => {
  setTimeout(() => {
    callback(`生成が完了しました。

生成結果：****`)
  }, delay)
}
