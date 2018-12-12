<script>
export default {
  props: {
    errors: {
      type: Array,
      required: true,
    },
  },
};
</script>
<template>
  <div>
    <ul v-for="error in errors" :key="error.id" class="content-list issues-list issuable-list">
      <li>
        <div class="issue-box">
          <div class="issuable-info-container">
            <div class="issuable-main-info">
              <div class="issue-title title">
                <span class="issue-title-text">
                  {{ error.title }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
