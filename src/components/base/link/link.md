## Additional notes

When setting target to `_blank`, the rel attribute gets set automatically to "noopener noreferrer", this is done to avoid the `window.opener` [API exploit]. If you set the `rel` attribute manually, the aforementioned logic would preserve the existing values and append "noopener noreferrer" to it.

## Internet Explorer 11

This component uses [`URL()`](https://developer.mozilla.org/en-US/docs/Web/API/URL/URL) under the hood. Make sure those methods are polyfilled if you plan on using the component on IE11.

[api exploit]: https://www.jitbit.com/alexblog/256-targetblank---the-most-underestimated-vulnerability-ever/
