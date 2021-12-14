import ora from "ora";

export default function createSpinner(text, textSucceed, color) {
  const spinner = ora(text).start();
  setTimeout(() => {
    spinner.color = color;
    spinner.text = textSucceed;
    spinner.succeed();
  }, 1000);
}
