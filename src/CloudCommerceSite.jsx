import React, { useState, useEffect, useRef, createContext, useContext } from "react";

/* ============================================================
   CloudCommerce — customer marketing site
   Routes: home · platform · solutions · products (+ 4 BU) · contact
   Design: CI-grounded. Cool infrastructural palette, cream bg,
   Inter, "connective thread" as signature device.
   FastShip orange is quarantined to the FastShip page only.
   ============================================================ */

// ---------- tokens ----------
const C = {
  cream: "#F5F4EF",
  cream2: "#EFEDE6",
  ink: "#0E1B2C",       // near-black navy for text
  navy: "#1A3260",
  blue: "#2D5BE3",
  teal: "#3ECFB2",
  tealDeep: "#2BB6A0",
  mute: "#5B6B7F",
  line: "#DIVIDER",     // placeholder, overwritten below
  orange: "#F4622A",    // FastShip only
  mall: "#3BA9F4",      // CloudMall
};
C.line = "rgba(26,50,96,0.14)";
const white = "#FFFFFF";

// ---------- i18n ----------
const T = {
  en: {
    nav: { platform: "Platform", solutions: "Solutions", products: "Products", about: "About Us", contact: "Contact", cta: "Talk to our team", navCta: "Contact Us" },
    home: {
      eyebrow: "SHIP · SELL · SCALE",
      h1a: "Take your brand ",
      h1b: "to the world",
      h1c: " — without building the infrastructure.",
      sub: "CloudCommerce is the operating system for Southeast Asia's cross-border e-commerce. One stack to ship, sell, and scale into the world's biggest markets — the logistics, the technology, and the demand, already built.",
      ctaPrimary: "Talk to our team",
      ctaSecondary: "See the platform",
      metrics: [["1M+", "Shipments"], ["70K+", "Sellers"], ["100+", "Countries"], ["Profitable", "and growing"]],
      wallsTitle: "A problem we've lived for 20 years.",
      wallsSub: "CloudCommerce was born from a Thai brand selling to the world since 2002. Every wall it hit then, Southeast Asian sellers still hit today.",
      walls: [
        ["The cost wall", "Logistics", "Enterprise shipping rates are locked behind volume you don't have yet."],
        ["The operations wall", "Channels", "Every marketplace, order, and inventory feed runs in a different silo."],
        ["The demand wall", "Marketing", "Finding customers abroad means starting from zero in every market."],
      ],
      wallsClose: "Twenty years later, sellers still fight all three — separately, with a dozen disconnected vendors. So we built the one stack every seller wishes they had.",
      stackTitle: "One stack. Three moves.",
      stackSub: "Each stage earns the customer. The next stage grows them. That's why value per customer compounds.",
      stack: [
        ["SHIP", "Move product across borders at rates and reliability you couldn't get alone.", "FastShip"],
        ["SELL", "Run every order, channel, and customer relationship from one intelligent platform.", "CONNEX"],
        ["SCALE", "Grow demand through creators, then let a distribution network sell for you.", "KOLLAB · CloudMall"],
      ],
      solTease: "Solutions built around where you are.",
      solTeaseSub: "We bundle the right products for your stage and goal — so you start with one outcome, not a shopping list.",
      solSeeAll: "Explore solutions",
      serveTitle: "Wherever you are, we meet you there.",
      serveSub: "From first-time exporters to established brands — one stack that fits how you sell today and how you'll grow tomorrow.",
      finalTitle: "Let's take your brand further.",
      finalSub: "Ship, sell, and scale to the world — from one platform.",
    },
    platform: {
      eyebrow: "PLATFORM",
      h1: "One partner that grows with you.",
      sub: "Start with one service. Grow into a business that runs — and expands — on a single connected stack. No re-platforming, no rebuild, no dozen vendors.",
      flywheelTitle: "Every step makes your next one easier.",
      flywheelSub: "The flywheel: each product feeds the next, and the customer relationship compounds.",
      rentTitle: "Rent the traffic. Own the customer.",
      rentSub: "Start on the marketplaces to prove demand, then graduate to your own store to keep the margin, the data, and the relationship — on the same system, so you never rebuild.",
      rentLeft: ["Marketplace", "Ready traffic, a fast test — but fees, and no customer data.", "Amazon · eBay · Shopify · TikTok Shop"],
      rentRight: ["D2C · your own store", "Your margin, your customer data, your brand — captured for good.", "CONNEX Global Sales Page"],
      rentClose: "One system runs both, so going global is a setting — not a rebuild.",
    },
    solutions: {
      eyebrow: "SOLUTIONS",
      h1: "Solutions built around your goal.",
      sub: "Every solution is a ready bundle of CloudCommerce products, integrated and running together — matched to where your business is and what you're trying to do next.",
      byStage: "By where you are",
      byGoal: "By what you want to do",
      insideLabel: "Inside this solution",
      cta: "Talk to us about this",
    },
    products: {
      eyebrow: "PRODUCTS",
      h1: "The products inside the platform.",
      sub: "Four platforms, one connected stack. Use one, or let them compound together.",
      learn: "Explore",
    },
    about: {
      eyebrow: "ABOUT US",
      h1: "Bangkok-built, world-bound.",
      sub: "CloudCommerce began as a Thai brand fighting to reach the world. Two decades later, we've turned everything we learned into the stack we wish we'd had — and opened it to every seller.",
      profile: [
        ["2002", "Founded"],
        ["Bangkok", "Headquarters"],
        ["70K+", "Sellers served"],
        ["100+", "Markets reached"],
      ],
      storyLabel: "OUR STORY",
      storyTitle: "A problem we lived, then solved.",
      storyBody: [
        "In 2002, we were a Thai brand with a product the world wanted and no way to reach it. Enterprise shipping rates were locked behind volume we didn't have. Every marketplace ran in its own silo. Finding customers abroad meant starting from zero in every market.",
        "So we built our own way through — the logistics contracts, the technology, the demand engine. What started as survival became infrastructure. And we realized every Southeast Asian seller was hitting the exact same walls.",
        "CloudCommerce is that infrastructure, opened up: one connected stack to ship, sell, and scale across borders — so the next brand doesn't have to build it alone.",
      ],
      timelineLabel: "JOURNEY",
      timelineTitle: "Twenty years, one throughline.",
      timeline: [
        ["2002", "A Thai brand goes global", "We start exporting a homegrown product to the world — and hit every cross-border wall firsthand."],
        ["2008", "Logistics, unlocked", "Years of volume earn the enterprise shipping rates and customs expertise most sellers never reach."],
        ["2015", "One platform to run it all", "We build the technology to manage every order, channel, and customer from a single system."],
        ["2020", "The stack becomes a product", "FastShip, CONNEX, KOLLAB, and CloudMall launch — the tools we built for ourselves, opened to every seller."],
        ["Today", "The OS for cross-border commerce", "1M+ shipments, 70K+ sellers, 100+ countries — profitable, and growing."],
      ],
      valuesLabel: "WHAT WE BELIEVE",
      valuesTitle: "What we stand for.",
      values: [
        ["Built from the trenches", "Every product solves a wall we hit ourselves. We ship what works, not theory."],
        ["One connected stack", "Ship, sell, and scale on a single system — no re-platforming, no dozen vendors."],
        ["Sellers first, always", "When our sellers grow, we grow. Value compounds on both sides of the relationship."],
        ["Bangkok to the world", "Southeast Asian roots, global ambition. We meet sellers where they are and grow with them."],
      ],
    },
    contact: {
      eyebrow: "LET'S TALK",
      h1: "Let's take your brand further.",
      sub: "Tell us about your brand and where you want to go. Our team will map the right stack for your stage — usually within one business day.",
      fields: {
        name: "Your name", company: "Company / brand", email: "Work email",
        sells: "What do you sell?", volume: "Monthly shipping volume", goal: "What's your main goal?", msg: "Anything else? (optional)",
      },
      volumes: ["Just starting out", "Under 1,000 / mo", "1,000–10,000 / mo", "10,000–50,000 / mo", "50,000+ / mo"],
      goals: ["Go global with my brand", "Scale across channels without chaos", "Cut logistics cost & customs", "Grow demand with creators", "Become a supplier / distribute", "Not sure yet — advise me"],
      submit: "Send message",
      done: "Thanks — we've got it.",
      doneSub: "Our team will be in touch shortly. In the meantime, feel free to explore the platform.",
      contactLine: "Prefer to chat? Reach us on LINE @connex.co or visit cloudcommerce.co",
    },
    footer: { tagline: "The operating system for cross-border e-commerce.", rights: "CloudCommerce Group. Bangkok-built, world-bound." },
  },
  th: {
    nav: { platform: "แพลตฟอร์ม", solutions: "โซลูชัน", products: "ผลิตภัณฑ์", about: "เกี่ยวกับเรา", contact: "ติดต่อเรา", cta: "คุยกับทีมงาน", navCta: "ติดต่อเรา" },
    home: {
      eyebrow: "SHIP · SELL · SCALE",
      h1a: "พาแบรนด์ของคุณ",
      h1b: "สู่ตลาดโลก",
      h1c: " — โดยไม่ต้องสร้างโครงสร้างพื้นฐานเอง",
      sub: "CloudCommerce คือระบบปฏิบัติการสำหรับอีคอมเมิร์ซข้ามพรมแดนของเอเชียตะวันออกเฉียงใต้ ครบทั้งการขนส่ง ระบบจัดการ และการสร้างดีมานด์ ในสแตกเดียว — พร้อมให้คุณส่ง ขาย และเติบโตสู่ตลาดที่ใหญ่ที่สุดในโลก",
      ctaPrimary: "คุยกับทีมงาน",
      ctaSecondary: "ดูแพลตฟอร์ม",
      metrics: [["1M+", "พัสดุ"], ["70K+", "ผู้ขาย"], ["100+", "ประเทศ"], ["ทำกำไร", "และเติบโต"]],
      wallsTitle: "ปัญหาที่เราเจอมา 20 ปี",
      wallsSub: "CloudCommerce เกิดจากแบรนด์ไทยที่ขายทั่วโลกมาตั้งแต่ปี 2002 กำแพงทุกด้านที่เราเคยเจอ ผู้ขายในภูมิภาคยังเจออยู่ทุกวันนี้",
      walls: [
        ["กำแพงต้นทุน", "โลจิสติกส์", "เรตค่าส่งระดับองค์กรถูกล็อกไว้หลังปริมาณที่คุณยังไม่มี"],
        ["กำแพงการดำเนินงาน", "ช่องทางขาย", "ทุกมาร์เก็ตเพลส ทุกออเดอร์ ทุกสต็อก แยกกันคนละระบบ"],
        ["กำแพงดีมานด์", "การตลาด", "การหาลูกค้าต่างประเทศคือการเริ่มจากศูนย์ในทุกตลาด"],
      ],
      wallsClose: "ยี่สิบปีผ่านไป ผู้ขายยังต้องสู้ทั้งสามกำแพง — แยกกัน กับผู้ให้บริการนับสิบเจ้าที่ไม่เชื่อมกัน เราจึงสร้างสแตกเดียวที่ผู้ขายทุกคนอยากมี",
      stackTitle: "หนึ่งสแตก สามก้าว",
      stackSub: "แต่ละก้าวได้ลูกค้ามา ก้าวถัดไปทำให้เขาโต นั่นคือเหตุผลที่มูลค่าต่อลูกค้าทบต้น",
      stack: [
        ["SHIP", "ส่งสินค้าข้ามพรมแดนด้วยเรตและความน่าเชื่อถือที่คุณหาเองไม่ได้", "FastShip"],
        ["SELL", "จัดการทุกออเดอร์ ทุกช่องทาง และความสัมพันธ์ลูกค้า จากแพลตฟอร์มอัจฉริยะเดียว", "CONNEX"],
        ["SCALE", "สร้างดีมานด์ผ่านครีเอเตอร์ แล้วให้เครือข่ายจัดจำหน่ายขายแทนคุณ", "KOLLAB · CloudMall"],
      ],
      solTease: "โซลูชันที่ออกแบบตามจุดที่คุณอยู่",
      solTeaseSub: "เราจัดชุดผลิตภัณฑ์ที่เหมาะกับสเตจและเป้าหมายของคุณ — เริ่มจากผลลัพธ์ ไม่ใช่รายการสินค้า",
      solSeeAll: "ดูโซลูชันทั้งหมด",
      serveTitle: "ไม่ว่าคุณอยู่จุดไหน เราพร้อมอยู่ตรงนั้นกับคุณ",
      serveSub: "ตั้งแต่ผู้ส่งออกครั้งแรกจนถึงแบรนด์ที่เติบโตแล้ว — หนึ่งสแตกที่เข้ากับวิธีขายวันนี้และการเติบโตในวันหน้า",
      finalTitle: "พาแบรนด์ของคุณไปให้ไกลกว่าเดิม",
      finalSub: "ส่ง ขาย และเติบโตสู่ตลาดโลก — จากแพลตฟอร์มเดียว",
    },
    platform: {
      eyebrow: "แพลตฟอร์ม",
      h1: "พาร์ทเนอร์เดียวที่โตไปกับคุณ",
      sub: "เริ่มจากบริการเดียว แล้วเติบโตเป็นธุรกิจที่รัน — และขยาย — บนสแตกเดียวที่เชื่อมกัน ไม่ต้องเปลี่ยนระบบ ไม่ต้องสร้างใหม่ ไม่ต้องมีผู้ให้บริการนับสิบเจ้า",
      flywheelTitle: "ทุกก้าวทำให้ก้าวต่อไปง่ายขึ้น",
      flywheelSub: "ฟลายวีล: แต่ละผลิตภัณฑ์ป้อนให้อีกตัว และความสัมพันธ์ลูกค้าก็ทบต้น",
      rentTitle: "เช่าทราฟฟิก เป็นเจ้าของลูกค้า",
      rentSub: "เริ่มบนมาร์เก็ตเพลสเพื่อพิสูจน์ดีมานด์ แล้วขยับไปหน้าร้านของคุณเองเพื่อรักษามาร์จิน ดาต้า และความสัมพันธ์ — บนระบบเดียวกัน คุณจึงไม่ต้องสร้างใหม่",
      rentLeft: ["มาร์เก็ตเพลส", "ทราฟฟิกพร้อม ทดสอบเร็ว — แต่มีค่าธรรมเนียม และไม่ได้ดาต้าลูกค้า", "Amazon · eBay · Shopify · TikTok Shop"],
      rentRight: ["D2C · ร้านของคุณเอง", "มาร์จินของคุณ ดาต้าลูกค้าของคุณ แบรนด์ของคุณ — เก็บไว้ถาวร", "CONNEX Global Sales Page"],
      rentClose: "ระบบเดียวรันทั้งสอง การไปตลาดโลกจึงเป็นแค่การตั้งค่า ไม่ใช่การสร้างใหม่",
    },
    solutions: {
      eyebrow: "โซลูชัน",
      h1: "โซลูชันที่ออกแบบรอบเป้าหมายของคุณ",
      sub: "ทุกโซลูชันคือชุดผลิตภัณฑ์ CloudCommerce ที่เชื่อมและทำงานร่วมกัน — จับคู่กับจุดที่ธุรกิจคุณอยู่และสิ่งที่คุณอยากทำต่อไป",
      byStage: "ตามจุดที่คุณอยู่",
      byGoal: "ตามสิ่งที่คุณอยากทำ",
      insideLabel: "ผลิตภัณฑ์ในโซลูชันนี้",
      cta: "คุยกับเราเรื่องนี้",
    },
    products: {
      eyebrow: "ผลิตภัณฑ์",
      h1: "ผลิตภัณฑ์ที่อยู่ในแพลตฟอร์ม",
      sub: "สี่แพลตฟอร์ม หนึ่งสแตกที่เชื่อมกัน ใช้ตัวเดียว หรือให้ทำงานทบต้นร่วมกัน",
      learn: "ดูเพิ่มเติม",
    },
    about: {
      eyebrow: "เกี่ยวกับเรา",
      h1: "สร้างในกรุงเทพฯ มุ่งสู่ตลาดโลก",
      sub: "CloudCommerce เริ่มต้นจากแบรนด์ไทยที่ต่อสู้เพื่อไปให้ถึงตลาดโลก สองทศวรรษต่อมา เรานำทุกสิ่งที่เรียนรู้มาสร้างเป็นสแตกที่เราเองอยากมีตั้งแต่แรก — และเปิดให้ผู้ขายทุกคน",
      profile: [
        ["2002", "ก่อตั้ง"],
        ["กรุงเทพฯ", "สำนักงานใหญ่"],
        ["70K+", "ผู้ขายที่ดูแล"],
        ["100+", "ตลาดที่เข้าถึง"],
      ],
      storyLabel: "เรื่องราวของเรา",
      storyTitle: "ปัญหาที่เราเจอเอง แล้วลงมือแก้",
      storyBody: [
        "ในปี 2002 เราคือแบรนด์ไทยที่มีสินค้าซึ่งโลกต้องการ แต่ไม่มีทางไปถึง เรตค่าส่งระดับองค์กรถูกล็อกไว้หลังปริมาณที่เรายังไม่มี ทุกมาร์เก็ตเพลสแยกกันคนละระบบ และการหาลูกค้าต่างประเทศคือการเริ่มจากศูนย์ในทุกตลาด",
        "เราจึงสร้างทางของเราเอง — สัญญาโลจิสติกส์ เทคโนโลยี และเครื่องมือสร้างดีมานด์ สิ่งที่เริ่มจากการเอาตัวรอดกลายเป็นโครงสร้างพื้นฐาน และเราพบว่าผู้ขายทั่วเอเชียตะวันออกเฉียงใต้เจอกำแพงเดียวกันทั้งหมด",
        "CloudCommerce คือโครงสร้างพื้นฐานนั้นที่เปิดให้ทุกคน สแตกเดียวที่เชื่อมกันเพื่อส่ง ขาย และเติบโตข้ามพรมแดน — เพื่อให้แบรนด์รุ่นต่อไปไม่ต้องสร้างมันขึ้นมาเองอย่างโดดเดี่ยว",
      ],
      timelineLabel: "เส้นทางของเรา",
      timelineTitle: "ยี่สิบปี หนึ่งเส้นทางเดียว",
      timeline: [
        ["2002", "แบรนด์ไทยสู่ตลาดโลก", "เราเริ่มส่งออกสินค้าไทยสู่ตลาดโลก — และเจอทุกกำแพงข้ามพรมแดนด้วยตัวเอง"],
        ["2008", "ปลดล็อกโลจิสติกส์", "ปริมาณที่สั่งสมหลายปีทำให้เราได้เรตระดับองค์กรและความเชี่ยวชาญด้านศุลกากรที่ผู้ขายส่วนใหญ่เข้าไม่ถึง"],
        ["2015", "แพลตฟอร์มเดียวรันทุกอย่าง", "เราสร้างเทคโนโลยีเพื่อจัดการทุกออเดอร์ ทุกช่องทาง และทุกลูกค้าจากระบบเดียว"],
        ["2020", "สแตกกลายเป็นผลิตภัณฑ์", "FastShip, CONNEX, KOLLAB และ CloudMall เปิดตัว — เครื่องมือที่เราสร้างให้ตัวเอง เปิดให้ผู้ขายทุกคน"],
        ["วันนี้", "ระบบปฏิบัติการสำหรับการค้าข้ามพรมแดน", "พัสดุกว่า 1 ล้านชิ้น ผู้ขายกว่า 70,000 ราย ครอบคลุมกว่า 100 ประเทศ — ทำกำไรและเติบโต"],
      ],
      valuesLabel: "สิ่งที่เราเชื่อ",
      valuesTitle: "สิ่งที่เรายึดมั่น",
      values: [
        ["สร้างจากสนามจริง", "ทุกผลิตภัณฑ์แก้กำแพงที่เราเจอเอง เราสร้างสิ่งที่ใช้ได้จริง ไม่ใช่ทฤษฎี"],
        ["สแตกเดียวที่เชื่อมกัน", "ส่ง ขาย และเติบโตบนระบบเดียว ไม่ต้องเปลี่ยนแพลตฟอร์ม ไม่ต้องมีผู้ให้บริการนับสิบเจ้า"],
        ["ผู้ขายมาก่อนเสมอ", "เมื่อผู้ขายของเราโต เราก็โต มูลค่าทบต้นทั้งสองฝ่าย"],
        ["จากกรุงเทพฯ สู่โลก", "รากเอเชียตะวันออกเฉียงใต้ ความมุ่งมั่นระดับโลก เราพร้อมอยู่ตรงจุดที่ผู้ขายอยู่และเติบโตไปด้วยกัน"],
      ],
    },
    contact: {
      eyebrow: "มาคุยกัน",
      h1: "พาแบรนด์ของคุณไปให้ไกลกว่าเดิม",
      sub: "เล่าให้เราฟังเกี่ยวกับแบรนด์และเป้าหมายของคุณ ทีมงานจะออกแบบสแตกที่เหมาะกับสเตจของคุณ — โดยปกติภายในหนึ่งวันทำการ",
      fields: {
        name: "ชื่อของคุณ", company: "บริษัท / แบรนด์", email: "อีเมลที่ทำงาน",
        sells: "คุณขายอะไร?", volume: "ปริมาณการส่งต่อเดือน", goal: "เป้าหมายหลักของคุณคือ?", msg: "อื่นๆ (ไม่บังคับ)",
      },
      volumes: ["เพิ่งเริ่มต้น", "ต่ำกว่า 1,000 / เดือน", "1,000–10,000 / เดือน", "10,000–50,000 / เดือน", "50,000+ / เดือน"],
      goals: ["พาแบรนด์ไปตลาดโลก", "ขยายหลายช่องทางแบบไม่วุ่นวาย", "ลดต้นทุนโลจิสติกส์และภาษี", "สร้างดีมานด์กับครีเอเตอร์", "เป็นซัพพลายเออร์ / จัดจำหน่าย", "ยังไม่แน่ใจ — ช่วยแนะนำ"],
      submit: "ส่งข้อความ",
      done: "ขอบคุณ — เราได้รับแล้ว",
      doneSub: "ทีมงานจะติดต่อกลับเร็วๆ นี้ ระหว่างนี้เชิญสำรวจแพลตฟอร์มได้เลย",
      contactLine: "อยากคุยเลย? ทัก LINE @connex.co หรือเยี่ยมชม cloudcommerce.co",
    },
    footer: { tagline: "ระบบปฏิบัติการสำหรับอีคอมเมิร์ซข้ามพรมแดน", rights: "CloudCommerce Group · สร้างในกรุงเทพฯ มุ่งสู่ตลาดโลก" },
  },
};

// ---------- product + solution data ----------
const PRODUCTS = {
  fastship: {
    name: "FastShip", tag: { en: "SHIP · cross-border logistics", th: "SHIP · โลจิสติกส์ข้ามพรมแดน" },
    accent: C.orange, wordmark: "FASTSHIP",
    blurb: {
      en: "Aggregated cross-border logistics — big-player rates and reliability, without the volume requirement.",
      th: "โลจิสติกส์ข้ามพรมแดนแบบรวมกำลัง — เรตและความน่าเชื่อถือระดับรายใหญ่ โดยไม่ต้องมีปริมาณขั้นต่ำ",
    },
    hero: { en: "All your cross-border shipping. One platform.", th: "การส่งข้ามพรมแดนทั้งหมดของคุณ ในแพลตฟอร์มเดียว" },
    features: {
      en: [
        ["Landed-cost & duty engine", "HS-code classification, per-line duty and tariff calculation, automated customs clearance."],
        ["EasyExpress consolidation", "Many B2C parcels become one B2B-style shipment: clear once, deliver many."],
        ["Multi-channel integrations", "Orders flow in from Shopify, Amazon, Etsy, and TikTok Shop, straight into the shipping flow."],
        ["Tracking & visibility", "Unified real-time tracking across every carrier and channel."],
        ["FastBox fulfillment", "Offshore fulfillment and cross-docking, asset-light and built-in."],
        ["FastFreight B2B", "Bulk air and sea freight forwarding for brands going global at scale."],
      ],
      th: [
        ["เครื่องคำนวณ Landed-cost & ภาษี", "จำแนกพิกัด HS คำนวณอากรและภาษีต่อบรรทัด และเคลียร์ศุลกากรอัตโนมัติ"],
        ["การรวมพัสดุ EasyExpress", "รวมพัสดุ B2C หลายชิ้นเป็นการส่งแบบ B2B: เคลียร์ครั้งเดียว ส่งได้หลายชิ้น"],
        ["เชื่อมต่อหลายช่องทาง", "ออเดอร์จาก Shopify, Amazon, Etsy และ TikTok Shop ไหลเข้าสู่ระบบส่งโดยตรง"],
        ["ติดตามและมองเห็นทุกขั้นตอน", "ติดตามแบบเรียลไทม์รวมทุกขนส่งและทุกช่องทาง"],
        ["FastBox ฟูลฟิลเมนต์", "ฟูลฟิลเมนต์และ cross-docking นอกประเทศ แบบ asset-light ในตัว"],
        ["FastFreight B2B", "การขนส่งทางอากาศและทางทะเลแบบบัลก์ สำหรับแบรนด์ที่ขยายสู่ตลาดโลก"],
      ],
    },
    stats: [["1M+", { en: "Shipments", th: "พัสดุ" }], ["100+", { en: "Countries", th: "ประเทศ" }], ["90%+", { en: "Repeat revenue", th: "รายได้ซ้ำ" }]],
  },
  connex: {
    name: "CONNEX", tag: { en: "SELL · the intelligence platform", th: "SELL · แพลตฟอร์มอัจฉริยะ" },
    accent: C.orange, wordmark: "CONNE\u2715",
    blurb: {
      en: "The central nervous system for cross-border sellers — one platform to build, run, and scale every channel.",
      th: "ระบบประสาทกลางของผู้ขายข้ามพรมแดน — แพลตฟอร์มเดียวที่สร้าง รัน และขยายทุกช่องทาง",
    },
    hero: { en: "Run your whole business from one platform.", th: "รันทั้งธุรกิจของคุณจากแพลตฟอร์มเดียว" },
    features: {
      en: [
        ["OMS & fulfillment automation", "Manage orders, inventory, and fulfillment across every channel, automatically."],
        ["CRM & marketing automation", "Capture the customer and own the relationship — repeat purchases on autopilot."],
        ["Product intelligence", "AI-driven pricing, demand, and listing insight across marketplaces."],
        ["Global Sales Page", "Launch a branded, multi-language D2C storefront in a click."],
        ["FASTY / CONNEX AI", "An AI copilot that runs the store, answers in plain language, and acts on insight."],
        ["100+ marketplace connectors", "List and sync across Amazon, eBay, Shopify, Etsy, and TikTok Shop in real time."],
      ],
      th: [
        ["OMS & ระบบฟูลฟิลเมนต์อัตโนมัติ", "จัดการออเดอร์ สต็อก และฟูลฟิลเมนต์ทุกช่องทางแบบอัตโนมัติ"],
        ["CRM & การตลาดอัตโนมัติ", "เก็บลูกค้าและเป็นเจ้าของความสัมพันธ์ — สร้างการซื้อซ้ำแบบอัตโนมัติ"],
        ["Product intelligence", "ตั้งราคา วิเคราะห์ดีมานด์ และลิสต์สินค้าด้วย AI ข้ามมาร์เก็ตเพลส"],
        ["Global Sales Page", "เปิดหน้าร้าน D2C หลายภาษาในคลิกเดียว"],
        ["FASTY / CONNEX AI", "AI ผู้ช่วยที่รันร้าน ตอบเป็นภาษาคน และลงมือทำจากอินไซต์"],
        ["ตัวเชื่อม 100+ มาร์เก็ตเพลส", "ลิสต์และซิงก์ข้าม Amazon, eBay, Shopify, Etsy และ TikTok Shop แบบเรียลไทม์"],
      ],
    },
    stats: [["10%", { en: "KA→CONNEX conversion", th: "คอนเวอร์ชัน KA→CONNEX" }], ["<5%", { en: "Churn", th: "อัตราเลิกใช้" }], ["3–5×", { en: "ARPU uplift", th: "ARPU เพิ่มขึ้น" }]],
  },
  kollab: {
    name: "KOLLAB", tag: { en: "SCALE · creator marketing", th: "SCALE · การตลาดครีเอเตอร์" },
    accent: C.teal, wordmark: "KOLLAB",
    blurb: {
      en: "Influencer marketing, done for you — the right creators, matched by AI, managed end to end.",
      th: "การตลาดอินฟลูเอนเซอร์แบบครบวงจร — ครีเอเตอร์ที่ใช่ จับคู่ด้วย AI ดูแลตั้งแต่ต้นจนจบ",
    },
    hero: { en: "Grow demand with creators who sell for you.", th: "สร้างดีมานด์กับครีเอเตอร์ที่ขายให้คุณ" },
    features: {
      en: [
        ["AI creator matching", "Smart scoring pairs your brand with the right creators, fast."],
        ["Full campaign management", "We run it end to end — brief, content, delivery."],
        ["Verified creator network", "Nano, micro, and macro influencers across every niche."],
        ["Real-time performance", "Track views, clicks, engagement — even sales."],
      ],
      th: [
        ["จับคู่ครีเอเตอร์ด้วย AI", "ระบบให้คะแนนอัจฉริยะจับคู่แบรนด์กับครีเอเตอร์ที่ใช่ อย่างรวดเร็ว"],
        ["บริหารแคมเปญครบวงจร", "เราดูแลตั้งแต่ต้นจนจบ — บรีฟ คอนเทนต์ ส่งมอบ"],
        ["เครือข่ายครีเอเตอร์ที่ยืนยันแล้ว", "อินฟลูฯ Nano, Micro และ Macro ครบทุกสาย"],
        ["วัดผลแบบเรียลไทม์", "ติดตามวิว คลิก เอนเกจเมนต์ — จนถึงยอดขาย"],
      ],
    },
    stats: [["Nano", { en: "3K+ niche voices", th: "3K+ สายเฉพาะ" }], ["Micro", { en: "10K+ conversion", th: "10K+ คอนเวอร์ชัน" }], ["Macro", { en: "100K+ reach", th: "100K+ การเข้าถึง" }]],
  },
  cloudmall: {
    name: "CloudMall", tag: { en: "SCALE · reseller distribution", th: "SCALE · เครือข่ายจัดจำหน่าย" },
    accent: C.mall, wordmark: "CLOUDMALL",
    blurb: {
      en: "A reseller network that sells your product for you. List once, and a network of resellers, shops, and brands takes it to market everywhere.",
      th: "เครือข่ายรีเซลเลอร์ที่ขายสินค้าให้คุณ ลิสต์ครั้งเดียว เครือข่ายรีเซลเลอร์ ร้านค้า และแบรนด์ พาสินค้าออกสู่ตลาดทุกที่",
    },
    hero: { en: "A reseller network that sells your product for you.", th: "เครือข่ายรีเซลเลอร์ที่ขายสินค้าให้คุณ" },
    features: {
      en: [
        ["Instant sales force", "A ready network of resellers selling on your behalf — no hiring, no channel-building."],
        ["List & distribute", "Manage one catalog; push products across the whole reseller network."],
        ["Fulfillment built-in", "CloudMall + FastShip clear and deliver worldwide, automatically."],
        ["Diaspora reach", "Thai sellers overseas and foreign resellers in Thailand already selling to their markets."],
      ],
      th: [
        ["กองกำลังขายทันที", "เครือข่ายรีเซลเลอร์พร้อมขายแทนคุณ — ไม่ต้องจ้าง ไม่ต้องสร้างช่องทาง"],
        ["ลิสต์และกระจายสินค้า", "จัดการแคตตาล็อกเดียว ส่งสินค้าออกทั่วเครือข่ายรีเซลเลอร์"],
        ["ฟูลฟิลเมนต์ในตัว", "CloudMall + FastShip เคลียร์และส่งทั่วโลกอัตโนมัติ"],
        ["เข้าถึงชุมชนคนไทยทั่วโลก", "คนไทยในต่างแดนและรีเซลเลอร์ต่างชาติในไทยที่ขายให้ตลาดของตนอยู่แล้ว"],
      ],
    },
    stats: [["List once", { en: "sell everywhere", th: "ขายทุกที่" }], ["Built-in", { en: "fulfillment", th: "ฟูลฟิลเมนต์" }], ["In-market", { en: "sales force", th: "กองกำลังขาย" }]],
  },
};

const SOLUTIONS = {
  stage: [
    {
      id: "go-global", persona: { en: "The Brand Owner", th: "เจ้าของแบรนด์" },
      title: { en: "Go Global", th: "ไปตลาดโลก" },
      body: { en: "Take a unique product to the world and sell direct — without a logistics or tech team. Ship, run, promote, and distribute from one connected stack.", th: "พาสินค้าที่มีเอกลักษณ์สู่ตลาดโลกและขายตรง — โดยไม่ต้องมีทีมโลจิสติกส์หรือเทคฯ ส่ง รัน โปรโมท และกระจายสินค้าจากสแตกเดียว" },
      products: ["connex", "fastship", "kollab", "cloudmall"],
    },
    {
      id: "scale-no-chaos", persona: { en: "The Growing Seller", th: "ผู้ขายที่กำลังโต" },
      title: { en: "Scale Without Chaos", th: "โตแบบไม่วุ่นวาย" },
      body: { en: "Already selling well but drowning in channels and operations. Run every order and channel from one place, and ship it all through one pipe.", th: "ขายดีอยู่แล้วแต่จมกับช่องทางและงานหลังบ้าน จัดการทุกออเดอร์ทุกช่องทางจากที่เดียว และส่งทั้งหมดผ่านท่อเดียว" },
      products: ["connex", "fastship"],
    },
    {
      id: "ship-simply", persona: { en: "The Everyday Merchant", th: "พ่อค้าแม่ค้าทั่วไป" },
      title: { en: "Ship Simply", th: "ส่งง่าย ไม่ซับซ้อน" },
      body: { en: "Want dependable cross-border operations and steady revenue — shipping made simple, with no guesswork on cost or customs.", th: "อยากได้การส่งข้ามพรมแดนที่ไว้ใจได้และรายได้สม่ำเสมอ — ส่งง่าย ไม่ต้องเดาต้นทุนหรือภาษี" },
      products: ["fastship"],
    },
  ],
  goal: [
    {
      id: "launch-d2c", title: { en: "Launch a D2C store worldwide", th: "เปิดร้าน D2C ทั่วโลก" },
      body: { en: "Spin up a branded, multi-language storefront and fulfill it globally from day one.", th: "เปิดหน้าร้านแบรนด์หลายภาษา และฟูลฟิลทั่วโลกได้ตั้งแต่วันแรก" },
      products: ["connex", "fastship"],
    },
    {
      id: "cut-duty", title: { en: "Cut customs cost & duty", th: "ลดต้นทุนศุลกากรและภาษี" },
      body: { en: "Consolidate parcels and calculate per-line duty so you clear once and deliver many.", th: "รวมพัสดุและคำนวณภาษีต่อบรรทัด เคลียร์ครั้งเดียว ส่งได้หลายชิ้น" },
      products: ["fastship"],
    },
    {
      id: "grow-demand", title: { en: "Grow demand with creators", th: "สร้างดีมานด์กับครีเอเตอร์" },
      body: { en: "Match with the right creators and turn content into measurable sales, then keep those customers.", th: "จับคู่ครีเอเตอร์ที่ใช่ เปลี่ยนคอนเทนต์เป็นยอดขายที่วัดได้ แล้วรักษาลูกค้าเหล่านั้นไว้" },
      products: ["kollab", "connex"],
    },
    {
      id: "become-supplier", title: { en: "Become a supplier & distribute", th: "เป็นซัพพลายเออร์และจัดจำหน่าย" },
      body: { en: "List once and let a ready reseller network sell your product in markets you couldn't reach alone.", th: "ลิสต์ครั้งเดียว ให้เครือข่ายรีเซลเลอร์พร้อมขายสินค้าคุณในตลาดที่คุณเข้าถึงเองไม่ได้" },
      products: ["cloudmall", "fastship"],
    },
  ],
};

const SERVE = [
  { title: { en: "The Brand Owner", th: "เจ้าของแบรนด์" }, kicker: { en: "Scaling a brand globally", th: "ขยายแบรนด์สู่ระดับโลก" }, goal: { en: "Has a unique product and wants to build global awareness and sell direct — without a logistics or tech team.", th: "มีสินค้าเอกลักษณ์ อยากสร้างการรับรู้ระดับโลกและขายตรง — โดยไม่ต้องมีทีมโลจิสติกส์หรือเทคฯ" }, sol: "go-global" },
  { title: { en: "The Growing Seller", th: "ผู้ขายที่กำลังโต" }, kicker: { en: "Expanding across channels", th: "ขยายข้ามช่องทาง" }, goal: { en: "Selling well but drowning in channels and operations — needs to scale supply, orders, and reach without the chaos.", th: "ขายดีแต่จมกับช่องทางและงานหลังบ้าน — ต้องขยายซัพพลาย ออเดอร์ และการเข้าถึงแบบไม่วุ่นวาย" }, sol: "scale-no-chaos" },
  { title: { en: "The Everyday Merchant", th: "พ่อค้าแม่ค้าทั่วไป" }, kicker: { en: "Selling simply and reliably", th: "ขายง่ายและเชื่อถือได้" }, goal: { en: "Wants stable, dependable operations and steady revenue — shipping and selling made simple, with no guesswork.", th: "อยากได้การดำเนินงานที่มั่นคงเชื่อถือได้และรายได้สม่ำเสมอ — ส่งและขายง่าย ไม่ต้องเดา" }, sol: "ship-simply" },
];

// ---------- routing ----------
const Router = createContext(null);
const useRouter = () => useContext(Router);

function parseHash() {
  const h = (window.location.hash || "#/").replace(/^#/, "");
  const parts = h.split("?");
  const path = parts[0] || "/";
  const params = new URLSearchParams(parts[1] || "");
  return { path, params };
}

// ---------- shared UI ----------
const Lang = createContext(null);
const useLang = () => useContext(Lang);

function Logo({ mono = false, size = 26 }) {
  const s = size;
  return (
    <svg width={s * 1.5} height={s} viewBox="0 0 60 40" fill="none" aria-hidden>
      {/* left link */}
      <path d="M20 8 C10 8 6 14 6 20 C6 26 10 32 20 32" stroke={mono ? C.ink : C.blue} strokeWidth="5" strokeLinecap="round" fill="none" />
      {/* right link */}
      <path d="M40 8 C50 8 54 14 54 20 C54 26 50 32 40 32" stroke={mono ? C.ink : C.blue} strokeWidth="5" strokeLinecap="round" fill="none" />
      {/* center rings */}
      <path d="M24 13 C28 11 32 11 36 13" stroke={C.teal} strokeWidth="4" strokeLinecap="round" fill="none" />
      <path d="M24 27 C28 29 32 29 36 27" stroke={C.teal} strokeWidth="4" strokeLinecap="round" fill="none" />
      <rect x="27" y="18" width="6" height="4" rx="1" fill={C.teal} />
    </svg>
  );
}

function Wordmark({ mono = false }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 10, fontWeight: 400, letterSpacing: "-0.01em" }}>
      <Logo mono={mono} size={24} />
      <span style={{ fontSize: 18, color: C.ink }}>
        <b style={{ fontWeight: 800 }}>CLOUD</b>COMMERCE
      </span>
    </span>
  );
}

function Reveal({ children, delay = 0, y = 18, style }) {
  const ref = useRef(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) { setShow(true); return; }
    const io = new IntersectionObserver((es) => es.forEach(e => e.isIntersecting && setShow(true)), { threshold: 0.12 });
    io.observe(el); return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} style={{
      opacity: show ? 1 : 0, transform: show ? "none" : `translateY(${y}px)`,
      transition: `opacity .7s ease ${delay}ms, transform .7s cubic-bezier(.2,.7,.2,1) ${delay}ms`, ...style,
    }}>{children}</div>
  );
}

function Eyebrow({ children, color = C.tealDeep }) {
  return <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.18em", color, marginBottom: 18 }}>{children}</div>;
}

function Btn({ children, onClick, kind = "primary", accent = C.teal }) {
  const base = {
    display: "inline-flex", alignItems: "center", gap: 8, cursor: "pointer",
    fontSize: 15, fontWeight: 600, padding: "13px 24px", borderRadius: 10,
    border: "1px solid transparent", transition: "transform .15s ease, box-shadow .2s ease, background .2s",
    fontFamily: "inherit",
  };
  const styles = {
    primary: { ...base, background: accent, color: accent === C.teal ? C.ink : white, boxShadow: `0 6px 22px ${accent}44` },
    ghost: { ...base, background: "transparent", color: C.navy, border: `1px solid ${C.line}` },
  };
  const [h, setH] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ ...styles[kind], transform: h ? "translateY(-2px)" : "none" }}>
      {children}
    </button>
  );
}

function Thread({ height = 120, color = C.teal }) {
  // vertical connective thread — the signature device
  return (
    <svg width="2" height={height} style={{ display: "block", margin: "0 auto" }} aria-hidden>
      <line x1="1" y1="0" x2="1" y2={height} stroke={color} strokeWidth="2" strokeDasharray="1 6" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}

// ---------- nav ----------
function Nav() {
  const { path, go } = useRouter();
  const { lang, setLang, t } = useLang();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", on); return () => window.removeEventListener("scroll", on);
  }, []);
  const links = [
    ["/platform", t.nav.platform], ["/solutions", t.nav.solutions], ["/products", t.nav.products], ["/about", t.nav.about],
  ];
  const active = (p) => path === p || (p !== "/" && path.startsWith(p));
  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 50, backdropFilter: "saturate(140%) blur(10px)",
      background: scrolled ? "rgba(245,244,239,0.86)" : "rgba(245,244,239,0.4)",
      borderBottom: scrolled ? `1px solid ${C.line}` : "1px solid transparent", transition: "all .25s",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div onClick={() => go("/")} style={{ cursor: "pointer" }}><Wordmark /></div>
        <nav style={{ display: "flex", alignItems: "center", gap: 6 }} className="cc-desktop-nav">
          {links.map(([p, label]) => (
            <a key={p} onClick={() => go(p)} style={{
              cursor: "pointer", fontSize: 15, fontWeight: 500, padding: "8px 14px", borderRadius: 8,
              color: active(p) ? C.navy : C.mute, background: active(p) ? "rgba(62,207,178,0.12)" : "transparent",
            }}>{label}</a>
          ))}
          <div style={{ width: 1, height: 20, background: C.line, margin: "0 8px" }} />
          <button onClick={() => setLang(lang === "en" ? "th" : "en")} style={{
            cursor: "pointer", fontFamily: "inherit", fontSize: 13, fontWeight: 700, letterSpacing: "0.04em",
            padding: "7px 12px", borderRadius: 8, border: `1px solid ${C.line}`, background: white, color: C.navy,
          }}>{lang === "en" ? "TH" : "EN"}</button>
          <div style={{ marginLeft: 6 }}><Btn onClick={() => go("/contact")}>{t.nav.navCta}</Btn></div>
        </nav>
        <button className="cc-burger" onClick={() => setOpen(!open)} aria-label="Menu" style={{
          display: "none", cursor: "pointer", background: "none", border: "none", padding: 8,
        }}>
          <div style={{ width: 22, height: 2, background: C.navy, margin: "4px 0" }} />
          <div style={{ width: 22, height: 2, background: C.navy, margin: "4px 0" }} />
          <div style={{ width: 22, height: 2, background: C.navy, margin: "4px 0" }} />
        </button>
      </div>
      {open && (
        <div style={{ padding: "8px 24px 20px", borderTop: `1px solid ${C.line}`, background: C.cream }} className="cc-mobile-menu">
          {links.map(([p, label]) => (
            <a key={p} onClick={() => { go(p); setOpen(false); }} style={{ display: "block", padding: "12px 0", fontSize: 17, fontWeight: 600, color: C.navy }}>{label}</a>
          ))}
          <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
            <button onClick={() => setLang(lang === "en" ? "th" : "en")} style={{ cursor: "pointer", fontFamily: "inherit", fontSize: 14, fontWeight: 700, padding: "10px 16px", borderRadius: 8, border: `1px solid ${C.line}`, background: white, color: C.navy }}>{lang === "en" ? "ไทย" : "EN"}</button>
            <div style={{ flex: 1 }}><Btn onClick={() => { go("/contact"); setOpen(false); }}>{t.nav.navCta}</Btn></div>
          </div>
        </div>
      )}
    </header>
  );
}

// ---------- sections used on multiple pages ----------
function Section({ children, bg, pad = 96, style }) {
  return (
    <section style={{ background: bg || "transparent", padding: `${pad}px 24px`, ...style }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>{children}</div>
    </section>
  );
}

function ProductChip({ id, onClick }) {
  const p = PRODUCTS[id];
  return (
    <span onClick={onClick} style={{
      display: "inline-flex", alignItems: "center", gap: 7, cursor: onClick ? "pointer" : "default",
      padding: "6px 12px", borderRadius: 100, border: `1px solid ${C.line}`, background: white,
      fontSize: 13, fontWeight: 700, color: C.navy,
    }}>
      <span style={{ width: 8, height: 8, borderRadius: 3, background: p.accent }} />
      {p.name}
    </span>
  );
}

function FinalCTA() {
  const { go } = useRouter();
  const { t } = useLang();
  return (
    <Section bg={C.navy} pad={88}>
      <Reveal>
        <div style={{ textAlign: "center", color: white }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.24em", color: C.teal, marginBottom: 20 }}>SHIP · SELL · SCALE</div>
          <h2 style={{ fontSize: "clamp(30px,4.4vw,52px)", lineHeight: 1.05, fontWeight: 800, letterSpacing: "-0.02em", margin: "0 0 16px" }}>{t.home.finalTitle}</h2>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.7)", maxWidth: 560, margin: "0 auto 32px" }}>{t.home.finalSub}</p>
          <Btn onClick={() => go("/contact")}>{t.nav.cta} →</Btn>
        </div>
      </Reveal>
    </Section>
  );
}

function Footer() {
  const { go } = useRouter();
  const { t } = useLang();
  return (
    <footer style={{ background: C.ink, color: "rgba(255,255,255,0.62)", padding: "56px 24px 40px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 40, justifyContent: "space-between", alignItems: "flex-start" }}>
          <div style={{ maxWidth: 320 }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 10, color: white, fontSize: 18 }}>
              <Logo size={24} /><span><b style={{ fontWeight: 800 }}>CLOUD</b>COMMERCE</span>
            </span>
            <p style={{ marginTop: 14, fontSize: 14, lineHeight: 1.6 }}>{t.footer.tagline}</p>
          </div>
          <div style={{ display: "flex", gap: 56, flexWrap: "wrap" }}>
            <div>
              <div style={{ color: white, fontSize: 13, fontWeight: 700, letterSpacing: "0.06em", marginBottom: 12 }}>{t.nav.products.toUpperCase()}</div>
              {Object.keys(PRODUCTS).map(k => (
                <a key={k} onClick={() => go(`/products/${k}`)} style={{ display: "block", cursor: "pointer", fontSize: 14, padding: "5px 0", color: "rgba(255,255,255,0.62)" }}>{PRODUCTS[k].name}</a>
              ))}
            </div>
            <div>
              <div style={{ color: white, fontSize: 13, fontWeight: 700, letterSpacing: "0.06em", marginBottom: 12 }}>COMPANY</div>
              {[["/platform", t.nav.platform], ["/solutions", t.nav.solutions], ["/about", t.nav.about], ["/contact", t.nav.contact]].map(([p, l]) => (
                <a key={p} onClick={() => go(p)} style={{ display: "block", cursor: "pointer", fontSize: 14, padding: "5px 0", color: "rgba(255,255,255,0.62)" }}>{l}</a>
              ))}
            </div>
            <div>
              <div style={{ color: white, fontSize: 13, fontWeight: 700, letterSpacing: "0.06em", marginBottom: 12 }}>CONNECT</div>
              <a style={{ display: "block", fontSize: 14, padding: "5px 0" }}>LINE @connex.co</a>
              <a style={{ display: "block", fontSize: 14, padding: "5px 0" }}>cloudcommerce.co</a>
            </div>
          </div>
        </div>
        <div style={{ marginTop: 44, paddingTop: 22, borderTop: "1px solid rgba(255,255,255,0.12)", fontSize: 13 }}>
          © {new Date().getFullYear()} {t.footer.rights}
        </div>
      </div>
    </footer>
  );
}

// ---------- HOME ----------
function Home() {
  const { go } = useRouter();
  const { t, lang } = useLang();
  const h = t.home;
  return (
    <>
      {/* hero */}
      <section style={{ position: "relative", overflow: "hidden", padding: "clamp(64px,9vw,120px) 24px 84px" }}>
        <div aria-hidden style={{
          position: "absolute", inset: 0, background:
            `radial-gradient(60% 50% at 82% 8%, rgba(62,207,178,0.16), transparent 70%),
             radial-gradient(50% 45% at 8% 4%, rgba(45,91,227,0.12), transparent 70%)`,
        }} />
        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
          <Reveal><Eyebrow>{h.eyebrow}</Eyebrow></Reveal>
          <Reveal delay={60}>
            <h1 style={{ fontSize: "clamp(38px,6vw,74px)", lineHeight: 1.02, letterSpacing: "-0.03em", fontWeight: 800, color: C.ink, margin: "0 0 24px", maxWidth: 960 }}>
              {h.h1a}<span style={{ color: C.tealDeep }}>{h.h1b}</span>{h.h1c}
            </h1>
          </Reveal>
          <Reveal delay={140}>
            <p style={{ fontSize: "clamp(16px,1.7vw,20px)", lineHeight: 1.55, color: C.mute, maxWidth: 620, margin: "0 0 34px" }}>{h.sub}</p>
          </Reveal>
          <Reveal delay={200}>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <Btn onClick={() => go("/contact")}>{h.ctaPrimary} →</Btn>
              <Btn kind="ghost" onClick={() => go("/platform")}>{h.ctaSecondary}</Btn>
            </div>
          </Reveal>
        </div>
      </section>

      {/* metric bar */}
      <Section pad={0}>
        <Reveal>
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 0,
            border: `1px solid ${C.line}`, borderRadius: 16, overflow: "hidden", background: white,
          }}>
            {h.metrics.map(([n, l], i) => (
              <div key={i} style={{ padding: "28px 24px", borderRight: i < 3 ? `1px solid ${C.line}` : "none", textAlign: "center" }}>
                <div style={{ fontSize: 34, fontWeight: 800, color: C.navy, letterSpacing: "-0.02em" }}>{n}</div>
                <div style={{ fontSize: 14, color: C.mute, marginTop: 4 }}>{l}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* three walls */}
      <Section>
        <Reveal>
          <h2 style={{ fontSize: "clamp(28px,3.6vw,44px)", fontWeight: 800, letterSpacing: "-0.02em", color: C.ink, margin: "0 0 14px" }}>{h.wallsTitle}</h2>
          <p style={{ fontSize: 17, color: C.mute, maxWidth: 640, margin: "0 0 48px" }}>{h.wallsSub}</p>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 20 }}>
          {h.walls.map(([k, title, body], i) => (
            <Reveal key={i} delay={i * 80}>
              <div style={{ background: white, border: `1px solid ${C.line}`, borderRadius: 16, padding: "30px 26px", height: "100%" }}>
                <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", color: C.tealDeep, marginBottom: 10 }}>{k.toUpperCase()}</div>
                <div style={{ fontSize: 26, fontWeight: 800, color: C.navy, marginBottom: 12 }}>{title}</div>
                <p style={{ fontSize: 15, lineHeight: 1.6, color: C.mute, margin: 0 }}>{body}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={120}>
          <p style={{ textAlign: "center", fontSize: 18, lineHeight: 1.6, color: C.navy, fontWeight: 600, maxWidth: 820, margin: "44px auto 0" }}>{h.wallsClose}</p>
        </Reveal>
      </Section>

      {/* ship sell scale stack */}
      <Section bg={C.cream2}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 12 }}>
            <Eyebrow>SHIP · SELL · SCALE</Eyebrow>
            <h2 style={{ fontSize: "clamp(28px,3.6vw,44px)", fontWeight: 800, letterSpacing: "-0.02em", color: C.ink, margin: "0 0 14px" }}>{h.stackTitle}</h2>
            <p style={{ fontSize: 17, color: C.mute, maxWidth: 620, margin: "0 auto 12px" }}>{h.stackSub}</p>
          </div>
        </Reveal>
        <Reveal><Thread height={44} /></Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 20, marginTop: 20 }}>
          {h.stack.map(([step, body, prod], i) => {
            const c = [C.blue, C.navy, C.tealDeep][i];
            return (
              <Reveal key={i} delay={i * 90}>
                <div style={{ background: white, border: `1px solid ${C.line}`, borderRadius: 16, padding: "30px 26px", height: "100%", position: "relative" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                    <div style={{ width: 34, height: 34, borderRadius: 9, background: c, color: white, display: "grid", placeItems: "center", fontWeight: 800, fontSize: 15 }}>{i + 1}</div>
                    <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: "0.02em", color: c }}>{step}</div>
                  </div>
                  <p style={{ fontSize: 15, lineHeight: 1.6, color: C.mute, margin: "0 0 18px" }}>{body}</p>
                  <div style={{ fontSize: 13, fontWeight: 700, color: C.navy, letterSpacing: "0.02em" }}>{prod}</div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* solutions teaser */}
      <Section>
        <Reveal>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: 16, marginBottom: 36 }}>
            <div>
              <Eyebrow>{t.solutions.eyebrow}</Eyebrow>
              <h2 style={{ fontSize: "clamp(28px,3.4vw,42px)", fontWeight: 800, letterSpacing: "-0.02em", color: C.ink, margin: "0 0 12px" }}>{h.solTease}</h2>
              <p style={{ fontSize: 17, color: C.mute, maxWidth: 560, margin: 0 }}>{h.solTeaseSub}</p>
            </div>
            <Btn kind="ghost" onClick={() => go("/solutions")}>{h.solSeeAll} →</Btn>
          </div>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 20 }}>
          {SOLUTIONS.stage.map((s, i) => (
            <Reveal key={s.id} delay={i * 80}>
              <div onClick={() => go(`/solutions?sol=${s.id}`)} style={{
                cursor: "pointer", background: white, border: `1px solid ${C.line}`, borderRadius: 16,
                padding: "28px 26px", height: "100%", transition: "transform .18s, box-shadow .2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 14px 40px rgba(26,50,96,0.10)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
                <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", color: C.tealDeep, marginBottom: 8 }}>{s.persona[lang].toUpperCase()}</div>
                <div style={{ fontSize: 24, fontWeight: 800, color: C.navy, marginBottom: 12 }}>{s.title[lang]}</div>
                <p style={{ fontSize: 15, lineHeight: 1.6, color: C.mute, margin: "0 0 18px" }}>{s.body[lang]}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {s.products.map(pid => <ProductChip key={pid} id={pid} />)}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* who we serve */}
      <Section bg={C.navy}>
        <Reveal>
          <div style={{ textAlign: "center", color: white, marginBottom: 44 }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.18em", color: C.teal, marginBottom: 16 }}>WHO WE SERVE</div>
            <h2 style={{ fontSize: "clamp(28px,3.6vw,44px)", fontWeight: 800, letterSpacing: "-0.02em", margin: "0 0 14px" }}>{h.serveTitle}</h2>
            <p style={{ fontSize: 17, color: "rgba(255,255,255,0.7)", maxWidth: 620, margin: "0 auto" }}>{h.serveSub}</p>
          </div>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 20 }}>
          {SERVE.map((s, i) => (
            <Reveal key={i} delay={i * 80}>
              <div onClick={() => go(`/solutions?sol=${s.sol}`)} style={{
                cursor: "pointer", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.14)",
                borderRadius: 16, padding: "28px 26px", height: "100%", transition: "background .2s",
              }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.06)"}>
                <div style={{ fontSize: 22, fontWeight: 800, color: white, marginBottom: 6 }}>{s.title[lang]}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: C.teal, marginBottom: 14 }}>{s.kicker[lang]}</div>
                <p style={{ fontSize: 15, lineHeight: 1.6, color: "rgba(255,255,255,0.72)", margin: 0 }}>{s.goal[lang]}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <FinalCTA />
    </>
  );
}

// ---------- PLATFORM ----------
function FlywheelDiagram({ lang }) {
  const nodes = [
    { id: "fastship", label: "FastShip", angle: -90, color: C.orange, note: { en: "Ship worldwide at rates you couldn't get alone", th: "ส่งทั่วโลกด้วยเรตที่คุณหาเองไม่ได้" } },
    { id: "connex", label: "CONNEX", angle: 0, color: C.orange, note: { en: "Run every order and channel from one place", th: "จัดการทุกออเดอร์ทุกช่องทางจากที่เดียว" } },
    { id: "kollab", label: "KOLLAB", angle: 90, color: C.teal, note: { en: "Reach new customers through trusted creators", th: "เข้าถึงลูกค้าใหม่ผ่านครีเอเตอร์ที่น่าเชื่อถือ" } },
    { id: "cloudmall", label: "CloudMall", angle: 180, color: C.mall, note: { en: "Turn your product into a new revenue line", th: "เปลี่ยนสินค้าของคุณเป็นรายได้สายใหม่" } },
  ];
  const R = 150, cx = 200, cy = 200;
  const pos = a => ({ x: cx + R * Math.cos(a * Math.PI / 180), y: cy + R * Math.sin(a * Math.PI / 180) });
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 30, alignItems: "center" }}>
      <svg viewBox="0 0 400 400" style={{ width: "100%", maxWidth: 400, margin: "0 auto", display: "block" }}>
        <circle cx={cx} cy={cy} r={R} fill="none" stroke={C.line} strokeWidth="2" strokeDasharray="2 8" />
        {nodes.map((n, i) => {
          const next = nodes[(i + 1) % nodes.length];
          const a1 = pos(n.angle), a2 = pos(next.angle);
          return <path key={i} d={`M ${a1.x} ${a1.y} A ${R} ${R} 0 0 1 ${a2.x} ${a2.y}`} fill="none" stroke={n.color} strokeWidth="2.5" opacity="0.5" markerEnd="url(#ar)" />;
        })}
        <defs><marker id="ar" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill={C.navy} opacity="0.5" /></marker></defs>
        {nodes.map(n => {
          const p = pos(n.angle);
          return (
            <g key={n.id}>
              <circle cx={p.x} cy={p.y} r="42" fill={white} stroke={n.color} strokeWidth="2" />
              <text x={p.x} y={p.y + 4} textAnchor="middle" fontSize="13" fontWeight="800" fill={C.navy}>{n.label}</text>
            </g>
          );
        })}
        <g>
          <circle cx={cx} cy={cy} r="44" fill={C.navy} />
          <text x={cx} y={cy - 2} textAnchor="middle" fontSize="12" fontWeight="800" fill={white}>CLOUD</text>
          <text x={cx} y={cy + 13} textAnchor="middle" fontSize="12" fontWeight="800" fill={C.teal}>COMMERCE</text>
        </g>
      </svg>
      <div style={{ display: "grid", gap: 14 }}>
        {nodes.map(n => (
          <div key={n.id} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
            <div style={{ width: 10, height: 10, borderRadius: 3, background: n.color, marginTop: 6, flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: 15, fontWeight: 800, color: C.navy }}>{n.label}</div>
              <div style={{ fontSize: 14, color: C.mute, lineHeight: 1.5 }}>{n.note[lang]}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Platform() {
  const { t, lang } = useLang();
  const p = t.platform;
  return (
    <>
      <section style={{ position: "relative", overflow: "hidden", padding: "clamp(56px,8vw,104px) 24px 72px" }}>
        <div aria-hidden style={{ position: "absolute", inset: 0, background: `radial-gradient(55% 50% at 85% 0%, rgba(45,91,227,0.12), transparent 70%)` }} />
        <div style={{ maxWidth: 1000, margin: "0 auto", position: "relative" }}>
          <Reveal><Eyebrow>{p.eyebrow}</Eyebrow></Reveal>
          <Reveal delay={60}><h1 style={{ fontSize: "clamp(34px,5vw,60px)", lineHeight: 1.05, letterSpacing: "-0.03em", fontWeight: 800, color: C.ink, margin: "0 0 20px" }}>{p.h1}</h1></Reveal>
          <Reveal delay={120}><p style={{ fontSize: "clamp(16px,1.7vw,20px)", lineHeight: 1.55, color: C.mute, maxWidth: 640, margin: 0 }}>{p.sub}</p></Reveal>
        </div>
      </section>

      <Section bg={C.cream2}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <Eyebrow>FLYWHEEL</Eyebrow>
            <h2 style={{ fontSize: "clamp(26px,3.4vw,40px)", fontWeight: 800, letterSpacing: "-0.02em", color: C.ink, margin: "0 0 12px" }}>{p.flywheelTitle}</h2>
            <p style={{ fontSize: 17, color: C.mute, maxWidth: 560, margin: "0 auto" }}>{p.flywheelSub}</p>
          </div>
        </Reveal>
        <Reveal delay={80}><FlywheelDiagram lang={lang} /></Reveal>
      </Section>

      {/* rent traffic own customer */}
      <Section>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <Eyebrow>HOW IT WORKS</Eyebrow>
            <h2 style={{ fontSize: "clamp(26px,3.4vw,40px)", fontWeight: 800, letterSpacing: "-0.02em", color: C.ink, margin: "0 0 12px" }}>{p.rentTitle}</h2>
            <p style={{ fontSize: 17, color: C.mute, maxWidth: 680, margin: "0 auto" }}>{p.rentSub}</p>
          </div>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 20 }}>
          {[p.rentLeft, p.rentRight].map((col, i) => (
            <Reveal key={i} delay={i * 100}>
              <div style={{
                background: white, border: `1px solid ${i === 1 ? C.blue : C.line}`, borderRadius: 16, padding: "30px 28px", height: "100%",
                boxShadow: i === 1 ? "0 10px 30px rgba(45,91,227,0.10)" : "none",
              }}>
                <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.06em", color: i === 1 ? C.blue : C.tealDeep, marginBottom: 8 }}>{i === 0 ? "01 · RENT" : "02 · OWN"}</div>
                <div style={{ fontSize: 24, fontWeight: 800, color: C.navy, marginBottom: 12 }}>{col[0]}</div>
                <p style={{ fontSize: 15, lineHeight: 1.6, color: C.mute, margin: "0 0 16px" }}>{col[1]}</p>
                <div style={{ fontSize: 13, fontWeight: 600, color: C.navy }}>{col[2]}</div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={120}>
          <div style={{ marginTop: 30, background: C.navy, borderRadius: 16, padding: "26px 30px", textAlign: "center" }}>
            <p style={{ fontSize: 18, fontWeight: 600, color: white, margin: 0 }}>{p.rentClose}</p>
          </div>
        </Reveal>
      </Section>

      <FinalCTA />
    </>
  );
}

// ---------- SOLUTIONS ----------
function SolutionCard({ s, lang, big }) {
  const { go } = useRouter();
  const { t } = useLang();
  const label = t.solutions;
  const persona = s.persona ? s.persona[lang] : null;
  return (
    <div id={s.id} style={{
      background: white, border: `1px solid ${C.line}`, borderRadius: 18, padding: big ? "34px 32px" : "28px 26px",
      height: "100%", display: "flex", flexDirection: "column",
    }}>
      {persona && <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", color: C.tealDeep, marginBottom: 8 }}>{persona.toUpperCase()}</div>}
      <div style={{ fontSize: big ? 28 : 22, fontWeight: 800, color: C.navy, marginBottom: 12, letterSpacing: "-0.01em" }}>{s.title[lang]}</div>
      <p style={{ fontSize: 15, lineHeight: 1.6, color: C.mute, margin: "0 0 22px" }}>{s.body[lang]}</p>
      <div style={{ marginTop: "auto" }}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", color: C.mute, marginBottom: 12 }}>{label.insideLabel.toUpperCase()}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 22 }}>
          {s.products.map(pid => {
            const pr = PRODUCTS[pid];
            return (
              <div key={pid} onClick={() => go(`/products/${pid}`)} style={{
                cursor: "pointer", display: "flex", alignItems: "center", gap: 12, padding: "12px 14px",
                borderRadius: 12, border: `1px solid ${C.line}`, background: C.cream, transition: "background .18s",
              }}
                onMouseEnter={e => e.currentTarget.style.background = C.cream2}
                onMouseLeave={e => e.currentTarget.style.background = C.cream}>
                <span style={{ width: 10, height: 10, borderRadius: 3, background: pr.accent, flexShrink: 0 }} />
                <span style={{ fontSize: 15, fontWeight: 800, color: C.navy }}>{pr.name}</span>
                <span style={{ fontSize: 13, color: C.mute, marginLeft: "auto", textAlign: "right" }}>{pr.tag[lang]}</span>
              </div>
            );
          })}
        </div>
        <Btn onClick={() => go(`/contact?sol=${s.id}`)}>{label.cta} →</Btn>
      </div>
    </div>
  );
}

function Solutions() {
  const { t, lang } = useLang();
  const { params } = useRouter();
  const label = t.solutions;
  const focus = params.get("sol");
  useEffect(() => {
    if (focus) {
      const el = document.getElementById(focus);
      if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "center" }), 200);
    }
  }, [focus]);
  return (
    <>
      <section style={{ position: "relative", overflow: "hidden", padding: "clamp(56px,8vw,104px) 24px 64px" }}>
        <div aria-hidden style={{ position: "absolute", inset: 0, background: `radial-gradient(55% 50% at 85% 0%, rgba(62,207,178,0.14), transparent 70%)` }} />
        <div style={{ maxWidth: 1000, margin: "0 auto", position: "relative" }}>
          <Reveal><Eyebrow>{label.eyebrow}</Eyebrow></Reveal>
          <Reveal delay={60}><h1 style={{ fontSize: "clamp(34px,5vw,60px)", lineHeight: 1.05, letterSpacing: "-0.03em", fontWeight: 800, color: C.ink, margin: "0 0 20px" }}>{label.h1}</h1></Reveal>
          <Reveal delay={120}><p style={{ fontSize: "clamp(16px,1.7vw,20px)", lineHeight: 1.55, color: C.mute, maxWidth: 660, margin: 0 }}>{label.sub}</p></Reveal>
        </div>
      </section>

      <Section pad={64}>
        <Reveal><h2 style={{ fontSize: 24, fontWeight: 800, color: C.ink, margin: "0 0 8px" }}>{label.byStage}</h2></Reveal>
        <Reveal><div style={{ height: 2, width: 46, background: C.teal, marginBottom: 32 }} /></Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 22 }}>
          {SOLUTIONS.stage.map((s, i) => <Reveal key={s.id} delay={i * 80}><SolutionCard s={s} lang={lang} big /></Reveal>)}
        </div>
      </Section>

      <Section bg={C.cream2} pad={64}>
        <Reveal><h2 style={{ fontSize: 24, fontWeight: 800, color: C.ink, margin: "0 0 8px" }}>{label.byGoal}</h2></Reveal>
        <Reveal><div style={{ height: 2, width: 46, background: C.blue, marginBottom: 32 }} /></Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 22 }}>
          {SOLUTIONS.goal.map((s, i) => <Reveal key={s.id} delay={i * 70}><SolutionCard s={s} lang={lang} /></Reveal>)}
        </div>
      </Section>

      <FinalCTA />
    </>
  );
}

// ---------- PRODUCTS INDEX ----------
function ProductsIndex() {
  const { go } = useRouter();
  const { t, lang } = useLang();
  const pl = t.products;
  return (
    <>
      <section style={{ position: "relative", overflow: "hidden", padding: "clamp(56px,8vw,104px) 24px 64px" }}>
        <div aria-hidden style={{ position: "absolute", inset: 0, background: `radial-gradient(55% 50% at 85% 0%, rgba(45,91,227,0.1), transparent 70%)` }} />
        <div style={{ maxWidth: 1000, margin: "0 auto", position: "relative" }}>
          <Reveal><Eyebrow>{pl.eyebrow}</Eyebrow></Reveal>
          <Reveal delay={60}><h1 style={{ fontSize: "clamp(34px,5vw,60px)", lineHeight: 1.05, letterSpacing: "-0.03em", fontWeight: 800, color: C.ink, margin: "0 0 20px" }}>{pl.h1}</h1></Reveal>
          <Reveal delay={120}><p style={{ fontSize: "clamp(16px,1.7vw,20px)", lineHeight: 1.55, color: C.mute, maxWidth: 620, margin: 0 }}>{pl.sub}</p></Reveal>
        </div>
      </section>
      <Section pad={64}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 22 }}>
          {Object.entries(PRODUCTS).map(([id, pr], i) => (
            <Reveal key={id} delay={i * 70}>
              <div onClick={() => go(`/products/${id}`)} style={{
                cursor: "pointer", background: white, border: `1px solid ${C.line}`, borderRadius: 18,
                padding: "32px 30px", height: "100%", display: "flex", flexDirection: "column",
                transition: "transform .18s, box-shadow .2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 16px 44px rgba(26,50,96,0.10)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                  <span style={{ width: 12, height: 12, borderRadius: 4, background: pr.accent }} />
                  <span style={{ fontSize: 26, fontWeight: 800, color: C.navy, letterSpacing: "-0.01em" }}>{pr.name}</span>
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, color: C.tealDeep, marginBottom: 16 }}>{pr.tag[lang]}</div>
                <p style={{ fontSize: 15, lineHeight: 1.6, color: C.mute, margin: "0 0 22px" }}>{pr.blurb[lang]}</p>
                <span style={{ marginTop: "auto", fontSize: 15, fontWeight: 700, color: pr.accent }}>{pl.learn} →</span>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
      <FinalCTA />
    </>
  );
}

// ---------- PRODUCT DETAIL ----------
function ProductPage({ id }) {
  const { go } = useRouter();
  const { t, lang } = useLang();
  const pr = PRODUCTS[id];
  if (!pr) return <NotFound />;
  const a = pr.accent;
  const relatedSol = [...SOLUTIONS.stage, ...SOLUTIONS.goal].filter(s => s.products.includes(id)).slice(0, 3);
  return (
    <>
      <section style={{ position: "relative", overflow: "hidden", padding: "clamp(48px,7vw,88px) 24px 56px" }}>
        <div aria-hidden style={{ position: "absolute", inset: 0, background: `radial-gradient(55% 50% at 84% 0%, ${a}22, transparent 70%)` }} />
        <div style={{ maxWidth: 1000, margin: "0 auto", position: "relative" }}>
          <Reveal>
            <div onClick={() => go("/products")} style={{ cursor: "pointer", fontSize: 14, color: C.mute, marginBottom: 22 }}>← {t.nav.products}</div>
          </Reveal>
          <Reveal delay={40}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }}>
              <span style={{ fontSize: "clamp(30px,4.4vw,46px)", fontWeight: 800, letterSpacing: "0.02em", color: C.navy }}>
                {pr.wordmark.slice(0, -1)}<span style={{ color: a }}>{pr.wordmark.slice(-1)}</span>
              </span>
            </div>
          </Reveal>
          <Reveal delay={80}><div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", color: a, marginBottom: 20 }}>{pr.tag[lang].toUpperCase()}</div></Reveal>
          <Reveal delay={120}><h1 style={{ fontSize: "clamp(30px,4.6vw,56px)", lineHeight: 1.06, letterSpacing: "-0.02em", fontWeight: 800, color: C.ink, margin: "0 0 20px", maxWidth: 820 }}>{pr.hero[lang]}</h1></Reveal>
          <Reveal delay={160}><p style={{ fontSize: "clamp(16px,1.7vw,19px)", lineHeight: 1.55, color: C.mute, maxWidth: 620, margin: "0 0 30px" }}>{pr.blurb[lang]}</p></Reveal>
          <Reveal delay={200}><Btn accent={a} onClick={() => go(`/contact?product=${id}`)}>{t.nav.cta} →</Btn></Reveal>
        </div>
      </section>

      {/* stats */}
      <Section pad={0}>
        <Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", border: `1px solid ${C.line}`, borderRadius: 16, overflow: "hidden", background: white }}>
            {pr.stats.map(([n, l], i) => (
              <div key={i} style={{ padding: "26px 20px", borderRight: i < pr.stats.length - 1 ? `1px solid ${C.line}` : "none", textAlign: "center" }}>
                <div style={{ fontSize: 30, fontWeight: 800, color: a, letterSpacing: "-0.02em" }}>{n}</div>
                <div style={{ fontSize: 14, color: C.mute, marginTop: 4 }}>{l[lang]}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* features */}
      <Section pad={80}>
        <Reveal><h2 style={{ fontSize: "clamp(24px,3vw,36px)", fontWeight: 800, letterSpacing: "-0.02em", color: C.ink, margin: "0 0 34px" }}>{lang === "en" ? "What's inside" : "ภายในมีอะไร"}</h2></Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 20 }}>
          {pr.features[lang].map(([title, body], i) => (
            <Reveal key={i} delay={i * 60}>
              <div style={{ background: white, border: `1px solid ${C.line}`, borderRadius: 14, padding: "26px 24px", height: "100%" }}>
                <div style={{ width: 30, height: 4, borderRadius: 3, background: a, marginBottom: 16 }} />
                <div style={{ fontSize: 18, fontWeight: 800, color: C.navy, marginBottom: 10 }}>{title}</div>
                <p style={{ fontSize: 15, lineHeight: 1.6, color: C.mute, margin: 0 }}>{body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* related solutions */}
      {relatedSol.length > 0 && (
        <Section bg={C.cream2} pad={72}>
          <Reveal><h2 style={{ fontSize: 24, fontWeight: 800, color: C.ink, margin: "0 0 8px" }}>{lang === "en" ? "Where it fits" : "ใช้ในโซลูชันไหน"}</h2></Reveal>
          <Reveal><p style={{ fontSize: 16, color: C.mute, margin: "0 0 30px" }}>{lang === "en" ? `Solutions that put ${pr.name} to work with the rest of the stack.` : `โซลูชันที่ใช้ ${pr.name} ทำงานร่วมกับส่วนอื่นของสแตก`}</p></Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 18 }}>
            {relatedSol.map((s, i) => (
              <Reveal key={s.id} delay={i * 70}>
                <div onClick={() => go(`/solutions?sol=${s.id}`)} style={{
                  cursor: "pointer", background: white, border: `1px solid ${C.line}`, borderRadius: 14, padding: "24px 22px", height: "100%",
                  transition: "transform .18s", }}
                  onMouseEnter={e => e.currentTarget.style.transform = "translateY(-3px)"}
                  onMouseLeave={e => e.currentTarget.style.transform = "none"}>
                  <div style={{ fontSize: 19, fontWeight: 800, color: C.navy, marginBottom: 10 }}>{s.title[lang]}</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                    {s.products.map(pid => <ProductChip key={pid} id={pid} />)}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      <FinalCTA />
    </>
  );
}

// ---------- CONTACT ----------
function Contact() {
  const { params, go } = useRouter();
  const { t, lang } = useLang();
  const c = t.contact;
  const presetSol = params.get("sol");
  const presetProduct = params.get("product");
  const solObj = presetSol ? [...SOLUTIONS.stage, ...SOLUTIONS.goal].find(s => s.id === presetSol) : null;
  const prodObj = presetProduct ? PRODUCTS[presetProduct] : null;

  const [form, setForm] = useState({ name: "", company: "", email: "", sells: "", volume: "", goal: "", msg: "" });
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState({});

  useEffect(() => {
    if (solObj) {
      const map = { "go-global": 0, "scale-no-chaos": 1, "cut-duty": 2, "grow-demand": 3, "become-supplier": 4 };
      const gi = map[presetSol];
      if (gi != null) setForm(f => ({ ...f, goal: c.goals[gi] }));
    }
  }, [presetSol, lang]);

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));
  const submit = () => {
    const e = {};
    if (!form.name.trim()) e.name = 1;
    if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) e.email = 1;
    if (!form.company.trim()) e.company = 1;
    setErr(e);
    if (Object.keys(e).length === 0) setSent(true);
  };

  const field = { width: "100%", padding: "13px 15px", fontSize: 15, fontFamily: "inherit", color: C.ink, background: white, border: `1px solid ${C.line}`, borderRadius: 10, outline: "none", boxSizing: "border-box" };
  const errStyle = { border: `1px solid ${C.orange}` };
  const lbl = { fontSize: 13, fontWeight: 700, color: C.navy, marginBottom: 7, display: "block" };

  if (sent) {
    return (
      <Section pad={120}>
        <Reveal>
          <div style={{ maxWidth: 560, margin: "0 auto", textAlign: "center" }}>
            <div style={{ width: 60, height: 60, borderRadius: 16, background: C.teal, display: "grid", placeItems: "center", margin: "0 auto 24px" }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke={C.ink} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            <h1 style={{ fontSize: "clamp(28px,4vw,42px)", fontWeight: 800, color: C.ink, margin: "0 0 14px" }}>{c.done}</h1>
            <p style={{ fontSize: 17, color: C.mute, margin: "0 0 30px" }}>{c.doneSub}</p>
            <Btn kind="ghost" onClick={() => go("/solutions")}>{t.home.solSeeAll} →</Btn>
          </div>
        </Reveal>
      </Section>
    );
  }

  return (
    <>
      <section style={{ position: "relative", overflow: "hidden", padding: "clamp(48px,7vw,84px) 24px 40px" }}>
        <div aria-hidden style={{ position: "absolute", inset: 0, background: `radial-gradient(50% 50% at 85% 0%, rgba(62,207,178,0.14), transparent 70%)` }} />
        <div style={{ maxWidth: 1000, margin: "0 auto", position: "relative" }}>
          <Reveal><Eyebrow>{c.eyebrow}</Eyebrow></Reveal>
          <Reveal delay={60}><h1 style={{ fontSize: "clamp(32px,4.8vw,56px)", lineHeight: 1.05, letterSpacing: "-0.03em", fontWeight: 800, color: C.ink, margin: "0 0 18px" }}>{c.h1}</h1></Reveal>
          <Reveal delay={120}><p style={{ fontSize: "clamp(16px,1.7vw,19px)", lineHeight: 1.55, color: C.mute, maxWidth: 600, margin: 0 }}>{c.sub}</p></Reveal>
        </div>
      </section>

      <Section pad={56}>
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1.4fr) minmax(0,1fr)", gap: 36, alignItems: "start" }} className="cc-contact-grid">
          <Reveal>
            <div style={{ background: white, border: `1px solid ${C.line}`, borderRadius: 18, padding: "32px 30px" }}>
              {(solObj || prodObj) && (
                <div style={{ background: C.cream, border: `1px solid ${C.line}`, borderRadius: 12, padding: "14px 16px", marginBottom: 24, fontSize: 14, color: C.navy }}>
                  {lang === "en" ? "You're asking about " : "คุณกำลังสนใจ "}
                  <b>{solObj ? solObj.title[lang] : prodObj.name}</b>
                  {solObj && <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginTop: 10 }}>{solObj.products.map(pid => <ProductChip key={pid} id={pid} />)}</div>}
                </div>
              )}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="cc-field-row">
                <div><label style={lbl}>{c.fields.name} *</label><input style={{ ...field, ...(err.name ? errStyle : {}) }} value={form.name} onChange={set("name")} /></div>
                <div><label style={lbl}>{c.fields.company} *</label><input style={{ ...field, ...(err.company ? errStyle : {}) }} value={form.company} onChange={set("company")} /></div>
              </div>
              <div style={{ marginTop: 16 }}><label style={lbl}>{c.fields.email} *</label><input style={{ ...field, ...(err.email ? errStyle : {}) }} value={form.email} onChange={set("email")} placeholder="you@brand.com" /></div>
              <div style={{ marginTop: 16 }}><label style={lbl}>{c.fields.sells}</label><input style={field} value={form.sells} onChange={set("sells")} placeholder={lang === "en" ? "e.g. Muay Thai gear, skincare, snacks…" : "เช่น อุปกรณ์มวยไทย สกินแคร์ ขนม…"} /></div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 16 }} className="cc-field-row">
                <div><label style={lbl}>{c.fields.volume}</label>
                  <select style={field} value={form.volume} onChange={set("volume")}>
                    <option value="">—</option>
                    {c.volumes.map(v => <option key={v} value={v}>{v}</option>)}
                  </select>
                </div>
                <div><label style={lbl}>{c.fields.goal}</label>
                  <select style={field} value={form.goal} onChange={set("goal")}>
                    <option value="">—</option>
                    {c.goals.map(g => <option key={g} value={g}>{g}</option>)}
                  </select>
                </div>
              </div>
              <div style={{ marginTop: 16 }}><label style={lbl}>{c.fields.msg}</label><textarea style={{ ...field, minHeight: 96, resize: "vertical" }} value={form.msg} onChange={set("msg")} /></div>
              <div style={{ marginTop: 24 }}><Btn onClick={submit}>{c.submit} →</Btn></div>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div style={{ display: "grid", gap: 16 }}>
              <div style={{ background: C.navy, borderRadius: 16, padding: "28px 26px", color: white }}>
                <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.14em", color: C.teal, marginBottom: 16 }}>SHIP · SELL · SCALE</div>
                <p style={{ fontSize: 16, lineHeight: 1.6, color: "rgba(255,255,255,0.82)", margin: 0 }}>{c.contactLine}</p>
              </div>
              {t.home.metrics.slice(0, 3).map(([n, l], i) => (
                <div key={i} style={{ background: white, border: `1px solid ${C.line}`, borderRadius: 14, padding: "20px 24px", display: "flex", alignItems: "baseline", gap: 14 }}>
                  <span style={{ fontSize: 28, fontWeight: 800, color: C.navy }}>{n}</span>
                  <span style={{ fontSize: 15, color: C.mute }}>{l}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}

function NotFound() {
  const { go } = useRouter();
  return (
    <Section pad={140}>
      <div style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: 40, fontWeight: 800, color: C.ink }}>404</h1>
        <p style={{ color: C.mute, marginBottom: 24 }}>That page went off-route.</p>
        <Btn onClick={() => go("/")}>Back home</Btn>
      </div>
    </Section>
  );
}

// ---------- ABOUT ----------
function About() {
  const { t } = useLang();
  const a = t.about;
  return (
    <>
      <section style={{ position: "relative", overflow: "hidden", padding: "clamp(56px,8vw,104px) 24px 64px" }}>
        <div aria-hidden style={{ position: "absolute", inset: 0, background: `radial-gradient(55% 50% at 85% 0%, rgba(45,91,227,0.12), transparent 70%), radial-gradient(45% 40% at 6% 6%, rgba(62,207,178,0.12), transparent 70%)` }} />
        <div style={{ maxWidth: 1000, margin: "0 auto", position: "relative" }}>
          <Reveal><Eyebrow>{a.eyebrow}</Eyebrow></Reveal>
          <Reveal delay={60}><h1 style={{ fontSize: "clamp(34px,5vw,60px)", lineHeight: 1.05, letterSpacing: "-0.03em", fontWeight: 800, color: C.ink, margin: "0 0 20px" }}>{a.h1}</h1></Reveal>
          <Reveal delay={120}><p style={{ fontSize: "clamp(16px,1.7vw,20px)", lineHeight: 1.55, color: C.mute, maxWidth: 640, margin: 0 }}>{a.sub}</p></Reveal>
        </div>
      </section>

      {/* at a glance */}
      <Section pad={0}>
        <Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", border: `1px solid ${C.line}`, borderRadius: 16, overflow: "hidden", background: white }}>
            {a.profile.map(([value, label], i) => (
              <div key={i} style={{ padding: "26px 24px", borderRight: i < a.profile.length - 1 ? `1px solid ${C.line}` : "none", textAlign: "center" }}>
                <div style={{ fontSize: 28, fontWeight: 800, color: C.navy, letterSpacing: "-0.02em" }}>{value}</div>
                <div style={{ fontSize: 13, color: C.mute, marginTop: 6 }}>{label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* our story */}
      <Section>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 40, alignItems: "start" }}>
          <Reveal>
            <div>
              <Eyebrow>{a.storyLabel}</Eyebrow>
              <h2 style={{ fontSize: "clamp(26px,3.4vw,40px)", fontWeight: 800, letterSpacing: "-0.02em", color: C.ink, margin: "0 0 14px" }}>{a.storyTitle}</h2>
              <div style={{ height: 2, width: 46, background: C.teal }} />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div style={{ display: "grid", gap: 18 }}>
              {a.storyBody.map((para, i) => (
                <p key={i} style={{ fontSize: 17, lineHeight: 1.7, color: i === 0 ? C.navy : C.mute, fontWeight: i === 0 ? 600 : 400, margin: 0 }}>{para}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      {/* journey timeline */}
      <Section bg={C.cream2}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <Eyebrow>{a.timelineLabel}</Eyebrow>
            <h2 style={{ fontSize: "clamp(26px,3.4vw,40px)", fontWeight: 800, letterSpacing: "-0.02em", color: C.ink, margin: 0 }}>{a.timelineTitle}</h2>
          </div>
        </Reveal>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          {a.timeline.map(([year, title, body], i) => (
            <Reveal key={i} delay={i * 70}>
              <div style={{ display: "grid", gridTemplateColumns: "84px 1fr", gap: 20 }}>
                <div style={{ textAlign: "right", paddingTop: 1 }}>
                  <div style={{ fontSize: 18, fontWeight: 800, color: C.tealDeep }}>{year}</div>
                </div>
                <div style={{ position: "relative", borderLeft: `2px dashed ${C.line}`, paddingLeft: 26, paddingBottom: i < a.timeline.length - 1 ? 34 : 0 }}>
                  <span style={{ position: "absolute", left: -8, top: 3, width: 13, height: 13, borderRadius: 4, background: C.teal, border: `2px solid ${C.cream2}` }} />
                  <div style={{ fontSize: 19, fontWeight: 800, color: C.navy, marginBottom: 7 }}>{title}</div>
                  <p style={{ fontSize: 15, lineHeight: 1.6, color: C.mute, margin: 0 }}>{body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* values */}
      <Section>
        <Reveal>
          <div style={{ marginBottom: 40 }}>
            <Eyebrow>{a.valuesLabel}</Eyebrow>
            <h2 style={{ fontSize: "clamp(26px,3.4vw,40px)", fontWeight: 800, letterSpacing: "-0.02em", color: C.ink, margin: 0 }}>{a.valuesTitle}</h2>
          </div>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 20 }}>
          {a.values.map(([title, body], i) => (
            <Reveal key={i} delay={i * 70}>
              <div style={{ background: white, border: `1px solid ${C.line}`, borderRadius: 16, padding: "28px 26px", height: "100%" }}>
                <div style={{ width: 30, height: 4, borderRadius: 3, background: [C.blue, C.teal, C.tealDeep, C.navy][i % 4], marginBottom: 16 }} />
                <div style={{ fontSize: 19, fontWeight: 800, color: C.navy, marginBottom: 10 }}>{title}</div>
                <p style={{ fontSize: 15, lineHeight: 1.6, color: C.mute, margin: 0 }}>{body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <FinalCTA />
    </>
  );
}

// ---------- app shell ----------
export default function App() {
  const [route, setRoute] = useState(parseHash());
  const [lang, setLang] = useState("en");

  useEffect(() => {
    const on = () => { setRoute(parseHash()); window.scrollTo(0, 0); };
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);

  const go = (to) => {
    window.location.hash = "#" + to;
    // hashchange handles the rest; ensure scroll reset if same-path
    window.scrollTo(0, 0);
  };

  const { path, params } = route;
  const t = T[lang];

  let page;
  if (path === "/" || path === "") page = <Home />;
  else if (path === "/platform") page = <Platform />;
  else if (path === "/solutions") page = <Solutions />;
  else if (path === "/products") page = <ProductsIndex />;
  else if (path.startsWith("/products/")) page = <ProductPage id={path.split("/")[2]} />;
  else if (path === "/about") page = <About />;
  else if (path === "/contact") page = <Contact />;
  else page = <NotFound />;

  return (
    <Lang.Provider value={{ lang, setLang, t }}>
      <Router.Provider value={{ path, params, go }}>
        <style>{`
          * { -webkit-font-smoothing: antialiased; }
          body { margin: 0; }
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
          .cc-root { font-family: 'Inter', system-ui, -apple-system, sans-serif; background: ${C.cream}; color: ${C.ink}; min-height: 100vh; }
          a { text-decoration: none; }
          button { font-family: inherit; }
          select { -webkit-appearance: none; appearance: none; background-image: url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%235B6B7F' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 15px center; padding-right: 36px; }
          input:focus, select:focus, textarea:focus { border-color: ${C.teal} !important; box-shadow: 0 0 0 3px rgba(62,207,178,0.16); }
          @media (max-width: 860px) {
            .cc-desktop-nav { display: none !important; }
            .cc-burger { display: block !important; }
            .cc-contact-grid { grid-template-columns: 1fr !important; }
          }
          @media (max-width: 560px) {
            .cc-field-row { grid-template-columns: 1fr !important; }
          }
        `}</style>
        <div className="cc-root">
          <Nav />
          <main>{page}</main>
          <Footer />
        </div>
      </Router.Provider>
    </Lang.Provider>
  );
}
