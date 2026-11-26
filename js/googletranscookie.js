
function googleTranslateElementInit() {
  new google.translate.TranslateElement({
    pageLanguage: 'en',
    includedLanguages: 'en,zh,es,fr,de,ar,hi,pt,ru,ja,ko,it,tr,nl,pl,uk,vi,fa,id,ro,th,cs,sv,fi,el,he,ms,hu,bg,da,ta,te,ml,bn,ur',
    layout: google.translate.TranslateElement.InlineLayout.SIMPLE
  }, 'google_translate_element');
} 



  // Store the selected language. The marketing site runs on
  // tradezanga.com and the portal on app.tradezanga.com, so the cookie is
  // scoped to the shared domain to let the dashboard follow this choice.
  function setLanguageCookie(lang) {
    // Google's combo exposes ISO codes ("fr"); the old menu iframe exposed
    // labels ("français"). Ignore anything that is not a language code.
    if (!/^[a-z]{2}(-[a-z]{2,4})?$/i.test(lang || '')) return;

    const value = `/en/${lang}`;
    document.cookie = `googtrans=${value};path=/`;
    if (/(^|\.)tradezanga\.com$/i.test(location.hostname)) {
      document.cookie = `googtrans=${value};path=/;domain=.tradezanga.com`;
    }
  }

  // Google's page translator renders a <select class="goog-te-combo">.
  // Persist its value as a shared cookie so the dashboard can read it.
  function watchLanguageCombo() {
    const combo = document.querySelector(
      '#google_translate_element select.goog-te-combo',
    );
    if (!combo || combo.dataset.tzLanguageBound === 'true') return;

    combo.dataset.tzLanguageBound = 'true';
    combo.addEventListener('change', function () {
      setLanguageCookie(combo.value);
    });
  }

  // Monitor changes
  document.addEventListener('DOMContentLoaded', function () {
    watchLanguageCombo();
    const comboPoll = setInterval(watchLanguageCombo, 300);
    window.setTimeout(function () {
      clearInterval(comboPoll);
    }, 10000);

    const observer = new MutationObserver(function () {
      watchLanguageCombo();

      const iframe = document.querySelector('iframe.goog-te-menu-frame');
      if (!iframe) return;

      iframe.contentWindow.document.querySelectorAll('.goog-te-menu2-item span.text').forEach(function (el) {
        el.addEventListener('click', function () {
          const lang = el.innerHTML.trim().toLowerCase();
          setLanguageCookie(lang);
        });
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });
  });

  
  function customizeGoogleTranslateLabel() {
    const interval = setInterval(() => {
      const selectEl = document.querySelector('#google_translate_element select');
      if (selectEl) {
        const firstOption = selectEl.querySelector('option');
        if (firstOption && firstOption.innerHTML.includes('Select Language')) {
          firstOption.innerHTML = 'English'; // Change this to whatever you want
          clearInterval(interval);
        }
      }
    }, 100); // check every 100ms
  }

  window.addEventListener('load', customizeGoogleTranslateLabel);
