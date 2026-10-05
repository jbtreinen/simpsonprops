// Two-step offer form. Leads go to FormSubmit, which emails them to Zach.
(function () {
  var params = new URLSearchParams(location.search);
  // Remember ad/source info on any landing page so each lead shows where it came from.
  var utm = {};
  ["utm_source", "utm_medium", "utm_campaign", "utm_term", "gclid"].forEach(function (k) {
    var v = params.get(k) || sessionStorageGet(k);
    if (v) { utm[k] = v; sessionStorageSet(k, v); }
  });

  var form = document.getElementById("offer");
  if (!form) return;
  var addr = params.get("address");
  if (addr) form.address.value = addr;

  var steps = form.querySelectorAll("fieldset");
  var bar = form.querySelector(".progress span");

  function valid(step) {
    var ok = true;
    step.querySelectorAll("[required]").forEach(function (el) {
      var good = el.value.trim() !== "" && (el.type !== "tel" || el.value.replace(/\D/g, "").length >= 10);
      el.classList.toggle("invalid", !good);
      if (!good && ok) { el.focus(); ok = false; }
    });
    return ok;
  }
  function show(i) {
    steps.forEach(function (s, j) { s.hidden = j !== i; });
    bar.style.width = i === 0 ? "50%" : "100%";
    var first = steps[i].querySelector("input,select");
    if (first) first.focus();
  }
  form.querySelector("[data-next]").addEventListener("click", function () { if (valid(steps[0])) show(1); });
  form.querySelector("[data-back]").addEventListener("click", function () { show(0); });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!valid(steps[0])) return show(0);
    if (!valid(steps[1])) return;
    var data = Object.fromEntries(new FormData(form).entries());
    if (data._honey) return;
    delete data._honey;
    Object.assign(data, utm, {
      _subject: "New seller lead: " + data.address,
      _template: "table",
      page: location.pathname,
      submitted: new Date().toLocaleString()
    });
    var btn = form.querySelector("button[type=submit]");
    btn.disabled = true; btn.textContent = "Sending...";
    fetch("https://formsubmit.co/ajax/simpsonpropsllc@gmail.com", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(data)
    }).then(function (r) {
      if (!r.ok) throw new Error(r.status);
      location.href = "/thank-you/";
    }).catch(function () {
      btn.disabled = false; btn.textContent = "Get my offer";
      form.querySelector(".form-error").hidden = false;
    });
  });

  function sessionStorageGet(k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } }
  function sessionStorageSet(k, v) { try { sessionStorage.setItem(k, v); } catch (e) {} }
})();
