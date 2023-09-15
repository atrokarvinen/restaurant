<script lang="ts">
  import { enhance } from "$app/forms";
  import type { Food } from "../types";

  export let errors: any;
  export let defaultValues: Food | undefined;

  $: isEdit = !!defaultValues;
  $: console.log("Edit mode:", isEdit);
  $: action = isEdit ? "?/update" : "?/create";
</script>

<form method="post" {action} use:enhance>
  {#if isEdit}
    <input hidden name="id" value={defaultValues?.id} />
  {/if}
  <label>
    Name
    <input name="name" value={defaultValues?.name ?? ""} />
    {#if errors?.name}
      <span class="alert">{errors.name}</span>
    {/if}
  </label>

  <label>
    Price
    <input name="price" value={defaultValues?.price ?? ""} />
    {#if errors?.price}
      <span class="alert">{errors.price}</span>
    {/if}
  </label>

  <button type="submit">{isEdit ? "Update" : "Create"}</button>
</form>

<style>
  .alert {
    background-color: red;
  }
</style>
