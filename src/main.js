import App from './App.svelte';

const app = new App({
    target: document.body,
    intro: true,
    props: {
        version: '${VERSION}'
    }
});

export default app;