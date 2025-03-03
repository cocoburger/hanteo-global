<!-- TabMenu.svelte -->
<script>
    import { currentTabIndex, fetchContentsByTab, tabs } from '../../stores/index.js';
    import { onDestroy, onMount } from 'svelte';


    async function switchTab( index ) {
        currentTabIndex.set(index);


        tabs.update(tabs => {
            return tabs.map(( tab, i ) => {
                return {
                    ...tab,
                    isActive: i === index
                };
            });
        });


        const activeTab = $tabs[index];
        await fetchContentsByTab(activeTab.id);
    }

    let touchStartX = 0;
    let touchEndX = 0;
    let currentIdx;


    const unsubscribe = currentTabIndex.subscribe(value => {
        currentIdx = value;
    });


    onDestroy(() => {
        unsubscribe();
    });


    onMount(async () => {
        // 현재 활성화된 탭의 ID를 가져와서 초기 콘텐츠 로드
        const activeTab = $tabs.find(tab => tab.isActive);
        if ( activeTab ) {
            await fetchContentsByTab(activeTab.id);
        }
    });


    function handleTouchStart( e ) {
        touchStartX = e.touches[0].clientX;
    }


    function handleTouchEnd( e ) {
        touchEndX = e.changedTouches[0].clientX;
        handleSwipe();
    }


    async function handleSwipe() {
        const threshold = 50;

        if ( touchEndX - touchStartX > threshold ) {

            if ( currentIdx > 0 ) {
                await switchTab(currentIdx - 1);
            }
        } else if ( touchStartX - touchEndX > threshold ) {
            if ( currentIdx < $tabs.length - 1 ) {
                await switchTab(currentIdx + 1);
            }
        }
    }
</script>

<div
    class="tab-menu"
    on:touchstart={handleTouchStart}
    on:touchend={handleTouchEnd}
>
    <div class="tab-container">
        {#each $tabs as tab, i}
            <button
                class="tab {tab.isActive ? 'active' : ''}"
                on:click={() => switchTab(i)}
                type="button"
            >
                {tab.name}
            </button>
        {/each}
    </div>
</div>

<style>
    .tab-menu {
        display: flex;
        overflow-x: auto;
        background-color: var(--color-tab-bg);
        position: sticky;
        top: 0;
        z-index: 90;
        height: 50px;
        width: 100%;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        -webkit-overflow-scrolling: touch; /* 모바일 스크롤 부드럽게 */
        scrollbar-width: none; /* Firefox에서 스크롤바 숨김 */
        touch-action: pan-x; /* 수평 스와이프 동작 명시적 허용 */
    }

    /* Chrome, Safari에서 스크롤바 숨김 */
    .tab-menu::-webkit-scrollbar {
        display: none;
    }

    .tab-container {
        display: flex;
        width: max-content;
        height: 100%;
    }

    .tab {
        flex: 0 0 auto;
        min-width: 70px;
        text-align: center;
        padding: 15px 10px;
        font-weight: bold;
        font-size: 15px;
        white-space: nowrap;
        color: rgba(0, 0, 0, 0.7);
        position: relative;
        transition: color 0.3s ease, background-color 0.3s ease;
        cursor: pointer;
        background: none;
        border: none;
        outline: none;
        font-family: inherit;
    }

    .tab.active {
        color: #fff;
    }

    .tab.active::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 20%;
        width: 60%;
        height: 3px;
        background-color: #fff;
        border-radius: 2px;
    }

    @media (max-width: 1023px) {
        .tab {
            padding: 15px 10px;
        }
    }


    /* 모바일 소형 */
    @media (max-width: 374px) {
        .tab {
            font-size: 14px;
            min-width: 60px;
            padding: 15px 8px;
        }
    }
</style>
