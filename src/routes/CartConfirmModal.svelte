<script lang="ts">
  export let onCloseModal: () => void;
  export let onConfirm: () => void;
</script>

<div class="modal">
  <div class="content">
    Modal
    <button on:click={onCloseModal}>Close</button>
    <button on:click={onConfirm}>Confirm</button>
  </div>
</div>

<style>
  .modal {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .content {
    background-color: white;
    border: 1px solid black;
    margin: auto;
    width: 300px;
    height: 300px;
  }
</style>
