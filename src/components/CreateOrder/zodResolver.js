export const zodResolver = (schema) => (values) => {
  const result = schema.safeParse(values);

  if (result.success) {
    return {
      values: result.data,
      errors: {},
    };
  }

  const errors = result.error.issues.reduce((accumulator, issue) => {
    const topLevelPath = issue.path[0];
    const fullPath = issue.path
      .map((segment) => (typeof segment === "number" ? String(segment) : segment))
      .join(".");

    if (fullPath && !accumulator[fullPath]) {
      accumulator[fullPath] = issue.message;
    }

    if (typeof topLevelPath === "string" && !accumulator[topLevelPath]) {
      accumulator[topLevelPath] = issue.message;
    }

    return accumulator;
  }, {});

  return {
    values: {},
    errors,
  };
};
