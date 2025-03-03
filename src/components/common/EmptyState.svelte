<script>
    export let message = '잠시 후 다시 시도해주세요.';
    export let showRetry = true;
    export let containerClass = '';
    export let isRetrying = false;
    
    // 재시도 이벤트를 부모로 전달
    function handleRetry() {
        if (!isRetrying) {
            dispatch('retry');
        }
    }
</script>

<div class="empty-state {containerClass}">
    <div class="empty-content">
        <p>{message}</p>
        {#if showRetry}
            <button 
                class="retry-button" 
                on:click={handleRetry}
                disabled={isRetrying}
            >
                {#if isRetrying}
                    <span class="loading-spinner"></span>
                {:else}
                    재시도
                {/if}
            </button>
        {/if}
    </div>
</div>

<style>
    .empty-state {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        border-radius: 12px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    }

    .empty-content {
        text-align: center;
        color: #666;
    }

    .empty-content p {
        margin: 0 0 16px 0;
        font-size: 0.9rem;
    }

    .retry-button {
        background-color: #f0f0f0;
        border: none;
        border-radius: 20px;
        padding: 8px 24px;
        font-size: 0.85rem;
        color: #666;
        cursor: pointer;
        transition: all 0.2s ease;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-width: 80px;
        min-height: 32px;
    }

    .retry-button:hover:not(:disabled) {
        background-color: #e0e0e0;
    }

    .retry-button:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }

    .loading-spinner {
        width: 16px;
        height: 16px;
        border: 2px solid #666;
        border-top-color: transparent;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        to { transform: rotate(360deg); }
    }
</style> 