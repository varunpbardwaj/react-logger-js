const input = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz";

export default function idGenerator(length: number) {
  let result = "";
  for (let i = length; i > 0; i -= 1) {
    result += input[Math.floor(Math.random() * input.length)];
  }
  return result;
}
