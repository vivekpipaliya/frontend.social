<template>
  <div class="event-strip">
    <b-row>
      <!--TODO: Style this component using flexbox instead of floats-->
      <b-col md="12">
        <span
          v-if="canModify"
          class="event-action"
          @click.prevent="deleteEvent(event)"
        > 
          <img
            :src="`/images/delete.svg`"
            class="icon-button"
          >
        </span>
        <span
          v-if="canModify"
          class="event-action"
          @click.prevent="editEvent(event)"
        > 
          <img
            :src="`/images/edit.svg`"
            class="icon-button"
          >
        </span>

        <a
          v-if="!isReadOnly"
        >
          <span @click.prevent="onTitleClick">{{ event.title }}</span>
          <span class="event-type capsule">
            {{ getEventTypeName(event.type) }}</span>
          <span
            v-if="event.isOnline"
            class="event-type capsule online"
          >online</span>
        </a>
        <div v-else>
          <span @click.prevent="onTitleClick">{{ event.title }}</span>
          <span class="event-type capsule">
            {{ getEventTypeName(event.type) }}</span>
          <span
            v-if="event.isOnline"
            class="event-type capsule online"
          >online</span>
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col md="8">
        <div class="event-date">
          <span>{{
            event.dateFrom | moment("timezone", "Europe/London", "DD MMM YYYY")
          }}</span>
          <span v-if="event.dateTo"> - </span>
          <span v-if="event.dateTo">{{
            event.dateTo | moment("timezone", "Europe/London", "DD MMM YYYY")
          }}</span>
          in
          <a
            :href="'/city/' + event.city + '/' + event.country"
          ><span class="city">{{ event.city }}, {{ event.country }}</span></a>
        </div>
        <SkillTags
          v-if="event.relatedSkills"
          :skills="event.relatedSkills"
        />
      </b-col>
      <b-col md="4">
        <div
          v-if="!isReadOnly"
          class="links icon-links"
        >
          <icon-link
            v-if="event.youtube"
            icon="/images/youtube.svg"
            :url="event.youtube"
          />
          <icon-link
            v-if="event.twitter"
            icon="/images/twitter.svg"
            :url="event.twitter"
          />
          <icon-link
            v-if="event.website"
            icon="/images/web.svg"
            :url="event.website"
          />
          <icon-link
            v-if="event.onlineLink"
            icon="/images/play.svg"
            :url="event.onlineLink"
          />
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col md="12">
        <div
          ref="description"
          class="event-description"
          :class="{
            expanded: isExpanded,
            collapsed: isOverflow
          }"
        >
          <div v-html="event.description" />
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col
        v-if="showArrow"
        md="12"
        class="arrow-container"
      >
        <Arrow
          :is-expanded="isExpanded"
          :on-click="toggleArrow"
        />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import IconLink from "@/components/common/IconLink";
import SkillTags from "@/components/Skills/SkillTags";
import Arrow from "../Arrow/Arrow";
import { getEventTypeName } from '@/utilities/utils';
export default {
  name: "EventStrip",
  components: {
    IconLink,
    SkillTags,
    Arrow
  },
  props: {
    event: {
      type: Object
    },
    isReadOnly: {
      type: Boolean
    },
    canModify: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      isExpanded: false,
      isOverflow: false,
      showArrow: false
    };
  },
  mounted() {
    var element = this.$refs.description;
    if (element) {
      this.isOverflow =
        element.offsetHeight < element.scrollHeight ||
        element.offsetWidth < element.scrollWidth;
      this.showArrow = this.isOverflow;
    }
  },
  methods: {
    toggleArrow() {
      this.isExpanded = !this.isExpanded;
      this.isOverflow = !this.isOverflow;
    },
    deleteEvent(event) {
      this.$emit('delete', event);
    },
    editEvent(event) {
      this.$emit('edit', event);
    },
    onTitleClick() {
      this.$router.push(`/event/${this.event._id}`);
    },
    getEventTypeName: getEventTypeName
  }
};
</script>

<style scoped lang="scss">
.event-strip {
  flex: 0 1 auto;
  font-size: 0.9rem;
  margin: 10px;
  width: 95%;
  position: relative;
  border-bottom: dotted 1px #aada20;
  padding-bottom: 10px;
  margin-right: 20px;
}

.event-line {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.event-type {
  font-size: 0.65rem;
  color: #2c3e50;
  float: right;

  &.online {
    background: #d44444;
    color: white;
  }
}

.event-action {
  float: right;
}

.event-description {
  font-size: 0.8rem;
  text-align: start;
  max-height: 100px;
  overflow: hidden;
}

.collapsed {
  -webkit-mask-image: -webkit-gradient(
    linear,
    left top,
    left bottom,
    from(rgba(0, 0, 0, 1)),
    to(rgba(0, 0, 0, 0))
  );
}

.expanded {
  max-height: unset;
}

.arrow-container {
  display: flex;
  justify-content: center;
  align-content: center;
}

.event-skills {
  font-size: 0.65rem;
  color: #2c3e50;
}

.event-date {
  font-size: 0.65rem;
  color: #2c3e50;
}

.icon-links {
  display: flex;
  flex-direction: row-reverse;
}
</style>
