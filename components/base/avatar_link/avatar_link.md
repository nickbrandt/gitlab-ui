## Avatar link

GlAvatarLink decorates GlAvatar with hyperlink functionality. It accepts the same properties as the GlLink component and it works in the same way too. The main purpose of this component is to apply visual enhancements that makes evident that the user can interact with the avatar.

**Using the component**
~~~js
<gl-avatar-link target="blank" href="https://gitlab.com/gitlab-org/gitlab">
  <gl-avatar-labeled
    :size="32"
    entity-name="GitLab"
    label="GitLab User"
    sub-label="@gitlab"
  />
</gl-avatar-link>
<gl-avatar-link target="blank" href="https://gitlab.com/gitlab-org/gitlab">
  <gl-avatar
    :size="32"
    :src="avatarUrl"
  />
</gl-avatar-link>
~~~
