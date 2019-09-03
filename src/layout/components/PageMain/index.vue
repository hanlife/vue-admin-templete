<template>
  <div class="pageMain">
    <tag-view></tag-view>
    <div class="container">
        <transition name="fade-page" mode="out-in">
            <keep-alive>
                <router-view v-if="!$route.meta.noCache"></router-view>
            </keep-alive>
            <router-view v-if="$route.meta.noCache"></router-view>
        </transition>
    </div>
  </div>
</template>

<script>
import TagView from '../tagView/tagView'
export default {
    components: { TagView },
}
</script>
