<script>
    import { onMount, tick } from 'svelte';
    import { contentLoading, contents, currentTabId, loadMoreContent } from '../../stores/index.js';
    import LoadingState from '../common/LoadingState.svelte';

    let observer;

    function setupInfiniteScroll() {

        observer = new IntersectionObserver(( entries ) => {
            const entry = entries[0];
            if ( entry.isIntersecting && !$contentLoading ) {
                loadMoreContent();
            }
        }, {
            rootMargin: '200px 0px',
            threshold: 0
        });

        const sentinel = document.querySelector('.scroll-sentinel');
        if ( sentinel ) {
            observer.observe(sentinel);
        }

        // 컨텐츠가 변경될 때마다 센티널 업데이트를 처리하기 위한 구독
        const unsubscribe = contents.subscribe(async () => {
            // DOM 업데이트를 기다림
            await tick();

            if ( observer ) {
                observer.disconnect();

                const sentinel = document.querySelector('.scroll-sentinel');
                if ( sentinel ) {
                    observer.observe(sentinel);
                }
            }
        });

        return () => {
            if ( observer ) {
                observer.disconnect();
            }
            unsubscribe();
        };
    }

    onMount(setupInfiniteScroll);

    function formatDate( dateString ) {
        if ( !dateString ) return '';

        const date = new Date(dateString);
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return date.toLocaleDateString('ko-KR', options);
    }


    function getUniqueKey( item ) {
        return `${ $currentTabId }-${ item.id }`;
    }

    // 탭 ID에 따른 제목 매핑
    const tabTitles = {
        'chart': '인기 차트',
        'whook': 'Whook 콘텐츠',
        'event': '진행중인 이벤트',
        'news': '최신 뉴스',
        'store': '스토어',
        'charging': '충전소',
        'default': '추천 콘텐츠'
    };

    function getTabTitle( tabId ) {
        return tabTitles[tabId] || tabTitles['default'];
    }
</script>

<section
    aria-labelledby="content-section-title"
    class="content-section"
>
    <h2
        class="section-title"
        id="content-section-title"
    >
        {getTabTitle($currentTabId)}
    </h2>

    {#if $contentLoading && $contents.length === 0}
        <LoadingState
            message="콘텐츠를 불러오는 중..."
            containerClass="loading-container"
            size="large"
        />
    {:else}
        <div
            class="content-list"
            role="list"
            aria-label="콘텐츠 리스트"
        >
            {#each $contents as item (getUniqueKey(item))}
                <a
                    href={'/'}
                    class="content-item"
                    target="#"
                    rel="noopener noreferrer"
                >
                    <div
                        class="content-thumbnail"
                        style="background-image: url('{item.thumbUrl}')"
                        aria-hidden="true"
                    >
                        {#if item.badge}
                            <span class="content-badge">{item.badge}</span>
                        {/if}
                    </div>
                    <div class="content-info">
                        <h3 class="content-title">{item.title}</h3>

                        {#if item.subtitle}
                            <p class="content-subtitle">{item.subtitle}</p>
                        {/if}

                        <div class="content-meta">
                            {#if item.price !== undefined}
                                <span class="content-price">{item.price.toLocaleString()}원</span>
                            {/if}

                            {#if item.point !== undefined}
                                <span class="content-point">{item.point.toLocaleString()} P</span>
                            {/if}

                            {#if item.timestamp}
                                <time class="content-date">{formatDate(item.timestamp)}</time>
                            {/if}
                        </div>
                    </div>
                </a>
            {/each}
        </div>
    {/if}

    {#if $contentLoading && $contents.length > 0}
        <LoadingState
            message="추가 콘텐츠 로딩 중..."
            containerClass="loading-indicator"
            size="small"
        />
    {:else}
        <div
            class="scroll-sentinel"
            aria-hidden="true"
        ></div>
    {/if}
</section>

<style>
    .content-section {
        padding: 10px 0;
        margin-bottom: 20px;
    }

    .section-title {
        font-size: 1.2rem;
        font-weight: bold;
        margin: 0 0 15px 15px;
        color: var(--color-text-dark, #333);
    }

    .content-list {
        padding: 0 15px;
    }

    .content-item {
        display: flex;
        margin-bottom: 15px;
        background-color: var(--color-card-bg, #fff);
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
        transition: transform 0.2s ease;
        cursor: pointer;
        text-decoration: none;
        color: inherit;
    }

    .content-item:active {
        transform: scale(0.98);
    }

    .content-thumbnail {
        flex: 0 0 80px;
        height: auto;
        min-height: 100%;
        background-color: #eee;
        background-position: center;
        background-size: cover;
        position: relative;
    }

    .content-badge {
        position: absolute;
        top: 5px;
        left: 5px;
        background-color: var(--color-primary, #ff69b4);
        color: white;
        font-size: 0.65rem;
        padding: 2px 6px;
        border-radius: 3px;
        font-weight: bold;
    }

    .content-info {
        flex: 1;
        padding: 6px 12px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-width: 0;
    }

    .content-title {
        font-size: 1rem;
        font-weight: 500;
        color: var(--color-text-dark, #333);
        margin: 0 0 4px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .content-subtitle {
        font-size: 0.85rem;
        color: #666;
        margin: 0 0 6px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .content-meta {
        display: flex;
        justify-content: space-between;
        font-size: 0.75rem;
        color: #888;
    }

    .content-price, .content-point {
        font-weight: bold;
        color: var(--color-primary, #ff69b4);
    }

    .scroll-sentinel {
        height: 1px;
        margin-bottom: 200px;
    }

    @media (min-width: 768px) {
        .content-list {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
            padding: 0 15px 15px;
        }

        .content-item {
            margin-bottom: 0;
        }

    }

    @media (min-width: 1024px) {
        .content-list {
            grid-template-columns: repeat(3, 1fr);
        }
    }
</style>
