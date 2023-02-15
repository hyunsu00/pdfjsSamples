async function fetchHtmlAsText(url) {
	return await (await fetch(url)).text();
}

window.onload = () => {
	fetchHtmlAsText("pdfjs_template.html").then((html) => {
		document.querySelector("#pdfjs_wrap").innerHTML = html;
		import(/* webpackIgnore: true */ './external/pdfjs/web/viewer.js').then(()=> {
			const _appOptions = PDFViewerApplicationOptions;
			_appOptions.set("workerSrc", `external/pdfjs/build/pdf.worker.js`);
			_appOptions.set("defaultUrl", `external/pdfjs/web/compressed.tracemonkey-pldi-09.pdf`);
		});
	});
};

