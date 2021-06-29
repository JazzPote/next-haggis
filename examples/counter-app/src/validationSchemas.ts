import * as yup from "yup";

let postCount = yup.object().shape({
  count: yup.number().required().positive().integer(),
});

export { postCount };
