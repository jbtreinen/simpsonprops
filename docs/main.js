// Offer form. Leads go to FormSubmit, which emails them to Zach.
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

  function valid() {
    var first = null;
    form.querySelectorAll("[required]").forEach(function (el) {
      var v = el.value.trim();
      var good = v !== "" &&
        (el.type !== "tel" || v.replace(/\D/g, "").length >= 10) &&
        (el.name !== "zip" || /^\d{5}$/.test(v));
      el.classList.toggle("invalid", !good);
      el.setAttribute("aria-invalid", good ? "false" : "true");
      if (!good && !first) first = el;
    });
    if (first) first.focus();
    return !first;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!valid()) return;
    var data = Object.fromEntries(new FormData(form).entries());
    if (data._honey) return;
    delete data._honey;
    var full = [data.address, data.address2, data.city, data.state + " " + data.zip].filter(Boolean).join(", ");
    Object.assign(data, utm, {
      _subject: "New seller lead: " + full,
      _template: "table",
      full_address: full,
      page: location.pathname,
      submitted: new Date().toLocaleString()
    });
    var btn = form.querySelector("button[type=submit]");
    btn.disabled = true; btn.textContent = "Sending...";
    fetch("https://formsubmit.co/ajax/simpson.propsllc@gmail.com", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(data)
    }).then(function (r) {
      if (!r.ok) throw new Error(r.status);
      location.href = "/thank-you/";
    }).catch(function () {
      btn.disabled = false; btn.textContent = "Get my cash offer";
      form.querySelector(".form-error").hidden = false;
    });
  });

  function sessionStorageGet(k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } }
  function sessionStorageSet(k, v) { try { sessionStorage.setItem(k, v); } catch (e) {} }
})();
