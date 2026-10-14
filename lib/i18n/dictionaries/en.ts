import type { Dictionary } from "./ro";

const en: Dictionary = {
  meta: {
    siteTitle: "5SOLA.RO — Bible Conferences & Theological Resources",
    siteDescription:
      "The 5 Sola Association organizes Bible conferences and provides theological resources grounded in the five Solas of the Protestant Reformation. A Reformed ministry in Romania.",
    ogDescription:
      "The 5 Sola Association organizes Bible conferences and provides theological resources grounded in the five Solas of the Protestant Reformation.",
    twitterDescription:
      "Bible conferences and theological resources grounded in the five Solas of the Protestant Reformation.",
    ogImageAlt: "5SOLA.RO — The 5 Sola Association",
    keywords: [
      "5 sola",
      "5 sola association",
      "protestant reformation",
      "bible conference",
      "reformed theology",
      "Romania",
      "sola scriptura",
      "sola fide",
      "sola gratia",
      "solus christus",
      "soli deo gloria",
      "christian conferences romania",
      "biblical theology",
      "5sola.ro",
    ],
    organizationName: "The 5 Sola Association",
    organizationDescription:
      "The 5 Sola Association organizes Bible conferences and provides theological resources grounded in the five Solas of the Protestant Reformation in Romania.",
  },

  nav: {
    home: "Home",
    about: "About Us",
    beliefs: "What We Believe",
    events: "Events",
    resources: "Resources",
    contact: "Contact",
    toggleMenu: "Open menu",
    toggleTheme: "Toggle theme",
    switchLanguage: "Treci la română",
  },

  footer: {
    tagline:
      "“In Support of the Church” — through theological resources, teaching faithful to Scripture, and conferences with seasoned speakers, the 5 Sola Association serves churches and believers in their spiritual growth.",
    usefulLinks: "Useful Links",
    contact: "Contact",
    rights: "The 5 Sola Association. All rights reserved.",
    madeBy: "Made with good intentions by",
    scriptureNotice:
      "Scripture quotations are from the ESV® Bible (The Holy Bible, English Standard Version®), © 2001 by Crossway. Used by permission. All rights reserved.",
  },

  common: {
    contactUs: "Contact Us",
    seeEvents: "See Events",
    registerNow: "Register Now",
    registerIndividual: "Individual Registration",
    registerFamily: "Family Registration",
    qa: "Questions & Answers",
    learnMore: "Learn More",
    seeDetails: "See Details",
    comingSoon: "Coming Soon",
    subscribeNow: "Subscribe Now",
    program: "Schedule",
    event: "Event",
    eventNotFound: "Event not found",
    programNotFound: "Schedule not found",
    pageNotFound: "Page not found",
    recordingsSoon: "Recordings will be available soon",
  },

  home: {
    metaTitle: "5SOLA.RO — Bible Conferences & Theological Resources in the Spirit of the Reformation",
    metaDescription:
      "The 5 Sola Association organizes Bible conferences and provides theological resources grounded in the five Solas of the Protestant Reformation. Join the Reformed community in Romania.",
    ogTitle: "5SOLA.RO — Bible Conferences & Theological Resources",
    ogDescription:
      "The 5 Sola Association organizes Bible conferences and provides theological resources grounded in the Protestant Reformation.",
    heroBgAlt: "Background",
    currentEvent: "Current Event",
    lastEvent: "Latest Event",
    noEventsNote:
      "We have no events scheduled at the moment. You can watch the recordings of our previous event.",
    watchRecordings: "Watch the Recordings",
    daysLabel: (n: number) =>
      n <= 1
        ? "A day devoted to the careful study of Scripture and Christian fellowship."
        : n === 2
          ? "Two days devoted to the careful study of Scripture and Christian fellowship."
          : `${n} days devoted to the careful study of Scripture and Christian fellowship.`,
    galleryAlt: "Gallery",
    missionLabel: "Our Mission",
    aboutTitle: "Who Are We?",
    aboutLead:
      "5 Sola is a ministry founded to serve the Church of Christ. We organize Bible conferences and provide theological resources that help believers understand the Holy Scriptures more deeply and grow in the faith.",
    aboutBody:
      "Our motto, “In Support of the Church,” reflects our commitment to stand alongside local churches and believers, offering resources and teaching grounded in the principles of the Reformation. Through our conferences we bring together experienced speakers with sound biblical knowledge to enrich the spiritual life of congregations. We rejoice to be instruments in God’s hand for the building up of the body of Christ.",
    aboutCta: "Discover our mission",
    quoteText:
      "For by grace you have been saved through faith. And this is not your own doing; it is the gift of God.",
    quoteRef: "Ephesians 2:8",
    calendarLabel: "Calendar",
    upcomingTitle: "Upcoming Events",
    recentTitle: "Recent Events",
    upcomingText:
      "Join us at our upcoming events as we explore together the depths of Christian theology.",
    recentText: "Explore our past conferences and the theological resources available.",
    allEvents: "See all events",
  },

  newsletter: {
    label: "Newsletter",
    title: "Stay Connected",
    text: "Subscribe to our newsletter to receive news about events, conferences, and theological resources.",
    placeholder: "Your email address",
    subscribed: "Subscribed",
    success: "You have subscribed successfully! Please check your email.",
    error: "Something went wrong. Please try again later.",
  },

  about: {
    metaTitle: "About Us — Mission & Team",
    metaDescription:
      "Meet the team and mission of the 5 Sola Association — a ministry devoted to recovering the truths of the Protestant Reformation in Romania. Our values, vision, and the men who serve.",
    keywords: [
      "5 sola association",
      "about us",
      "christian ministry romania",
      "5 sola team",
      "reformed theology romania",
      "reformed community",
      "protestant reformation",
      "sola scriptura romania",
    ],
    ogTitle: "About Us | 5SOLA.RO",
    ogDescription:
      "Meet the team and mission of the 5 Sola Association — a Reformed ministry devoted to the authority of Scripture and the centrality of Christ.",
    breadcrumb: "About Us",
    headingA: "About",
    headingB: "Us",
    lead: "The 5 Sola Association was born out of the desire of several pastors and ministers to meet a real need in the evangelical churches of Romania: the need for clear theological teaching anchored in Scripture.",
    body1:
      "United around the principles of the Reformation — the five “solas” — we seek to equip believers, to support local churches, and to promote the faithful proclamation of the gospel. Through conferences, resources, and theological initiatives, we labor to form a generation anchored in the Word of God.",
    body2:
      "We began in 2022 with a theological camp on “The Five Solas of the Reformation,” and since 2023 we have consistently held a national conference, a regional conference, and a conference for the Romanian diaspora each year.",
    missionLabel: "Our Mission",
    missionTitle: "We equip believers and strengthen the local church through faithful biblical teaching.",
    missionText:
      "Through conferences, resources, and theological initiatives, we serve local churches and promote the faithful proclamation of the gospel in Romania and in the diaspora.",
    visionLabel: "Our Vision",
    visionTitle:
      "A generation doctrinally formed, anchored in Scripture, and devoted to the clear proclamation of the gospel.",
    visionText:
      "We long to see the church revived through a return to the essential truths of the Christian faith, able to meet the challenges of our day with courage and wisdom.",
    valuesLabel: "Our Values",
    valuesTitleA: "Pillars of",
    valuesTitleB: "the Ministry",
    values: [
      {
        title: "The Authority of Scripture",
        desc: "The Bible is the Word of God — the only infallible authority for faith and life.",
      },
      {
        title: "The Clarity of the Gospel",
        desc: "The gospel of salvation by grace alone, through faith alone, in Christ alone must be proclaimed without compromise.",
      },
      {
        title: "The Centrality of Christ",
        desc: "Jesus Christ is the center of Scripture, of salvation, and of the whole Christian life.",
      },
      {
        title: "Holiness of Life",
        desc: "Genuine faith produces a transformed life, set apart from the world and devoted to God.",
      },
      {
        title: "The Local Church",
        desc: "The local church is the institution ordained by God for the growth and mission of believers.",
      },
    ],
    teamLabel: "Our Team",
    teamTitleA: "Men with",
    teamTitleB: "Vision",
    quoteText: "Sanctify them in the truth; Your word is truth.",
    quoteRef: "John 17:17",
  },

  beliefs: {
    metaTitle: "What We Believe — The Five Solas of the Reformation",
    metaDescription:
      "Explore the theological foundations of the 5 Sola Association: Sola Scriptura, Sola Fide, Sola Gratia, Solus Christus, Soli Deo Gloria — the five Solas of the Protestant Reformation.",
    keywords: [
      "sola scriptura",
      "sola fide",
      "sola gratia",
      "solus christus",
      "soli deo gloria",
      "five solas",
      "protestant reformation",
      "confession of faith",
      "reformed theology",
    ],
    ogTitle: "What We Believe — The Five Solas of the Reformation | 5SOLA.RO",
    ogDescription:
      "Sola Scriptura, Sola Fide, Sola Gratia, Solus Christus, Soli Deo Gloria — the theological foundations of the 5 Sola Association.",
    breadcrumb: "What We Believe",
    headingA: "What We",
    headingB: "Believe",
    lead: "The theological foundations that define our identity and mission, anchored in the tradition of the Protestant Reformation.",
    body: "Our faith is not a new one; it is a reaffirmation of the biblical truths that transformed the world five hundred years ago and remain just as relevant for men and women today.",
    pillarsLabel: "Pillars of the Reformation",
    solasTitleA: "The Five",
    solasTitleB: "Solas",
    confessionLabel: "Doctrinal Statement",
    confessionTitleA: "Our",
    confessionTitleB: "Confession",
    confession: `
# Doctrinal Statement

We believe that the Bible is the inspired, infallible, and sufficient Word of God, the supreme authority in every matter of faith and life. We believe in one God, eternally existing in three Persons: the Father, the Son, and the Holy Spirit. We believe that man is fallen in sin and unable to save himself by his own power.

We believe that salvation is by grace, through faith, in Jesus Christ alone, on the basis of His finished work. We believe in the new birth, in the progressive sanctification of the believer, and in the essential role of the local church as the body of Christ. We await the return of Christ and the final restoration of all things.
`,
    ctaTitleA: "Do you want to go deeper",
    ctaTitleB: "into these truths?",
    ctaText:
      "If you have questions about our confession of faith or would like to talk through theological matters, we are here for you.",
  },

  events: {
    metaTitle: "Events & Bible Conferences",
    metaDescription:
      "Bible conferences organized by the 5 Sola Association in Romania. Explore upcoming events and the archive of past conferences devoted to Reformed theology.",
    keywords: [
      "bible conferences romania",
      "theological conference",
      "reformed conference",
      "5 sola conference",
      "5 sola association events",
      "christian conferences",
      "reformed theology conference",
      "bible study conference",
    ],
    ogTitle: "Events & Bible Conferences | 5SOLA.RO",
    ogDescription:
      "Bible conferences in Romania with internationally respected speakers, devoted to the study of Scripture and Reformed theology.",
    breadcrumb: "Events",
    headingA: "Events",
    headingB: "Conferences",
    lead: "Explore our past and upcoming conferences, devoted to the careful study of Scripture and theological formation.",
    body: "Each event is designed as a place of learning, conversation, and worship, bringing together faithful speakers and a community that loves the truth.",
    tabUpcoming: "Upcoming Events",
    tabArchive: "Event Archive",
    empty: "There are currently no events in this category.",
    newsletterLabel: "Stay Connected",
    newsletterTitleA: "Don’t miss",
    newsletterTitleB: "an event",
    newsletterText:
      "Subscribe to our newsletter to be the first to hear about new conferences, registration periods, and newly published resources.",
  },

  event: {
    metaKeyword: "bible conference",
    metaKeywordTheology: "reformed theology",
    metaCountry: "Romania",
    speakersPrefix: "Speakers",
    back: "Back to events",
    seeProgram: "See the Schedule",
    videoArchive: "Video Archive",
    watchA: "Watch",
    watchB: "the recordings",
    freeOnYoutube: "All sessions are available free of charge on YouTube (in Romanian).",
    seeOnYoutube: "Watch on YouTube",
    recordingsSoon: "Recordings will be available soon.",
    about: "About the Event",
    speakers: "Guest Speakers",
    day: (n: number) => `Day ${n}`,
    fullProgram: "See the full schedule",
    location: "Location",
    seeOnMap: "View on map",
    backToEvent: "Back to event",
    programTitle: (title: string) => `Schedule — ${title}`,
    qaTitle: (title: string) => `Questions — ${title}`,
  },

  qa: {
    thanks: "Thank you!",
    sent: "Your question has been sent. The organizing team will put it to the speaker.",
    another: "Ask another question",
    yourQuestion: "Your question",
    askTitle: "Ask a question",
    askText: "Your question will be passed on to the organizing team and put to the speaker.",
    placeholder: "Write your question here...",
    sending: "Sending...",
    submit: "Send question",
  },

  resources: {
    metaTitle: "Resources — Theological Books and Journals",
    metaDescription:
      "Discover the theological resources promoted by the 5 Sola Association: the Ad Fontes journal and books translated by Corpus Reformatorum publishing house.",
    keywords: [
      "theological resources",
      "ad fontes journal",
      "romanian theological books",
      "corpus reformatorum",
      "reformed theology books",
      "sola scriptura book",
      "christian publications romania",
      "5 sola resources",
    ],
    ogTitle: "Resources | 5SOLA.RO",
    ogDescription:
      "The Ad Fontes journal and books — theological resources to equip believers and strengthen the local church.",
    breadcrumb: "Resources",
    heading: "Resources",
    lead: "Theological publications and books to equip believers and strengthen local churches.",
    bodyBefore: "Through the",
    bodyMiddle: "journal and the books we recommend, translated by",
    bodyAfter:
      ", we seek to place in the hands of Romanian believers a clear theology anchored in Scripture.",
    periodical: "Periodical",
    magazineTitleA: "The Journal",
    publisher: "Publisher",
    booksTitle: "Books",
    order: "Order",
    languageNote: "All publications listed here are in Romanian.",
    ctaTitleA: "Would you like to learn more",
    ctaTitleB: "about our ministry?",
    ctaText:
      "Attend one of our conferences or contact us for more details about the available resources.",
  },

  contact: {
    metaTitle: "Contact — The 5 Sola Association",
    metaDescription:
      "Contact the 5 Sola Association — we are happy to answer questions about conferences, partnerships, and theological resources. Email, phone, and social media.",
    keywords: [
      "contact 5 sola association",
      "5 sola association phone",
      "5 sola association email",
      "donate 5 sola",
      "theological partnership",
      "5sola.ro contact",
    ],
    ogTitle: "Contact | 5SOLA.RO",
    ogDescription:
      "Contact the 5 Sola Association with questions about Bible conferences, partnerships, or theological resources.",
    breadcrumb: "Contact",
    headingA: "Get in",
    headingB: "Touch",
    lead: "Do you have questions about our events or would you like to get involved in the work of the association? We would be glad to hear from you.",
    body: "Whether you are looking for theological resources, wish to propose a partnership, or simply want to know more about us, please do not hesitate to reach out using the form below.",
    infoLabel: "Contact Information",
    email: "Email",
    phone: "Phone",
    follow: "Follow Us",
    supportLabel: "Support the ministry",
    bankTitle: "Bank Accounts",
    holder: "Account holder",
    onlineDonation: "Online donation",
    onlineDonationText: "You can give quickly and securely by card via Stripe.",
    donate: (currency: string) => `Give (${currency})`,
    form: {
      sentTitle: "Message Sent!",
      sentText: "Thank you for your message. Our team will get back to you as soon as possible.",
      sendAnother: "Send another message",
      name: "Full Name",
      namePlaceholder: "e.g. John Smith",
      email: "Email Address",
      emailPlaceholder: "e.g. john@example.com",
      subject: "Subject",
      subjectPlaceholder: "How can we help?",
      message: "Message",
      messagePlaceholder: "Write your message here...",
      submit: "Send Message",
      error: "Something went wrong. Please try again.",
    },
  },

  notFound: {
    label: "Error 404",
    titleA: "Page Not",
    titleB: "Found",
    text: "We are sorry, but the page you are looking for does not exist or has been moved. Please return to the home page.",
    home: "Home Page",
  },
};

export default en;
