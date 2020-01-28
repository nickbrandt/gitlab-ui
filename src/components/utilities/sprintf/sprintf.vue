<script>
/* eslint-disable no-continue */
import has from 'lodash/has';

const PREFIX = '%{';
const SUFFIX = '}';
const START_SUFFIX = `Start${SUFFIX}`;
const END_SUFFIX = `End${SUFFIX}`;
const PLACE_HOLDER_REGEX = new RegExp(`(${PREFIX}[a-z]+[\\w-]*[a-z0-9]+${SUFFIX})`, 'gi');

export default {
  functional: true,
  props: {
    message: {
      type: String,
      required: true,
    },
  },
  /**
   * While a functional style is generally preferred, an imperative style is
   * used here, as it lends itself better to the message parsing algorithm.
   * This approach is also more performant, as it minimizes (relatively) object
   * creation/garbage collection, which is important given how frequently this
   * code may run on a given page.
   */
  render(createElement, context) {
    let i = 0;
    const vnodes = [];
    const slots = context.scopedSlots;
    const chunks = context.props.message.split(PLACE_HOLDER_REGEX);

    while (i < chunks.length) {
      const chunk = chunks[i];
      // Skip past this chunk now we have it
      i += 1;

      if (!PLACE_HOLDER_REGEX.test(chunk)) {
        // Not a placeholder, so pass through as-is
        vnodes.push(chunk);
        continue;
      }

      if (chunk.endsWith(START_SUFFIX)) {
        const slotName = chunk.slice(PREFIX.length, -START_SUFFIX.length);

        // Peek ahead to find end placeholder, if any
        const indexOfEnd = chunks.indexOf(`${PREFIX}${slotName}${END_SUFFIX}`, i);
        if (indexOfEnd > -1) {
          // We have a valid start/end placeholder pair! Extract the content
          // between them and skip past the end placeholder
          const content = chunks.slice(i, indexOfEnd);
          i = indexOfEnd + 1;

          if (!has(slots, slotName)) {
            // Slot hasn't been provided; return placeholders and content as-is
            vnodes.push(chunk, ...content, chunks[indexOfEnd]);
            continue;
          }

          // Provide content to provided scoped slot
          vnodes.push(slots[slotName]({ content: content.join('') }));
          continue;
        }
      }

      // By process of elimination, chunk must be a plain placeholder
      const slotName = chunk.slice(PREFIX.length, -SUFFIX.length);
      vnodes.push(has(slots, slotName) ? slots[slotName]() : chunk);
      continue;
    }

    return vnodes;
  },
};
</script>
