# Label

<!-- STORY -->
## Usage
Labels are editable objects that allow users to manually categorize other objects, like issues, merge requests, and epics. They have a name, description, and a customizable color. They provide a quick way to recognize which categories the labeled object belongs to.

**Using the component**
~~~js
<gl-label
  color="#fff"
  background-color="#D9C2EE"
  target="http://some.url"
  description="Some content"
  :is-scoped="true"
  scoped-labels-documentation-link="http://some.url"
  >
  Label content
</gl-label>
~~~
