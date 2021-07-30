function ora_Error_Message(spinner) {
  return function oraError(message = "The information could not be found...") {
    return spinner.success(message);
  };
}

module.exports = {
  ora_Error_Message: ora_Error_Message,
};
