<script>
import { GlLink } from '../../../index';
export default {
  props: {
    errors: {
      type: Array,
      required: true,
    },
  },
  components: {
    GlLink,
  },
};
</script>
<template>
  <div>
    <div class="sentry-header-box">
      <div class="sentry-description-header">
        Open Errors
      </div>
      <div class="sentry-events-header">
        Events
      </div>
      <div class="sentry-users-header">
        Users      
      </div>
      <div class="sentry-last-seen-header">
        Last seen
      </div>
    </div>
    <div class="issues-holder">
      <ul class="content-list issues-list issuable-list">
        <li v-for="error in errors" :key="error.id" class="issue">
          <div class="issue-box">
            <div class="issuable-info-container">
              <div class="sentry-description">
                <div class="issue-title title">
                  <span class="issue-title-text">
                    <gl-link :href="error.external_url">{{ error.title.trim() }}</gl-link>
                  </span>
                  <span class="sentry-culprit">/ {{ error.culprit }}</span>
                </div>
                {{ error.message }}
              </div>
              <div class="sentry-events">{{ error.count }}</div>
              <div class="sentry-users">{{ error.user_count }}</div>
              <div class="sentry-lastseen">{{ error.last_seen }}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
