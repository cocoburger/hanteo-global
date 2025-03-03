<script>
    import { onMount } from 'svelte';
    import { banners } from '../../stores/index.js';
    import { register } from 'swiper/element/bundle';
    import BannerCard from '../banner/BannerCard.svelte';
    import EmptyState from '../common/EmptyState.svelte';
    import '../../styles/swiper-pagination.css';
    import '../../styles/banner-common.css';

    register();

    let swiperEl;
    let externalUrl = 'https://www.hanteoglobal.com/';
    let isRetrying = false;


    let retryTimeoutId;

    async function handleRetry() {
        if ( isRetrying ) return;

        isRetrying = true;

        try {
            // 3초 후에 재시도 상태 초기화
            retryTimeoutId = setTimeout(() => {
                isRetrying = false;
            }, 3000);

            // 배너 데이터를 다시 불러오는 로직을 추가 필요


        } catch ( error ) {
            console.error('배너 재시도 중 오류:', error);
            isRetrying = false;
        }
    }

    onMount(() => {
        const params = {
            slidesPerView: 'auto',
            centeredSlides: true,
            spaceBetween: 10,
            loop: true,
            autoplay: {
                delay: 300000,
                disableOnInteraction: false
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
                type: 'bullets'
            }
        };

        Object.assign(swiperEl, params);
        swiperEl.initialize();


        return () => {
            if ( retryTimeoutId ) {
                clearTimeout(retryTimeoutId);
            }
        };
    });
</script>

<section
    class="container"
    aria-label="배너 슬라이더"
>
    {#if $banners && $banners.length > 0}
        <swiper-container
            bind:this={swiperEl}
            init="false"
        >
            {#each $banners as banner, i}
                <swiper-slide>
                    <BannerCard
                        {banner}
                        {externalUrl}
                    />
                </swiper-slide>
            {/each}
            <div
                class="pagination-container"
                slot="container-end"
            >
                <div class="swiper-pagination"></div>
            </div>
        </swiper-container>
    {:else}
        <div class="banner-empty-container">
            <EmptyState
                containerClass="banner-empty"
                {isRetrying}
                on:retry={handleRetry}
            />
        </div>
    {/if}
</section>

<style>
    :global(swiper-container) {
        width: 100%;
        padding: 15px 0 0;
    }

    :global(swiper-slide) {
        width: 90%;
        max-width: 1200px;
        transition: transform 0.3s ease, opacity 0.3s ease;
        opacity: 0.4;
    }

    :global(swiper-slide.swiper-slide-active) {
        opacity: 1;
    }

    .container {
        width: 100%;
        background-color: #f5f5f5;
        margin: 0 auto 10px;
        position: relative;
    }

    .pagination-container {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 40px 0 5px;
        width: 100%;
    }

    .banner-empty-container {
        width: 90%;
        height: 160px;
        margin: 20px auto;
    }

    :global(.banner-empty) {
        height: 100%;
    }

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }
</style>
