import ora from "ora";

export default function createSpinner(text, color) {
  const spinner = ora(text).start();
  setTimeout(() => {
    spinner.color = color;
    spinner.succeed();
  }, 2000);
}
