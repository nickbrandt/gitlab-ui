# Filtered Search

The filtered search component is responsible for managing search with possible filters.

## Usage

Each filter option (named token) requires a separate Vue component. `GlFilteredSearchStaticBinaryToken` is an example of such a token.

Each token for filtered search is a Vue component with the following props:

- `active`: indicates if the token is currently active. It's the token's responsibility
  to render proper control for editing (for example input).
- `current-value`: current tokens of the filtered search.
- `index`: current token position in the filtered search.
- Additional configuration, supplied in filtered search config for this token.

The token should emit the following events:

- `activate`: when the token requests activation (for example, when being clicked).
- `deactivate`: when token requests deactivation (for example due to losing blur on input).
- `destroy`: when token requests self-destruction (for instance for clicking "X" sign).
- `replace`: token requests its replacement with another token.
- `create`: token requests creation of new tokens.
- `complete`: token indicates its editing is completed.

## Examples

Define a list of available tokens:

```js
const availableTokens = [
  { type: 'static', icon: 'label', title: 'static:token', token: staticToken },
  { type: 'dynamic', icon: 'rocket', title: 'dynamic:~token', token: dynamicToken },
];
```

Pass the list of tokens to the search component. Optionally, you can use `v-model` to receive realtime updates:

```js
 <gl-filtered-search :available-tokens="tokens" v-model="value" />
```
