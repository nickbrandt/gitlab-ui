<script>
export default {
  data() {
    return {
      items: [
        {
          text: 'First Item',
          href: '#',
        },
        {
          text: 'Second Item',
          href: '#',
        },
        {
          text: 'Third Item',
          href: '#',
        },
      ],
    };
  },
};
</script>

<template>
  <gl-breadcrumb :items="items">
    <template #avatar>
      <img
        class="gl-breadcrumb-avatar-tile"
        src="https://assets.gitlab-static.net/uploads/-/system/group/avatar/9970/logo-extra-whitespace.png?width=15"
        width="15"
        height="15"
      />
    </template>
    <template #separator>
      <svg viewBox="0 0 16 16">
        <path
          d="M9.9 8.064L5.656 3.821A1 1 0 0 1 7.07 2.407l4.95 4.95a1 1 0 0 1 0 1.414l-4.95 4.95a1 1 0 0 1-1.414-1.414l4.242-4.243z"
          fill-rule="evenodd"
        />
      </svg>
    </template>
  </gl-breadcrumb>
</template>
