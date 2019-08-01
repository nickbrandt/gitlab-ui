# Tabs

<!-- STORY -->
## Usage
Tabs are used to divide content into meaningful, related sections. Tabs allow users to focus on one specific view at a time while maintaining sight of all the relevant content options available. Each tab, when active, will reveal it’s own unique content.

**Using the component Vue**

~~~js
<gl-tabs theme="indigo">
  <gl-tab title="First">
    first content
  </gl-tab>
  <gl-tab title="Second">
    second content
  </gl-tab>
</gl-tabs>
~~~

**Using the component HTML**

~~~js
<div class="tabs gl-tabs">
  <ul role="tablist" class="nav gl-tabs-nav">
    <li role="presentation" class="nav-item">
      <a
        role="tab"
        target="_self"
        href="#"
        class="nav-link gl-tab-nav-item gl-tab-nav-item-active gl-tab-nav-item-active-indigo"
      >First</a>
    </li>
    <li role="presentation" class="nav-item">
      <a role="tab" target="_self" href="#" class="nav-link gl-tab-nav-item">Second</a>
    </li>
  </ul>
  <div class="tab-content gl-tab-content">
    <div role="tabpanel" class="tab-pane gl-tab-content active">first content</div>
    <div role="tabpanel" class="tab-pane gl-tab-content">second content</div>
  </div>
</div>
~~~
