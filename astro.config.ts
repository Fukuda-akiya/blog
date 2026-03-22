import mdx from '@astrojs/mdx';
import node from '@astrojs/node';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import expressiveCode from 'astro-expressive-code';
import { loadEnv } from 'vite';
import spectre, { type GiscusMapping } from './package/src';
import { spectreDark } from './src/ec-theme';

const {
	GISCUS_REPO,
	GISCUS_REPO_ID,
	GISCUS_CATEGORY,
	GISCUS_CATEGORY_ID,
	GISCUS_MAPPING,
	GISCUS_STRICT,
	GISCUS_REACTIONS_ENABLED,
	GISCUS_EMIT_METADATA,
	GISCUS_LANG,
} = loadEnv(process.env.NODE_ENV!, process.cwd(), '');

export default defineConfig({
    // 1. あなたのGitHub PagesのURLに修正
    // 例: 'https://your-name.github.io'
    site: 'https://Fukuda-akiya.github.io',

    // 2. リポジトリ名が「ユーザー名.github.io」以外なら、リポジトリ名を指定
    // 例: '/my-blog' (先頭のスラッシュが必要)
    base: '/blog', 

    output: 'static', // GitHub Pagesは静的サイトなのでstaticでOK
    integrations: [
        expressiveCode({
            themes: [spectreDark],
        }),
        mdx(),
        sitemap(),
        spectre({
            name: 'Dream Machine', // ここをあなたのサイト名に変えてもいいですね
            openGraph: {
                home: {
                    title: '',
                    description: 'A minimalistic blog about Cinema and Science.',
                },
                blog: {
                    title: 'Blog',
                    description: 'Thoughts and reflections.',
                },
                // Projectsを消したので、ここは空欄か削除でもOK
                projects: {
                    title: '', 
                },
            },
        }),
    ],
    // 3. adapterの設定はGitHub Pagesでは通常不要です
    /*
    adapter: node({
        mode: 'standalone',
    }),
    */
});
