<script>

    export let title = '';

    export let date = '';


    export let buttonText = '자세히 보기';


</script>

<div class="banner-content">
    <div class="banner-top-row">
        <div class="banner-info">
            <h2
                class="banner-title"
                title={title}
            >
                {title}
            </h2>
        </div>

        <div class="banner-actions">
            <button
                type="button"
                class="action-button"
                on:click
            >
                {buttonText}
            </button>
        </div>
    </div>

    <div class="banner-bottom-row">
        <div class="banner-date-container">
            <p class="banner-date">{date}</p>
        </div>
    </div>
</div>

<style>
    .banner-content {
        padding: 15px 20px;
        color: var(--color-text, #333);
        background-color: white;
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    .banner-top-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
    }

    .banner-info {
        flex: 1;
        min-width: 0;
        max-width: calc(100% - 110px);
    }

    .banner-title {
        font-size: 1.25rem;
        font-weight: bold;
        margin: 0;
        color: var(--color-text-dark, #222);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .banner-actions {
        flex-shrink: 0;
        margin-left: 10px;
    }

    .action-button {
        background-color: white;
        color: var(--color-primary, #ff69b4);
        font-size: 0.85rem;
        padding: 6px 12px;
        border-radius: 16px;
        border: 1px solid var(--color-primary, #ff69b4);
        font-weight: bold;
        cursor: pointer;
        transition: all 0.2s ease;
        white-space: nowrap;
    }

    .action-button:hover {
        background-color: var(--color-primary, #ff69b4);
        color: white;
    }

    .banner-bottom-row {
        display: flex;
        justify-content: flex-end;
        width: 100%;
    }

    .banner-date {
        font-size: 0.8rem;
        color: #888;
        margin: 0;
        white-space: nowrap;
    }

    @media (min-width: 768px) {
        .banner-title {
            font-size: 1.4rem;
        }

        .action-button {
            padding: 8px 15px;
            font-size: 0.9rem;
        }
    }

    @media (max-width: 480px) {
        .banner-info {
            min-width: 100px;
            max-width: calc(100% - 90px);
        }

        .banner-title {
            font-size: 1rem;
        }

        .action-button {
            padding: 5px 10px;
            font-size: 0.8rem;
        }
    }
</style>
