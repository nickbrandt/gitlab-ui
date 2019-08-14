<script>
import BCText from 'bootstrap-vue/src/components/card/card-text'
export default {
    components: {
        BCText,
    }
}
</script>

<template>
    <b-card-text>
        <slot></slot>
    </b-card-text>
</template>