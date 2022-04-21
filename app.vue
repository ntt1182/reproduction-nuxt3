<template>
  <div>
    <!-- <NuxtWelcome /> -->
    <h1>Hello World</h1>
  </div>
</template>
<script lang="ts">
import { useFetch } from "./.nuxt/imports";

export default {
  async setup() {
    const callAPIWithTransform = async () => {
      const { data, pending, error, refresh } = await useFetch(
        "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita",
        {
          transform: (response: any) => response,
        }
      );
      return data;
    };

    const callAPINoTransform = async () => {
      const { data, pending, error, refresh } = await useFetch(
        "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita"
      );
      return data;
    };

    console.log(await callAPIWithTransform());
  },
};
</script>
