export const zodResolver = (schema) => (values) => {
  const result = schema.safeParse(values);

  if (result.success) {
    return { values: result.data, errors: {} };
  }

  const errors = {};

  result.error.issues.forEach((issue) => {
    const path = issue.path.join(".");

    if (path && !errors[path]) {
      errors[path] = issue.message;
    }

    const topLevelPath = issue.path[0];

    if (topLevelPath && !errors[topLevelPath]) {
      errors[topLevelPath] = issue.message;
    }
  });

  return { values: null, errors };
};
