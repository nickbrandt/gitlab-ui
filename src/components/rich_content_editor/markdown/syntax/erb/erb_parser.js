const ERB_START_SYNTAX = '<%';
const ERB_END_SYNTAX = '%>';
const SPACE_CHAR = ' ';

/*
 * Creates a custom tokenizer for ERB syntax
 * https://github.com/remarkjs/remark/tree/main/packages/remark-parse#extending-the-parser
 *
 * The best way of learning how to implement tokenizers is reading other tokenizer
 * implementations!
 *
 * https://github.com/remarkjs/remark/tree/main/packages/remark-parse/lib/tokenize
 */
const tokenizeErb = type => (eat, value, silent) => {
  const { length } = value;
  let subvalue = '';
  let index = 0;
  let character;
  let erbExpressionEnded = false;

  while (index < length) {
    character = value.charAt(index);

    if (character !== SPACE_CHAR) {
      break;
    }

    index += 1;
    subvalue += character;
  }

  if (value.indexOf(ERB_START_SYNTAX) !== index) {
    return false;
  }

  index += ERB_START_SYNTAX.length;
  subvalue += ERB_START_SYNTAX;

  while (index < length) {
    const expressionEnd = value.indexOf(ERB_END_SYNTAX, index);

    if (expressionEnd === -1) {
      break;
    }

    if (expressionEnd > index) {
      subvalue += value.charAt(index);
      index += 1;
    }

    if (expressionEnd === index) {
      subvalue += ERB_END_SYNTAX;
      index += ERB_END_SYNTAX.length;
      const nextErbExpression = value.indexOf(ERB_START_SYNTAX, index);
      const inBetween = value.substring(index, nextErbExpression);

      if (nextErbExpression === -1 || inBetween.trim() !== '') {
        erbExpressionEnded = true;
        break;
      }
    }
  }

  if (!erbExpressionEnded) {
    return false;
  }

  if (silent) {
    return true;
  }

  return eat(subvalue)({
    type,
    value: subvalue,
  });
};

export const erbParser = processor => {
  const { Parser } = processor;
  const { blockTokenizers, inlineTokenizers } = Parser.prototype;
  const { blockMethods, inlineMethods } = Parser.prototype;

  blockTokenizers.blockErb = tokenizeErb('embeddedCodeBlock');
  blockMethods.splice(blockMethods.indexOf('text'), 0, 'blockErb');

  inlineTokenizers.inlineErb = tokenizeErb('embeddedCodeInline');
  inlineTokenizers.inlineErb.locator = (value, fromIndex) =>
    value.indexOf(ERB_START_SYNTAX, fromIndex);

  inlineMethods.splice(inlineMethods.indexOf('link'), 0, 'inlineErb');
};
