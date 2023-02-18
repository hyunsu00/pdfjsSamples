async function fetchHtmlAsText(url) {
	// !!! htmlStr이 정확히 넘어오는지 확인해야 한다.
	const htmlStr = await (await fetch(url)).text();
	return htmlStr;
}

window.onload = () => {
	const publicPath = ``;
	fetchHtmlAsText(`${publicPath}/external/pdfjs.html`).then((html) => { // 절대경로
		const pdfjs_wrapEl = document.querySelector("#pdfjs_wrap");
		if (pdfjs_wrapEl == null) {
			return;
		}
		pdfjs_wrapEl.innerHTML = html;

		import(/* webpackIgnore: true */ './pdfjs/web/viewer.js') // 상대경로
		.then((moduleName)=> {
			const _appOptions = PDFViewerApplicationOptions;
			_appOptions.set("workerSrc", `${publicPath}/external/pdfjs/build/pdf.worker.js`); // 절대경로
			_appOptions.set("defaultUrl", `${publicPath}/external/pdfjs/web/compressed.tracemonkey-pldi-09.pdf`); // 절대경로
		})
		.catch((err) => {
			console.log(`[import() Failed] : ${err.message}`);
		});

	});
};

