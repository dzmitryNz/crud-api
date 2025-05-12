export const isValide = (data, scheme) => {
  try {
    for (const key in scheme) {
      if (scheme[key].required && !data[key]) {
        throw new Error(`${key} is required`);
      }
      if (scheme[key].type) {
        if (scheme[key].type === 'array') {
          if (!Array.isArray(data[key])) {
            throw new Error(`${key} must be an array`);
          }
          if (data[key].length) {
            if (scheme[key].arrayType) {
              for (const item of data[key]) {
                if (typeof item !== scheme[key].arrayType) {
                  throw new Error(`${key} must be an array of ${scheme[key].arrayType}`);
                }
              }
            }
          } else if (scheme[key].notEmpty) {
            throw new Error(`${key} must not be an empty array`);
          }
        }
        if (typeof data[key] !== scheme[key].type) {
          throw new Error(`${key} must be a ${scheme[key].type}`);
        }
        if (scheme[key].minLength && data[key].length < scheme[key].minLength) {
          throw new Error(`${key} must be at least ${scheme[key].minLength} characters long`);
        }
        if (scheme[key].maxLength && data[key].length > scheme[key].maxLength) {
          throw new Error(`${key} must be at most ${scheme[key].maxLength} characters long`);
        }
      }
    }
    return true;
  } catch (error) {
    return false;
  }
};


