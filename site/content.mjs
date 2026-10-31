import { applyPlatformDisclosures } from './platform-disclosures.mjs';
import { content as waddleContent } from './waddle-content.mjs';

// One source for common policy clauses; per-game disclosures remain explicit.
export function makeContent(config) {
  const email = config.email;
  const mail = `<a href="mailto:${email}">${email}</a>`;
  const waddle = waddleContent({ operator: config.operator, email,
    packageName: config.games['waddle-rush'].packageName,
    cosmeticCount: config.games['waddle-rush'].cosmetics,
    slotCount: config.games['waddle-rush'].slots, retention: config.supportRetention });
  const apple = '<a href="https://www.apple.com/legal/privacy/">Apple Privacy Policy</a>';
  const gameCenter = '<a href="https://www.apple.com/legal/privacy/data/en/game-center/">Game Center &amp; Privacy</a>';
  const google = '<a href="https://policies.google.com/privacy">Google Privacy Policy</a>';

  const push = structuredClone(waddle);
  push.en.home = {
    title: 'Push Burst — Jelly Block Puzzle Game | ProjectUnknown',
    description: 'Push colourful jelly blocks and create satisfying chains in Push Burst. Explore Classic and Puzzle modes, find mobile downloads and get official player support.',
    eyebrow: 'A colourful jelly-block puzzle', headline: 'A little push.<br>A big <em>pop.</em>',
    intro: 'Make room, line up your next move and watch the jelly blocks burst. A small puzzle with plenty of satisfying moments.',
    discover: 'Meet Push Burst', help: 'Player support', availability: 'A puzzle for iPhone and Android.',
    artAlt: 'Push Burst game icon with colourful jelly blocks', sticker: '',
    sectionLabel: 'Think, push, pop', sectionTitle: 'Make your next<br>move count.',
    sectionIntro: 'Chase a better score or work your way through a puzzle. There is always another little move to think about.',
    features: [
      ['01', 'Push into a better position.', 'Move colourful jelly blocks into place and set up satisfying bursts and chains.'],
      ['02', 'Two ways to play.', 'Chase your best score in Classic, or tackle the challenges in Puzzle mode.'],
      ['03', 'Find your favourite look.', 'Choose a colour theme and adjust sound and vibration to make the game feel your own.']
    ],
    note: 'Classic & Puzzle · Colour themes · Local progress',
    supportTitle: 'Need a little nudge?', supportBody: 'Get help with progress, purchases, leaderboards or privacy.', supportLink: 'Visit support',
    playStore: 'Get it on Google Play', appStore: 'Download on the App Store'
  };
  push.ko.home = {
    title: 'Push Burst — 젤리 블록 퍼즐 게임 | ProjectUnknown',
    description: '젤리 블록을 밀고 연쇄를 만드는 모바일 퍼즐 게임 Push Burst. 클래식과 퍼즐 모드, Google Play·App Store 다운로드 링크와 공식 고객지원을 만나보세요.',
    eyebrow: '알록달록 젤리 블록 퍼즐', headline: '살짝 밀면,<br>기분 좋게 <em>팡!</em>',
    intro: '다음 블록이 들어갈 자리를 만들고, 기분 좋은 연쇄를 완성해요. 작은 한 수가 커다란 재미가 돼요.',
    discover: '어떤 게임인가요?', help: '고객지원', availability: 'iPhone과 Android를 위한 퍼즐 게임이에요.',
    artAlt: '알록달록한 젤리 블록이 있는 Push Burst 게임 아이콘', sticker: '',
    sectionLabel: '생각하고, 밀고, 터뜨리고', sectionTitle: '다음 한 수의<br>즐거움을 찾아요.',
    sectionIntro: '최고 점수를 노려도, 퍼즐을 하나씩 풀어도 좋아요. 조금만 더 생각하면 새로운 길이 보여요.',
    features: [
      ['01', '밀어서 만드는 짜릿한 연쇄.', '젤리 블록을 알맞은 자리로 밀어 넣고 기분 좋게 터지는 연쇄를 만들어요.'],
      ['02', '두 가지 방식으로 즐겨요.', '클래식에서는 최고 점수에 도전하고, 퍼즐에서는 준비된 문제를 하나씩 해결해요.'],
      ['03', '내 취향대로 바꿔요.', '좋아하는 컬러 테마를 고르고 소리와 진동을 조절해 나만의 플레이 분위기를 만들어요.']
    ],
    note: '클래식과 퍼즐 · 컬러 테마 · 기기에 저장되는 기록',
    supportTitle: '도움이 필요할 땐, 여기로.', supportBody: '기록, 구매, 순위표, 개인정보에 관한 궁금증을 해결해 드려요.', supportLink: '고객지원 바로 가기',
    playStore: 'Google Play에서 다운로드', appStore: 'App Store에서 다운로드'
  };
  push.en.support = {
    ...waddle.en.support,
    description: 'Help with Push Burst local progress, No Ads purchases, leaderboards, achievements and privacy.',
    questions: [
      ['What are the game modes?', 'Classic lets you chase a high score. Puzzle offers individual challenges. Push the jelly blocks into position and set up bursts and chains.'],
      ['Where is my progress saved?', 'Best scores, puzzle progress, settings, tutorial status, hint counts and purchase entitlement are stored locally. There is no developer-operated save server. Removing the app or clearing storage may lose progress; operating-system backups can behave differently. Leaderboards are separate from a full save backup.'],
      ['How do rankings and achievements work?', 'When signed in to Apple Game Center or Google Play Games, Classic scores and achievements can be submitted to that service. Your profile and visibility are managed by Apple or Google. Make sure you are signed in to the correct platform account.'],
      ['How can I restore a No Ads purchase?', 'Use the game’s restore-purchases option with the store account used for the purchase. Store purchases do not automatically transfer between Apple and Google. The price and scope shown in the purchase screen apply. For billing or refunds, use the relevant store’s help; do not email us card or bank details.'],
      ['How do I manage privacy choices?', 'Where required, use the privacy option in Settings to revisit Google’s consent choices. On iOS, tracking permission is managed through system Settings. Game Center and Google Play Games have separate profile and privacy controls.'],
      ['How can I delete data or request help?', `Remove local data through your device’s app-storage controls, where available, or by removing the app. OS backups, store purchase records and platform scores are separate and are managed with Apple or Google. For access, correction or deletion of support emails, contact ${mail} from the address you originally used.`]
    ]
  };
  push.ko.support = {
    ...waddle.ko.support,
    description: 'Push Burst의 로컬 기록, 광고 제거 구매, 순위표, 업적, 개인정보에 관한 고객지원입니다.',
    questions: [
      ['어떤 모드가 있나요?', '클래식에서는 높은 점수에 도전하고, 퍼즐에서는 준비된 문제를 풀 수 있어요. 젤리 블록을 알맞은 자리로 밀어 넣어 블록을 터뜨리고 연쇄를 만들어 보세요.'],
      ['기록은 어디에 저장되나요?', '최고 점수, 퍼즐 진행, 설정, 안내 확인 여부, 힌트 수와 구매 권한을 기기에 저장해요. 운영자가 제공하는 저장 서버는 없어요. 앱 삭제나 데이터 삭제 시 기록을 잃을 수 있고 OS 백업의 동작은 별도예요. 순위표는 전체 게임 기록의 백업 기능이 아니에요.'],
      ['순위표와 업적은 어떻게 동작하나요?', 'Apple Game Center 또는 Google Play Games에 로그인하면 클래식 점수와 업적을 해당 서비스에 전송할 수 있어요. 프로필과 공개 범위는 Apple 또는 Google에서 관리해요. 올바른 플랫폼 계정에 로그인했는지 확인해 주세요.'],
      ['광고 제거 구매를 복원하려면요?', '구매할 때 사용한 스토어 계정으로 게임의 구매 복원 기능을 이용해 주세요. Apple과 Google의 구매는 서로 자동 이전되지 않아요. 가격과 제공 범위는 구매 화면에 표시된 내용을 따라요. 결제·환불은 해당 스토어의 도움말을 이용해 주시고 카드나 계좌 정보는 이메일로 보내지 마세요.'],
      ['개인정보 선택을 바꾸려면요?', '필요한 경우 설정의 개인정보 선택에서 Google 동의 내용을 다시 확인할 수 있어요. iOS 추적 권한은 시스템 설정에서 관리해요. Game Center와 Google Play Games의 프로필과 공개 범위는 각각의 설정을 이용해 주세요.'],
      ['데이터 삭제나 문의는 어떻게 하나요?', `기기가 제공하는 앱 저장공간 설정이나 앱 제거로 로컬 데이터를 삭제할 수 있어요. OS 백업, 스토어 구매 기록과 플랫폼에 전송된 점수는 별도이며 Apple 또는 Google에서 관리해요. 문의 이메일의 열람·정정·삭제는 문의했던 주소에서 ${mail}로 요청해 주세요.`]
    ]
  };

  for (const lang of ['en', 'ko']) {
    const en = lang === 'en';
    const p = push[lang].privacy;
    p.description = en ? 'How Push Burst handles local progress, advertising, Game Center, Google Play Games, purchases and support.' : 'Push Burst의 로컬 기록, 광고, Game Center, Google Play Games, 구매와 고객지원 정보 처리 안내입니다.';
    p.intro = en
      ? `This policy applies to Push Burst, operated by ${config.operator} (also styled Project Unknown), and its support pages. App identifier: <span class="identifier">${config.games['push-burst'].packageName}</span>. Contact: ${mail}.`
      : `이 방침은 ${config.operator}(Project Unknown으로도 표기)가 운영하는 Push Burst와 지원 페이지에 적용됩니다. 앱 식별자는 <span class="identifier">${config.games['push-burst'].packageName}</span>이며 문의처는 ${mail}입니다.`;
    p.summary = en
      ? 'Your save is local. Ads use Google. Platform leaderboards and purchases use Apple or Google. Support emails are handled separately. Removing the app does not automatically delete records held by those services.'
      : '게임 기록은 기기에 저장됩니다. 광고는 Google을, 플랫폼 순위표와 구매는 Apple 또는 Google을 이용합니다. 지원 이메일은 별도로 처리합니다. 앱을 삭제해도 외부 서비스가 보관하는 기록이 자동으로 모두 삭제되지는 않습니다.';
    p.sections = p.sections.map(section => {
      const [id, title, body] = section;
      if (id === 'local-data') return [id, title, en
        ? '<p>Push Burst stores best scores, cleared puzzle stages, themes, sound and vibration settings, tutorial status, remaining free hints, achievements and the No Ads purchase entitlement on your device. These records provide gameplay and remember your choices.</p><p>We do not run our own gameplay server or require a developer account. Device backups may separately contain local data. Platform scores, achievements and purchases described below are distinct from local saves; clearing the app does not delete those provider records.</p>'
        : '<p>Push Burst는 최고 점수, 클리어한 퍼즐 단계, 테마, 소리·진동 설정, 안내 확인 여부, 남은 무료 힌트, 업적과 광고 제거 구매 권한을 기기에 저장합니다. 플레이를 제공하고 진행 상황과 선택을 기억하기 위해 사용하는 정보입니다.</p><p>운영자 자체 게임 서버나 별도의 개발자 계정은 없습니다. 기기 백업에 로컬 데이터가 포함될 수 있습니다. 아래에 설명한 플랫폼 점수·업적·구매 정보는 로컬 저장과 별개로, 앱을 지워도 해당 제공자의 기록이 함께 지워지는 것은 아닙니다.</p>'];
      if (id === 'advertising') return [id, title, en
        ? `<p>Push Burst uses Google AdMob for interstitial and optional rewarded ads, and UMP for applicable consent choices. Google may process device or advertising identifiers, IP-derived approximate location, app and ad interactions, and diagnostics to provide and measure ads and prevent fraud. Device model, operating system and language may also be used in providing the service.</p><p>The app requests updated consent information and requests ads when UMP permits. Privacy choices are available in Settings when required. On iOS, the app requests App Tracking Transparency permission before accessing tracking-authorised advertising identifiers. Refusing personalised ads or tracking does not stop every other form of SDK processing.</p><p>See the ${google} and <a href="https://policies.google.com/technologies/partner-sites">Google partner data notice</a> for Google’s processing and controls.</p>`
        : `<p>Push Burst는 Google AdMob 전면 광고 및 선택형 보상 광고와 동의 관리를 위한 UMP를 사용합니다. Google은 광고 제공·측정과 부정 이용 방지 등을 위해 기기·광고 식별자, IP 기반 대략적 위치, 앱·광고 상호작용과 진단 정보를 처리할 수 있습니다. 서비스 제공 시 기기 모델, 운영체제와 언어도 이용될 수 있습니다.</p><p>앱은 동의 정보를 갱신하고 UMP가 허용할 때 광고를 요청합니다. 필요한 경우 설정에서 개인정보 선택을 다시 확인할 수 있습니다. iOS에서는 추적이 허용된 광고 식별자에 접근하기 전에 앱 추적 투명성(ATT) 권한을 요청합니다. 맞춤 광고나 추적을 거부해도 SDK의 다른 모든 정보 처리가 중단되는 것은 아닙니다.</p><p>자세한 처리와 선택 기능은 ${google} 및 <a href="https://policies.google.com/technologies/partner-sites?hl=ko">Google 파트너 데이터 이용 안내</a>를 확인해 주세요.</p>`];
      if (id === 'sharing') return [id, title, en
        ? `<p>Recipients include Google for ads, consent, Play Games, store purchases and support email; Apple for Game Center and store purchases; and GitHub for this website. We do not publish support emails or sell local saves. Information may also be disclosed where legally required or necessary for a security issue or legal claim.</p><p>Providers can process data in the United States and other countries where they operate. Their policies describe transfer safeguards and data handling: ${google}, ${apple}, and <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement">GitHub Privacy Statement</a>.</p>`
        : `<p>이용하는 서비스 제공자는 광고·동의·Play Games·스토어 구매·지원 이메일을 위한 Google, Game Center·스토어 구매를 위한 Apple과 웹 호스팅을 위한 GitHub입니다. 문의 이메일을 공개하거나 로컬 저장 기록을 판매하지 않습니다. 법령상 의무나 보안 문제·법적 분쟁 대응에 필요한 경우에도 정보가 제공될 수 있습니다.</p><p>제공자는 미국 등 사업을 운영하는 국가에서 정보를 처리할 수 있습니다. 이전 보호조치와 처리에 관한 내용은 ${google}, ${apple}, <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement">GitHub 개인정보 안내</a>에서 확인할 수 있습니다.</p>`];
      if (id === 'age') return [id, title, body.replaceAll('Waddle Survival', 'Push Burst')];
      return section;
    });
    p.sections.splice(2, 0,
      ['platforms', en ? 'Leaderboards and achievements' : '순위표와 업적', en
        ? `<p>When signed in to Apple Game Center or Google Play Games, the app submits Classic scores and achievements to that service. The service manages player identifiers, nickname, profile and visibility. Scores or achievements may be visible to other players according to the service’s settings. We do not receive your account password.</p><p>Manage these records and visibility with Apple or Google; deleting a local save does not remove them. See ${gameCenter} and the ${google}. These services are not a full backup of your game progress.</p>`
        : `<p>Apple Game Center 또는 Google Play Games에 로그인하면 앱은 클래식 점수와 업적을 해당 서비스에 제출합니다. 서비스는 플레이어 식별자, 닉네임, 프로필과 공개 범위를 관리하며 설정에 따라 다른 이용자에게 점수나 업적이 보일 수 있습니다. 운영자가 계정 비밀번호를 받지는 않습니다.</p><p>이 기록과 공개 범위는 Apple 또는 Google에서 관리해 주세요. 로컬 저장을 지워도 플랫폼 기록은 삭제되지 않습니다. ${gameCenter}와 ${google}를 참고해 주세요. 이 서비스가 전체 게임 진행의 백업을 제공하는 것은 아닙니다.</p>`],
      ['purchases', en ? 'Store purchases' : '스토어 구매', en
        ? `<p>The optional No Ads purchase is processed by the App Store or Google Play. The app receives purchase or transaction information and entitlement status to grant the purchased feature and restore eligible purchases. We do not receive your card or bank details on a developer server.</p><p>Apple and Google retain transaction records under their policies and legal obligations. Removing the app does not erase a store purchase. Manage purchases, billing and refund requests through the relevant store. See the ${apple} and ${google}.</p>`
        : `<p>선택형 광고 제거 구매는 App Store 또는 Google Play가 처리합니다. 앱은 구매 기능 제공과 유효한 구매 복원을 위해 구매·거래 정보와 권한 상태를 받습니다. 카드나 은행 정보는 운영자 서버로 전달받지 않습니다.</p><p>Apple과 Google은 각 정책과 법령상 의무에 따라 거래 기록을 보관합니다. 앱 제거로 스토어 구매가 삭제되지는 않습니다. 구매, 결제, 환불은 해당 스토어에서 관리해 주세요. ${apple}와 ${google}를 참고할 수 있습니다.</p>`]);
  }

  const common = {
    en: {
      nav: { home: 'Our games', support: 'Support', privacy: 'Privacy', terms: 'Terms' },
      home: { title: 'ProjectUnknown Games | Waddle Survival & Push Burst', description: 'Discover Waddle Survival, a cute penguin survival game, and Push Burst, a jelly block puzzle. Find official mobile downloads and support from ProjectUnknown.', eyebrow: 'Made for your little breaks', headline: 'Little games.<br>Lovely <em>moments.</em>', intro: 'A satisfying pop. An unexpected escape. Discover small games with plenty of personality.', view: 'Explore the game', support: 'Get support', pushType: 'Jelly-block puzzle', waddleType: 'Survival arcade', pushBody: 'A little thinking, a little pushing, and a whole lot of popping.', waddleBody: 'Dodge the snowballs. Chase the fish. Stay very, very cute.' },
      footer: 'Small games. A little more joy.',
      support: { title: 'Let’s get you back to playing.', description: 'Official support for Push Burst and Waddle Survival by ProjectUnknown.', eyebrow: 'Player support', intro: 'Choose your game for controls, saved progress, purchases and privacy help.', contact: 'Send us a note', contactBody: 'Tell us which game you are playing, your device model, operating-system version, game version and what happened. Please do not include passwords or payment details.' },
      privacy: { title: 'Privacy, by game.', description: 'Privacy policies for Push Burst, Waddle Survival and the ProjectUnknown website.', eyebrow: 'Your information', intro: 'Different games use different services. Choose your game to see exactly which policy applies.', push: 'Local progress, ads, platform leaderboards and optional purchases.', waddle: 'Local progress, cosmetic unlocks and ads. No game account, leaderboard or in-app purchases.', link: 'Read privacy policy', webTitle: 'When you visit this website', webBody: 'We do not add tracking scripts, advertising, third-party fonts, cookies or local-storage tracking to these pages. GitHub Pages provides hosting and may process IP addresses and request information to operate and secure its services.', contact: 'For a privacy request, include the game name and email us at', website: 'GitHub Privacy Statement' },
      termsIntro: `These terms apply to <strong>Push Burst</strong> and <strong>Waddle Survival</strong>, provided by ${config.operator} (also styled Project Unknown). Read them before playing. If you do not agree, do not use the games. Contact: ${mail}.`,
      termsScope: '<p>Both games provide local gameplay without a developer account. The following differences matter:</p><ul><li><strong>Push Burst:</strong> jelly-block Classic and Puzzle modes, optional platform leaderboards and achievements, advertising and an optional No Ads purchase.</li><li><strong>Waddle Survival:</strong> endless survival, local records and cosmetic unlocks, and advertising. There are no in-app purchases or public leaderboards.</li></ul><p>A feature described for one game does not imply it exists in the other.</p>',
      termsPurchases: '<p>Only Push Burst currently offers an optional No Ads purchase. The scope and price displayed by the game and store at purchase time apply. Purchases and eligible restoration are handled by Apple or Google. Purchases do not automatically transfer between different stores; refunds follow store procedures and applicable law. These terms do not waive mandatory refund rights.</p><p>Waddle Survival currently has no in-app purchases or subscriptions. Its cosmetic unlocks have no cash value and cannot be traded or redeemed through the game.</p>'
    },
    ko: {
      nav: { home: '게임 소개', support: '고객지원', privacy: '개인정보처리방침', terms: '이용약관' },
      home: { title: 'ProjectUnknown 게임 | Waddle Survival·Push Burst', description: 'ProjectUnknown의 모바일 게임을 만나보세요. 펭귄 생존 게임 Waddle Survival와 젤리 블록 퍼즐 Push Burst의 공식 다운로드 링크, 게임 소개와 고객지원을 제공합니다.', eyebrow: '잠깐의 여유가 조금 더 즐겁도록', headline: '작은 게임,<br>기분 좋은 <em>순간.</em>', intro: '시원하게 터지는 블록, 아슬아슬하게 피한 눈덩이. 저마다의 매력을 가진 작은 게임들을 만나보세요.', view: '게임 알아보기', support: '고객지원', pushType: '젤리 블록 퍼즐', waddleType: '무한 생존 아케이드', pushBody: '조금 생각하고, 살짝 밀고, 기분 좋게 팡팡!', waddleBody: '눈덩이는 요리조리, 물고기는 냠냠. 귀여움은 가득.' },
      footer: '작은 게임으로 전하는 기분 좋은 순간.',
      support: { title: '게임 고객지원', description: 'ProjectUnknown의 Push Burst와 Waddle Survival 공식 고객지원입니다.', eyebrow: '고객지원', intro: '게임을 선택하면 조작, 기록, 구매와 개인정보에 관한 도움말을 볼 수 있어요.', contact: '이메일로 문의하기', contactBody: '게임 이름, 기기 모델, 운영체제 버전, 게임 버전과 어떤 일이 있었는지 알려주세요. 비밀번호나 결제 정보는 보내지 마세요.' },
      privacy: { title: '게임별 개인정보 안내', description: 'Push Burst, Waddle Survival 및 ProjectUnknown 웹사이트의 개인정보 처리 안내입니다.', eyebrow: '개인정보처리방침', intro: '게임마다 사용하는 서비스가 달라요. 이용하는 게임을 선택해 적용되는 방침을 확인해 주세요.', push: '로컬 기록, 광고, 플랫폼 순위표와 선택형 구매.', waddle: '로컬 기록, 의상 해금과 광고. 게임 계정, 순위표, 인앱 구매는 없어요.', link: '개인정보처리방침 보기', webTitle: '이 웹사이트를 방문할 때', webBody: '이 페이지에는 운영자가 추가한 추적 스크립트, 광고, 외부 폰트, 쿠키 또는 로컬 저장소 추적 기능이 없습니다. GitHub Pages가 호스팅을 제공하며 서비스 운영과 보안을 위해 IP 주소와 요청 정보 등을 처리할 수 있습니다.', contact: '개인정보 관련 요청은 게임 이름과 함께 아래 이메일로 보내주세요.', website: 'GitHub 개인정보 안내' },
      termsIntro: `이 약관은 ${config.operator}(Project Unknown으로도 표기)가 제공하는 <strong>Push Burst</strong>와 <strong>Waddle Survival</strong>에 적용됩니다. 플레이 전에 읽어주시고 동의하지 않는 경우 이용하지 마세요. 문의처는 ${mail}입니다.`,
      termsScope: '<p>두 게임은 개발자 계정 없이 로컬 플레이를 제공하며, 기능에는 다음과 같은 차이가 있습니다.</p><ul><li><strong>Push Burst:</strong> 젤리 블록 클래식·퍼즐 모드, 선택형 플랫폼 순위표·업적, 광고와 선택형 광고 제거 구매.</li><li><strong>Waddle Survival:</strong> 무한 생존, 로컬 기록·의상 해금과 광고. 인앱 구매와 공개 순위표는 없습니다.</li></ul><p>한 게임에 관한 기능 설명이 다른 게임에도 해당 기능이 있다는 의미는 아닙니다.</p>',
      termsPurchases: '<p>현재 선택형 광고 제거 구매는 Push Burst에만 있습니다. 구매 당시 게임과 스토어에 표시된 제공 범위와 가격이 적용됩니다. 구매와 유효한 구매 복원은 Apple 또는 Google이 처리합니다. 서로 다른 스토어로 구매가 자동 이전되지 않으며 환불은 스토어 절차와 관련 법을 따릅니다. 법정 환불 권리를 제한하지 않습니다.</p><p>Waddle Survival에는 현재 인앱 구매와 구독이 없습니다. 외형 해금에는 현금 가치가 없고 게임을 통한 거래나 현금 교환을 제공하지 않습니다.</p>'
    }
  };
  for (const lang of ['en', 'ko']) {
    const en = lang === 'en';
    common[lang] = { ...waddle[lang], ...common[lang] };
    const terms = structuredClone(waddle[lang].terms);
    terms.description = en ? 'Shared terms for Push Burst and Waddle Survival, with game-specific purchases, advertising and platform features.' : 'Push Burst와 Waddle Survival의 공통 이용약관과 게임별 구매·광고·플랫폼 기능 안내입니다.';
    terms.intro = common[lang].termsIntro;
    terms.sections.unshift(['scope', en ? 'Games covered by these terms' : '적용되는 게임과 기능', common[lang].termsScope]);
    terms.sections = terms.sections.map(([id, title, body]) => {
      if (id === 'progress') return [id, en ? 'Saved progress' : '게임 기록', en
        ? '<p>Both games save progress locally. There is no developer-operated full-save recovery or cross-device sync service. Removing the app, clearing storage or losing your device may lose progress. OS backups and Push Burst platform records are separate; recovery is not guaranteed. Scores and achievements do not have cash value.</p>'
        : '<p>두 게임의 진행 기록은 기기에 저장됩니다. 운영자가 제공하는 전체 기록 복구나 기기 간 동기화 서비스는 없습니다. 앱 제거, 데이터 삭제나 기기 분실로 기록을 잃을 수 있습니다. OS 백업과 Push Burst의 플랫폼 기록은 별개이며 복구를 보장하지 않습니다. 점수와 업적에는 현금 가치가 없습니다.</p>'];
      if (id === 'ads') return [id, title, en
        ? '<p>Both mobile games use Google AdMob. Push Burst supports interstitial and optional rewarded ads; Waddle Survival may show an interstitial when you choose to start the next run after a completed run. Availability, rewards where offered and presentation depend on the displayed offer, provider, network and applicable privacy choices. No fixed ad duration is promised.</p><p>Third-party ads and external services have their own terms and policies. You are responsible for your connection and any mobile-data charges. Push Burst platform rankings and achievements also follow Apple or Google’s service rules.</p>'
        : '<p>두 모바일 게임은 Google AdMob을 사용합니다. Push Burst는 전면·선택형 보상 광고를 지원하고, Waddle Survival는 한 판을 마친 후 직접 다음 판을 시작할 때 전면 광고가 나올 수 있습니다. 광고 제공 여부, 제공되는 경우의 보상과 표시 방식은 화면에 안내된 제안, 제공자, 네트워크와 개인정보 선택에 따라 달라지며 고정 재생 시간을 약속하지 않습니다.</p><p>제3자 광고와 외부 서비스에는 해당 서비스의 약관과 정책이 적용됩니다. 통신 연결과 데이터 요금은 이용자가 관리합니다. Push Burst의 플랫폼 순위표와 업적에는 Apple 또는 Google의 서비스 규칙도 적용됩니다.</p>'];
      return [id, title, body];
    });
    terms.sections.splice(4, 0, ['purchases', en ? 'Purchases and cosmetics' : '구매와 외형 아이템', common[lang].termsPurchases]);
    common[lang].terms = terms;
  }
  const result = { common, games: { 'push-burst': push, 'waddle-rush': waddle } };
  applyPlatformDisclosures(result);
  return result;
}
