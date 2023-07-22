export const handleSaveError = (error, data, next) => {
  error.status = 400;
  next();
};

export const handelUpdateValidate = function(next){
  this.getOptions.runValidators = true;
  next();
}