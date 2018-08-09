export default (context, prefix = null) => {
  return context
    .keys()
    .map(filePath => {
      const component = context(filePath);
      return {
        name: filePath
          .split("/")
          .pop()
          .replace(/\.\w+$/, "")
          .replace("_", "-")
          .replace(" ", "-")
          .toLowerCase(),
        module: component.default || component
      };
    })
    .reduce((accumulator, component) => {
      accumulator[component.name] = component.module;
      return accumulator;
    }, {});
};
