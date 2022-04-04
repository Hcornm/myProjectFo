<template>
    <div>
        <main-header />
        <left-menu />
        <div>
            <router-view />
        </div>
    </div>
</template>

<script>
import MainHeader  from "@/components/template/MainHeader.vue";
import LeftMenu from '@/components/template/LeftMenu.vue';
export default {
   components: {
     MainHeader,
      LeftMenu
   }
}
</script>