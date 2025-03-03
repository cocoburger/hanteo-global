<script>
    export let message = '로딩중...';
    export let containerClass = '';
    export let size = 'medium'; // small, medium, large
</script>

<div class="loading-state {containerClass}">
    <div class="spinner {size}" aria-hidden="true"></div>
    <p class="loading-text">{message}</p>
</div>

<style>
    .loading-state {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 20px 0;
        color: #666;
        gap: 10px;
    }

    .loading-text {
        font-size: 0.9rem;
        margin: 0;
    }

    .spinner {
        border: 3px solid #f3f3f3;
        border-radius: 50%;
        border-top: 3px solid var(--color-primary, #ff69b4);
        animation: spin 1s linear infinite;
    }

    .spinner.small {
        width: 20px;
        height: 20px;
    }

    .spinner.medium {
        width: 30px;
        height: 30px;
    }

    .spinner.large {
        width: 40px;
        height: 40px;
    }

    @keyframes spin {
        to { transform: rotate(360deg); }
    }
</style> 