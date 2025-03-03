<script>
    import TabMenu from './components/home/TabMenu.svelte';
    import HomeBannerSlider from './components/home/HomeBannerSlider.svelte';
    import ContentList from './components/home/ContentList.svelte';
</script>

<div
    class="app"
>
    <!-- 탭 메뉴 -->
    <nav
        class="tab-navigation"
        aria-label="메인 탭 메뉴"
    >
        <TabMenu />
    </nav>

    <!-- 컨텐츠 영역 -->
    <main
        class="content"
        aria-label="메인"
    >
        <!-- 배너 슬라이더 -->
        <div class="banner-section">
            <HomeBannerSlider />
        </div>

        <!-- 콘텐츠 리스트 -->
        <section
            class="content-section"
            aria-labelledby="content-title"
        >
            <ContentList />
        </section>

        <!-- 하단 영역 -->
        <footer
            class="bottom-area"
            aria-label="푸터"
        >
            <div class="footer-content">최하단 푸터 영역</div>
        </footer>
    </main>
</div>

<style>

    .app {
        width: 100%;
        margin: 0 auto;
        min-height: 100vh;
        position: relative;
        background-color: var(--color-background, #f5f5f5);
    }

    .tab-navigation {
        position: sticky;
        top: 0px;
        z-index: 90;
    }

    .content {
        width: 100%;
        background-color: var(--color-background, #f5f5f5);
    }

    .content-section {
        background-color: #fff;
        margin-bottom: 10px;
    }

    .banner-section {
        background-color: #FFF;
    }

    .bottom-area {
        text-align: center;
        padding: var(--spacing-xl, 30px) 0;
        position: relative;
        color: #666;
        background-color: #f0f0f0;
    }

    .footer-content {
        font-weight: bold;
    }

    .bottom-area::after {
        content: "↑";
        display: block;
        font-size: 24px;
        margin-top: 10px;
        animation: bounce 1.5s infinite;
    }

    @keyframes bounce {
        0%, 100% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(-8px);
        }
    }

    :global(:focus-visible) {
        outline: 2px solid #007bff;
        outline-offset: 2px;
    }
</style>
