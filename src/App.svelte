<!-- Main.svelte -->
<script>
    import { onMount } from 'svelte';
    import TabMenu from './components/home/TabMenu.svelte';
    import HomeBannerSlider from './components/home/HomeBannerSlider.svelte';
    import ContentList from './components/home/ContentList.svelte';
    

    onMount(() => {
        // 모바일 화면 높이 조정 (iOS 주소창 문제 해결)
        const setVh = () => {
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${ vh }px`);
        };

        setVh();
        window.addEventListener('resize', setVh);

        return () => {
            window.removeEventListener('resize', setVh);
        };
    });
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
    :global(:root) {
        --vh: 1vh;
    }

    :global(*) {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif;
        -webkit-tap-highlight-color: transparent;
    }

    :global(body) {
        background-color: #f5f5f5;
        min-height: 100vh;
        min-height: calc(var(--vh, 1vh) * 100);
        overflow-x: hidden;
    }

    .app {
        width: 100%;
        margin: 0 auto;
        min-height: 100vh;
        min-height: calc(var(--vh, 1vh) * 100);
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
