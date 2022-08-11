<template>
  <div>
    layout 一级路由组件
    <br />
    <router-link to="/dashboard">dashborad</router-link>
    <br />
    <router-link to="/article">article</router-link>
    <hr />
    <router-view></router-view>
  </div>
</template>

<script>
export default {

}
</script>

<style>
</style>