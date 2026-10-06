export function getVideoEmbedUrl(rawUrl: string) {
    try {
        const url = new URL(rawUrl);
        const hostname = url.hostname.replace(/^www\./, '').toLowerCase();

        if (hostname === 'youtu.be') {
            const videoId = url.pathname.slice(1).split('/')[0];
            return videoId ? `https://www.youtube.com/embed/${videoId}` : rawUrl;
        }

        if (hostname === 'youtube.com' || hostname === 'm.youtube.com') {
            const videoId = url.searchParams.get('v')
                || url.pathname.match(/^\/(?:embed|shorts|live)\/([^/?]+)/)?.[1];
            return videoId ? `https://www.youtube.com/embed/${videoId}` : rawUrl;
        }
    } catch {
        // Keep invalid or non-YouTube URLs unchanged so the iframe can report the issue.
    }

    return rawUrl;
}
