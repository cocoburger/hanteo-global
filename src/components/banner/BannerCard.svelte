<script>
    import BannerImage from './BannerImage.svelte';
    import BannerContent from './BannerContent.svelte';

    export let banner = [];

    export let externalUrl = 'https://www.hanteoglobal.com/';


    function handleButtonClick( event ) {
        event.preventDefault();
        event.stopPropagation();
        window.open(externalUrl, '_blank', 'noopener,noreferrer');
    }
</script>

<a
    href={externalUrl}
    class="banner-link"
    target="_blank"
    rel="noopener noreferrer"
>
    <div class="banner-card">
        <BannerImage
            badge={banner.badge}
            imageUrl={banner.imageUrl || ''}
        />

        <BannerContent
            title={banner.title || '제목 없음'}
            date={banner.date || ''}
            buttonText={banner.buttonText || '자세히 보기'}
            on:click={handleButtonClick}
        />
    </div>
</a>
