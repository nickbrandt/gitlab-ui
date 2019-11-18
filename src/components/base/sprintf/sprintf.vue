<script>
const PLACE_HOLDER_REGEX = /(%{\w+})/g;

export default {
  functional: true,
  props: {
    message: {
      type: String,
      required: true,
    },
  },
  render(createElement, context) {
    const slots = context.slots();

    const keys = Object.keys(slots);

    if (keys.length > 0) {
      // Replace all named interpolations with content from slots with the same names
      return context.props.message.split(PLACE_HOLDER_REGEX).map(chunk => {
        if (chunk.startsWith('%{') && chunk.endsWith('}')) {
          // Strip interpolation start/end markers
          const slotName = chunk.slice(2, -1);
          return slotName in slots ? slots[slotName] : chunk;
        }
        return chunk;
      });
    }

    return [context.props.message];
  },
};
</script>
