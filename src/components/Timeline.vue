<script setup lang="ts">
import { DateTime } from "luxon";
import { ref, computed } from "vue";
import { today, thisMonth, thisWeek } from "../posts";

const periods = ["Today", "This Week", "This Month"] as const;
type Period = typeof periods[number];
const selectedPeriod = ref<Period>("Today");

function selectPeriod(period: Period) {
  selectedPeriod.value = period;
}

// const posts: Post[] = [today, thisMonth, thisWeek];
const posts = computed(() => {
  return [today, thisMonth, thisWeek]
    .map((post) => {
      return {
        ...post,
        created: DateTime.fromISO(post.created),
      };
    })
    .filter(post => {
      if (selectedPeriod.value == "Today") {
        return post.created >= DateTime.now().minus({ day: 1 });
      }
      if (selectedPeriod.value == "This Week") {
        return post.created >= DateTime.now().minus({ week: 1 });
      }
      return post;
    });
});
</script>

<template>
  <nav class="is-primary panel">
    <span class="panel-tabs">
      <a
        v-for="period of periods"
        :key="period"
        @click="selectPeriod(period)"
        :class="{ 'is-active': period == selectedPeriod }"
      >
        {{ period }}
      </a>
    </span>
    <a class="panel-block" v-for="post of posts" :key="post.id">
      {{ post.title }} | {{ post.created.toFormat("d MMM") }}
    </a>
  </nav>
</template>
