<template>
  <div>
    <gl-sprintf message="Learn more about %{zonesLinkStart}zones%{zonesLinkEnd}">
      <template #zonesLink="{ content }">
        <gl-link href="#" target="_blank">{{ content }}</gl-link>
      </template>
    </gl-sprintf>
  </div>
</template>
