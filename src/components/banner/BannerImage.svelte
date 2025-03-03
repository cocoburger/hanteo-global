<script>
    export let badge = '';

    export let imageUrl = '';
</script>

<div
    class="banner-image"
    style="background-image: url('{imageUrl}');"
    aria-hidden="true"
>
    {#if badge}
        <div class="badge">{badge}</div>
    {/if}
</div>

<style>
    .banner-image {
        width: 100%;
        height: 160px;
        background-position: center;
        background-size: cover;
        background-color: #663399;
        position: relative;
    }

    .badge {
        position: absolute;
        top: 10px;
        left: 10px;
        background-color: var(--color-primary, #ff69b4);
        color: white;
        font-size: 0.75rem;
        padding: 4px 10px;
        border-radius: 3px;
        font-weight: bold;
        z-index: 5;
    }

    @media (min-width: 768px) {
        .banner-image {
            height: 200px;
        }
    }
</style>
