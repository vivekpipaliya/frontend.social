<template>
  <div class="learn">
    <Loader v-show="loading" />
    <b-container>
      <b-row>
        <b-col md="12">
          <TalksAndArticles />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import TalksAndArticles from "@/components/Learn/TalksAndArticles";

export default {
  name: "Learn",
  components: { TalksAndArticles },
  data() {
    return {
      articles: [],
      loading: false,
    };
  },
  created() {},
  methods: {}
};
</script>

<style scoped lang="scss"></style>
