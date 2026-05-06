(function () {
  "use strict";

  const businessData = {
  "enableLocalBusiness": true,
  "schemaType": "HomeAndConstructionBusiness",
  "businessName": "Eletro10",
  "businessDescription": "A Eletro 10 é especializada em assistência técnica de máquinas de lavar e lava e seca na região da Ceilândia e Distrito Federal. Oferecemos atendimento profissional em domicílio, priorizando a segurança, eficiência e a durabilidade do seu eletrodoméstico. Realizamos diagnósticos precisos, manutenções preventivas e corretivas, além de higienização técnica completa. Atendemos as principais marcas do mercado, focando em soluções que evitam trocas desnecessárias e prolongam a vida útil do equipamento. Seja para resolver problemas de drenagem, ruídos excessivos ou falhas de funcionamento, nossa equipe atua com total transparência e agilidade. Conte com a Eletro 10 para um serviço confiável e técnico na porta da sua casa",
  "siteUrl": "https://www.eletro10brasilia.com.br/",
  "priceRange": "$$$",
  "mainKeyword": "Assitencia tecnica maquina de lavar",
  "mainCity": "Brasilia",
  "mainState": "Distrito Federal",
  "mainCountry": "Brasil",
  "logoUrl": "https://www.eletro10brasilia.com.br/assets/images/logo/logo.png",
  "mainImageUrl": "",
  "altImageUrl": "",
  "imageAltText": "",
  "phone": "061984073345",
  "whatsapp": "",
  "email": "",
  "supportName": "",
  "contactType": "sales",
  "streetAddress": "St. O QNO 3 - Ceilândia, Brasília - DF, 72250-301",
  "neighborhood": "Ceilândia",
  "addressCity": "Brasília",
  "addressState": "Distrito Federal",
  "postalCode": "72250-301",
  "addressCountry": "BR",
  "latitude": "15.794057",
  "longitude": "48.125871",
  "instagram": "",
  "facebook": "",
  "youtube": "",
  "linkedin": "",
  "tiktok": "",
  "pinterest": "",
  "twitter": "",
  "googleBusiness": "https://maps.app.goo.gl/eavWnLS9UobFwQmE6",
  "extraSameAs": [],
  "hours": [
    {
      "day": "Mo",
      "enabled": true,
      "open": "08:00",
      "close": "18:00"
    },
    {
      "day": "Tu",
      "enabled": true,
      "open": "08:00",
      "close": "18:00"
    },
    {
      "day": "We",
      "enabled": true,
      "open": "08:00",
      "close": "18:00"
    },
    {
      "day": "Th",
      "enabled": true,
      "open": "08:00",
      "close": "18:00"
    },
    {
      "day": "Fr",
      "enabled": true,
      "open": "08:00",
      "close": "18:00"
    },
    {
      "day": "Sa",
      "enabled": true,
      "open": "08:00",
      "close": "12:00"
    },
    {
      "day": "Su",
      "enabled": false,
      "open": "08:00",
      "close": "12:00"
    }
  ],
  "services": [
    {
      "name": "Assistência técnica de máquina de lavar",
      "description": "Atendimento especializado para manutenção de máquina de lavar e lava e seca em Brasília e região.",
      "areaServed": "Brasília, Asa Norte, Asa Sul, Águas Claras",
      "url": ""
    }
  ],
  "faqs": [
    {
      "question": "Vocês atendem em toda a cidade de brasilia?",
      "answer": "Sim, o atendimento cobre a cidade de brasilia, ceiladia e toda regiao"
    }
  ]
};

  function addJsonLd(schema) {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(schema, null, 2);
    document.head.appendChild(script);
  }

  function clean(value) {
    if (Array.isArray(value)) {
      const items = value.map(clean).filter(Boolean);
      return items.length ? items : undefined;
    }

    if (value && typeof value === "object") {
      const output = {};
      Object.keys(value).forEach(function (key) {
        const cleaned = clean(value[key]);
        if (cleaned !== undefined && cleaned !== "" && !(Array.isArray(cleaned) && !cleaned.length)) {
          output[key] = cleaned;
        }
      });
      return Object.keys(output).length ? output : undefined;
    }

    return value === "" || value === null ? undefined : value;
  }

  function sameAs() {
    return [
      businessData.instagram,
      businessData.facebook,
      businessData.youtube,
      businessData.linkedin,
      businessData.tiktok,
      businessData.pinterest,
      businessData.twitter,
      businessData.googleBusiness
    ].concat(businessData.extraSameAs || []).filter(Boolean);
  }

  function openingHours() {
    const order = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
    const selected = (businessData.hours || [])
      .filter(function (item) { return item.enabled && item.open && item.close; })
      .sort(function (a, b) { return order.indexOf(a.day) - order.indexOf(b.day); });
    const groups = [];

    selected.forEach(function (item) {
      const last = groups[groups.length - 1];
      const previousDay = last && last.days[last.days.length - 1];
      if (last && last.open === item.open && last.close === item.close && order.indexOf(item.day) === order.indexOf(previousDay) + 1) {
        last.days.push(item.day);
      } else {
        groups.push({ days: [item.day], open: item.open, close: item.close });
      }
    });

    return groups.map(function (group) {
      const days = group.days.length > 1 ? group.days[0] + "-" + group.days[group.days.length - 1] : group.days[0];
      return days + " " + group.open + "-" + group.close;
    });
  }

  function identity() {
    return clean({
      "@type": businessData.schemaType || "LocalBusiness",
      name: businessData.businessName,
      url: businessData.siteUrl
    });
  }

  function address() {
    return clean({
      "@type": "PostalAddress",
      streetAddress: businessData.streetAddress,
      addressLocality: businessData.addressCity || businessData.mainCity,
      addressRegion: businessData.addressState || businessData.mainState,
      postalCode: businessData.postalCode,
      addressCountry: businessData.addressCountry || businessData.mainCountry,
      addressNeighborhood: businessData.neighborhood
    });
  }

  function contactPoint() {
    return clean({
      "@type": "ContactPoint",
      telephone: businessData.phone,
      email: businessData.email,
      contactType: businessData.contactType,
      name: businessData.supportName,
      availableLanguage: ["Portuguese", "pt-BR"]
    });
  }

  function areas() {
    const names = {};
    if (businessData.mainCity) names[businessData.mainCity] = true;
    (businessData.services || []).forEach(function (service) {
      String(service.areaServed || "").split(",").forEach(function (area) {
        const value = area.trim();
        if (value) names[value] = true;
      });
    });
    return Object.keys(names).map(function (name) { return { "@type": "Place", name: name }; });
  }

  const schemas = [];
  const links = sameAs();
  const hours = openingHours();
  const images = [businessData.mainImageUrl, businessData.altImageUrl].filter(Boolean);

  if (businessData.enableLocalBusiness) {
    schemas.push(clean({
      "@context": "https://schema.org",
      "@type": businessData.schemaType || "LocalBusiness",
      name: businessData.businessName,
      description: businessData.businessDescription,
      url: businessData.siteUrl,
      logo: businessData.logoUrl,
      image: images,
      telephone: businessData.phone,
      email: businessData.email,
      priceRange: businessData.priceRange,
      address: address(),
      geo: businessData.latitude && businessData.longitude ? {
        "@type": "GeoCoordinates",
        latitude: Number(businessData.latitude),
        longitude: Number(businessData.longitude)
      } : undefined,
      openingHours: hours,
      sameAs: links,
      areaServed: areas(),
      contactPoint: contactPoint(),
      keywords: [businessData.mainKeyword, businessData.mainCity, businessData.mainState].filter(Boolean).join(", ")
    }));
  }

  schemas.push(clean({
    "@context": "https://schema.org",
    "@type": "Organization",
    name: businessData.businessName,
    url: businessData.siteUrl,
    logo: businessData.logoUrl,
    sameAs: links,
    contactPoint: contactPoint()
  }));

  schemas.push(clean({
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: businessData.businessName,
    url: businessData.siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: businessData.siteUrl.replace(/\/+$/, "") + "/?s={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  }));

  schemas.push(clean({
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: businessData.businessName,
    description: businessData.businessDescription,
    url: businessData.siteUrl,
    isPartOf: {
      "@type": "WebSite",
      name: businessData.businessName,
      url: businessData.siteUrl
    },
    about: identity()
  }));

  const services = (businessData.services || [])
    .filter(function (service) { return service.name; })
    .map(function (service, index) {
      return clean({
        "@type": "Service",
        position: index + 1,
        serviceType: service.name,
        name: service.name,
        description: service.description,
        areaServed: String(service.areaServed || "").split(",").map(function (area) {
          return area.trim();
        }).filter(Boolean).map(function (area) {
          return { "@type": "Place", name: area };
        }),
        url: service.url,
        provider: identity()
      });
    });

  if (services.length) {
    schemas.push(clean({
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Serviços - " + businessData.businessName,
      itemListElement: services
    }));
  }

  const faqs = (businessData.faqs || [])
    .filter(function (faq) { return faq.question && faq.answer; })
    .map(function (faq) {
      return {
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer
        }
      };
    });

  if (faqs.length) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs
    });
  }

  schemas.push(clean({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: businessData.siteUrl
      },
      {
        "@type": "ListItem",
        position: 2,
        name: businessData.businessName,
        item: businessData.siteUrl
      }
    ]
  }));

  schemas.filter(Boolean).forEach(addJsonLd);
})();
