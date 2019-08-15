<template>
  <div>
    <gl-card no-body style="max-width: 20rem; min-width: 14rem;">
      <b-card-header>Bronze</b-card-header>
      <b-card-body>
        <div class="price-per-month">
          <div class="append-right-5">$0</div>
          <ul class="billing-conditions">
            <li>per user</li>
            <li>monthly</li>
          </ul>
        </div>
        <p class="subtext">Billed anually at $48</p>

        <hr />

        <div class="features">
          <p>Unlimited repositories</p>
          <p>2,000 CI pipeline minutes/month</p>
          <p>Next day support</p>
        </div>

        <gl-link href="https://about.gitlab.com/pricing/#gitlab-com">See all Bronze features</gl-link>
      </b-card-body>

      <gl-card-footer>
        <div class="flex justify-content-end">
          <gl-button href="#" variant="primary">Upgrade</gl-button>
        </div>
      </gl-card-footer>
    </gl-card>
  </div>
</template>
