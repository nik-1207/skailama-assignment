export const zodResolver = (schema) => (values) => {
  const result = schema.safeParse(values);

  if (result.success) {
    return {
      values: result.data,
      errors: {},
    };
  }

  const errors = result.error.issues.reduce((accumulator, issue) => {
    const path = issue.path[0];

    if (typeof path === "string" && !accumulator[path]) {
      accumulator[path] = issue.message;
    }

    return accumulator;
  }, {});

  return {
    values: {},
    errors,
  };
};
