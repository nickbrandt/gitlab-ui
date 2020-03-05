### Single Stat

The single stat component is a card used to show a single value. The color of the background & text is determined by the **variant** prop, which can be one of "success", "warning", "error", "info", or "neutral" (default).

To display an icon to the left of the text, you can use the **icon** slot. This can be an SVG icon or a text character. If using an SVG icon, ensure that the fill/stroke values use `currentColor` so the icon color matches the text of the single stat.

An example of using an icon:

```html
<gl-single-stat variant="success" title="Ecstatic" value="1000%">
  <template #icon><gl-icon name="arrow-up" /></template>
</gl-single-stat>
```
