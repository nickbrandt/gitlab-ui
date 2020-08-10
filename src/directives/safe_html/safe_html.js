import { sanitize } from 'dompurify';

const transform = (el, binding) => {
  if (binding.oldValue !== binding.value) {
    const config = binding.arg || {};
    el.innerHTML = sanitize(binding.value, config);
  }
};

const SafeHtmlDirective = {
  bind: transform,
  update: transform,
};

export default SafeHtmlDirective;
