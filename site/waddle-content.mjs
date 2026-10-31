// Public copy. Operator/contact facts are injected from store/release.json.
// These are proposed policies until the operator completes the review in README.md.
export function content({ operator, email, packageName, cosmeticCount, slotCount, retention }) {
  const mail = `<a href="mailto:${email}">${email}</a>`;
  const google = '<a href="https://policies.google.com/privacy">Google Privacy Policy</a>';
  const partners = '<a href="https://policies.google.com/technologies/partner-sites">Google’s partner data notice</a>';
  const googleKo = '<a href="https://policies.google.com/privacy?hl=ko">Google 개인정보처리방침</a>';
  const partnersKo = '<a href="https://policies.google.com/technologies/partner-sites?hl=ko">Google 파트너 데이터 이용 안내</a>';
  const github = '<a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement">GitHub Privacy Statement</a>';
  const keep = retention === 'one-year'
    ? ['Support messages and attachments are deleted within one year after a request is resolved, unless a longer period is required by law or necessary for an unresolved dispute.', '문의 이메일과 첨부파일은 처리 완료 후 1년 이내에 삭제합니다. 법령상 보관 의무가 있거나 미해결 분쟁 대응에 필요한 경우에는 해당 사유가 해소될 때까지 별도로 보관할 수 있습니다.']
    : retention === '90-days'
    ? ['Support messages and attachments are deleted within 90 days after a request is resolved, unless a longer period is required by law or necessary for an unresolved dispute.', '문의 이메일과 첨부파일은 처리 완료 후 90일 이내에 삭제합니다. 법령상 보관 의무가 있거나 미해결 분쟁 대응에 필요한 경우에는 해당 사유가 해소될 때까지 별도로 보관할 수 있습니다.']
    : ['Support messages and attachments are kept only as long as needed to resolve the request and necessary follow-up, meet legal obligations, or handle a dispute. They are deleted when those purposes no longer apply.', '문의 이메일과 첨부파일은 문의 처리와 필요한 후속 대응, 법령상 의무 이행 또는 분쟁 대응에 필요한 동안만 보관하며, 그 필요가 없어지면 삭제합니다.'];

  return {
    en: {
      nav: { home: 'The game', support: 'Support', privacy: 'Privacy', terms: 'Terms' },
      skip: 'Skip to content', language: 'Choose language', homeLabel: 'Waddle Survival home',
      footer: 'A little penguin. A big adventure on ice.', operatorLabel: 'Developed by',
      review: 'Pre-publication draft. Support retention and regional privacy details are awaiting operator review.',
      updated: 'Last updated', effective: 'Effective upon publication of the approved policy.', contents: 'On this page', backTop: 'Back to top',
      home: {
        title: 'Waddle Survival — Penguin Survival Game | ProjectUnknown',
        description: 'Dodge snowballs, collect fish, slide and fly in Waddle Survival. Discover a cute penguin survival arcade, challenge a friend and find official mobile downloads.',
        eyebrow: 'A pocket-sized adventure on ice',
        headline: 'Little penguin.<br>Big <em>rush.</em>',
        intro: 'Snowballs everywhere. Golden fish worth chasing. One very determined little penguin.',
        discover: 'Meet Waddle Survival', help: 'Need a hand?', availability: 'Getting ready for mobile.',
        artAlt: 'Waddle Survival penguin with a red scarf, wings out and ready for an adventure',
        sticker: 'Small feet.<br>Big moves.',
        sectionLabel: 'One more little adventure',
        sectionTitle: 'Waddle. Slide.<br>Spread your wings.',
        sectionIntro: 'Find your way through the snowballs, then chase a new personal best. Every run is a fresh little challenge.',
        features: [
          ['01', 'A close call, a big grin.', 'Keep moving as snowballs roll in from every side. A well-timed belly slide helps you slip through the chaos.'],
          ['02', 'Good fish. Great energy.', 'Collect golden fish for points and flight energy. Fill up, flap your wings and soar over the snowballs for a short escape.'],
          ['03', 'Your very own little look.', `Unlock accessories across ${slotCount} categories, from cosy scarves to little wings. All style, with no change to collision or speed.`],
          ['04', 'Share the ice with a friend.', 'Create a six-digit invite code and face a friend on the same ice. Race for fish, nudge each other and see who survives longer.']
        ],
        note: 'Designed for portrait play · 16 game languages · Progress saved on your device',
        supportTitle: 'A little help, right here.', supportBody: 'Questions about playing, progress or privacy? We’re only an email away.', supportLink: 'Visit support',
        playStore: 'Get it on Google Play', appStore: 'Download on the App Store'
      },
      support: {
        title: 'A little help, right here.', eyebrow: 'Player support',
        description: 'Get help with Waddle Survival controls, progress, advertising and privacy, or contact ProjectUnknown.',
        intro: 'Stuck on something? Start with the answers below, or send us a note.',
        contact: 'Send us a note', emailLabel: 'Email support',
        contactBody: 'Please include your device model, OS version, game version, selected language and what happened. Screenshots are welcome if they help explain the issue.',
        safety: 'Please leave out passwords, advertising IDs, payment details and unrelated personal information.',
        faqTitle: 'Good to know',
        questions: [
          ['How do I play?', 'Hold your phone in portrait. Touch and drag on the left to move; use the right button to belly slide. Sliding is not invincible. Golden fish fill your energy; once flight is ready, the flight button lets you briefly fly over snowballs.'],
          ['Where are my scores and outfits saved?', 'Your progress is saved on your device. There is no game account, cross-device sync or developer-operated cloud backup. Clearing app data, reinstalling or changing devices may lose progress. Operating-system backups can behave differently. Contact us before deleting data if you are investigating a problem; we cannot promise to recover a lost local save.'],
          ['When can an advertisement appear?', 'After a completed run, an interstitial may appear when you choose to start or retry. It does not automatically interrupt a run or appear at the instant of game over. The pending ad turn survives an app restart. Whether an ad is shown depends on connection, consent requirements and availability; the ad provider controls its close button.'],
          ['Can I change language or sound?', 'Yes. Open Settings to follow your device language or choose from 16 languages. Music and sound effects have separate controls.'],
          ['How do I change advertising privacy choices?', 'Where required by Google’s consent system, Settings includes a privacy-options button to revisit your choices. Your device also offers advertising and privacy controls. See the privacy policy for more details.'],
          ['How can I delete data or make a privacy request?', `You can remove local progress by clearing the app’s storage using your device controls, where available, or by removing the app. This is irreversible without a usable backup; OS backups are managed separately. There is no game account to close. To request access, correction or deletion of support emails, contact ${mail} from the address you used. Google manages advertising data under its own controls and policy.`]
        ]
      },
      privacy: {
        title: 'Privacy policy', eyebrow: 'Your information',
        description: 'How Waddle Survival handles local game progress, Google AdMob advertising, support requests and website visits.',
        intro: `This policy describes how ${operator} handles information in Waddle Survival and on this website. Android package: <span class="identifier">${packageName}</span>. Privacy contact: ${mail}.`,
        summaryTitle: 'The short version',
        summary: 'Your game progress stays on your device. Mobile ads use Google’s services. If you email us, we use your message to help you. The details below explain each separately.',
        sections: [
          ['local-data', 'Game progress on your device', `<p>The game stores best scores, run statistics, collected-fish and outfit progress, equipped cosmetics, language and sound settings, tutorial flags, and the completed-run advertising counter locally. These records make the game work and remember your choices.</p><p>There is no game account, public leaderboard, chat, or developer-operated gameplay server. We do not upload these save records to our own server. Your device or operating system may separately include them in backups. Local records remain until removed or overwritten; clearing storage can permanently erase them.</p>`],
          ['advertising', 'Advertising and consent', `<p>The mobile release uses Google AdMob and Google’s User Messaging Platform (UMP). Depending on platform and applicable choices, Google’s SDKs may process IP-derived approximate location, device or advertising identifiers, app and ad interactions, and diagnostic or performance data to provide and measure ads and prevent fraud.</p><p>The app refreshes consent information and requests ads only when the consent SDK permits. Where required, you can revisit privacy options in Settings. Device advertising controls offer additional choices. Turning off personalised ads does not stop every form of ad-related processing.</p><p>Read the ${google} and ${partners} for Google’s purposes, controls, retention and data handling. Advertising services may process data outside your country. We do not operate a separate game analytics service. Development builds and the Mac preview do not initialise AdMob.</p>`],
          ['support-data', 'Information you send to support', `<p>If you email ${mail}, we receive your email address, any name included in the message, and the text or attachments you choose to send. We use these to answer your request, investigate the reported issue and manage necessary follow-up. Support uses Gmail, provided by Google; its processing is described in the ${google}.</p><p>You choose whether to contact us and what to include. Do not send passwords, payment information, identity documents or unrelated sensitive information.</p>`],
          ['website', 'This website', `<p>The pages do not include advertising, analytics scripts, third-party fonts, embedded video, cookies or local-storage tracking added by us. Opening an email link uses your email application; it does not submit a web form.</p><p>GitHub Pages hosts this site. GitHub may process IP addresses and request or device information to deliver and secure its services. See the ${github}. External links take you to services with their own policies.</p>`],
          ['retention', 'Retention and deletion', `<p>${keep[0]}</p><p>Local game data can be removed through your device’s app-storage controls, where available, or by removing the app. This does not necessarily remove operating-system backups. You can manage those using your backup provider’s tools.</p><p>Google controls retention of data processed by its advertising services; we cannot erase those records directly from your phone or from a game account that does not exist. Use Google’s linked policy and privacy controls, or contact us for help identifying the appropriate route.</p>`],
          ['sharing', 'Recipients and international processing', `<p>The providers described above are Google for advertising, consent and support email, and GitHub for hosting. Support information is not published on this site. We may disclose information if legally required, or as necessary to address a security issue or legal claim. We do not sell support emails or local game saves.</p><p>Providers may process information in the United States and other countries where they operate. Their policies describe locations and transfer safeguards. Applicable regional disclosures depend on where the game is distributed; an advertising choice in the app should not be read as a guarantee that no data leaves your country.</p>`],
          ['rights', 'Your choices and rights', `<p>Depending on your location, you may have rights to access, correct or delete personal information, restrict or object to processing, withdraw consent, or receive a copy of information. To ask about information we handle, email ${mail}. We may need limited information to verify that the request concerns you. Withdrawing consent does not undo processing that was lawful before withdrawal.</p><p>Where data-protection law requires a legal basis, support processing is based on responding to your request and our legitimate interest in providing assistance, or compliance with applicable legal obligations. Optional processing that requires consent relies on that consent. Google’s legal bases are explained in its own policy. You may also contact your local data-protection authority.</p>`],
          ['age', 'Children and young players', `<p>Waddle Survival is intended for ages 13 and older and is not directed to children under 13. This is the intended audience, not an age-verification feature or a store content rating. Younger players may need permission from a parent or guardian under local law.</p><p>If you believe a child has sent us personal information in a support request, contact us so we can review and, where appropriate, delete it. Regional age-of-consent requirements and protections for minors still apply.</p>`],
          ['security', 'Security', '<p>We aim to limit access to support information to people who need it to handle your request and to use appropriate account safeguards. No method of storage or transmission is completely secure. Protect access to your device and avoid sending unnecessary sensitive information.</p>'],
          ['changes', 'Changes and contact', `<p>We update the date on this page when the policy changes. Material changes will be communicated through appropriate available channels before they apply where required by law.</p><p>Operator: ${operator}<br>Privacy and support contact: ${mail}</p>`]
        ]
      },
      terms: {
        title: 'Terms of use', eyebrow: 'Playing together, fairly',
        description: 'Terms for using Waddle Survival, including local progress, cosmetic unlocks, advertising and support.',
        intro: `These terms describe the use of Waddle Survival, provided by ${operator}. Please read them before playing. If you do not agree, do not use the game. Questions: ${mail}.`,
        sections: [
          ['eligibility', 'Who can play', '<p>The game is intended for people aged 13 and older. If you are below the age at which you can agree to these terms in your country, ask a parent or legal guardian to review and agree with you. Follow the age rating and requirements of the store through which you obtain the game.</p>'],
          ['use', 'Your use of the game', '<p>You may download and play an authorised copy for personal, non-commercial enjoyment, subject to these terms and the applicable store rules. The game, artwork, sound, code and branding remain the property of their respective owners. Your permission to play does not transfer ownership of them.</p><p>Do not distribute unauthorised copies, misrepresent yourself as the developer, use the game to harm others, or bypass technical protections. Do not tamper with records to mislead others. Nothing in these terms limits uses that applicable law expressly permits.</p>'],
          ['progress', 'Local progress and cosmetic items', '<p>Scores, statistics and cosmetic unlocks are saved locally. There is no game account or developer-operated cross-device recovery service. Reinstallation, clearing data, device loss or some updates may result in lost progress. Keep your device secure and manage operating-system backups where available; recovery is not guaranteed.</p><p>Cosmetics change appearance only. Unlocks and scores are game features, have no cash value and cannot be redeemed or traded through the game. The current version has no in-app purchases or subscription.</p>'],
          ['ads', 'Advertisements and external services', '<p>The mobile release includes advertisements from Google AdMob. An interstitial may be offered before the next run after you finish a run. Availability and presentation depend on the provider, network and applicable privacy choices. The game does not promise a fixed ad duration.</p><p>Advertising and external websites are operated by third parties. Review their terms and privacy policies before interacting or buying anything. You are responsible for your connection and any mobile-data charges.</p>'],
          ['updates', 'Updates and availability', '<p>We may improve or change gameplay, balance, cosmetics and compatibility, or fix problems. Records may be separated when game rules change. We may also discontinue features or the game, subject to applicable law and any required notice. We do not promise uninterrupted availability or compatibility with every future device or operating-system version.</p>'],
          ['fairness', 'Responsibilities and statutory rights', '<p>Please play in a safe place and take breaks. You are responsible for your device and how you use the game. We are responsible for the game to the extent required by applicable law. These terms do not exclude mandatory consumer rights or liability that cannot lawfully be excluded, including for intentional misconduct or other legally protected claims.</p>'],
          ['privacy', 'Privacy', '<p>Our privacy policy explains local game storage, advertising, support email and website hosting. Privacy choices and any legally required consent are handled separately from these terms. Accepting these terms is not blanket consent to personal-data processing.</p>'],
          ['changes', 'Changes, stopping play and contact', `<p>You may stop using and remove the game at any time. If these terms change, we update the date on this page and provide any notice or agreement mechanism required by law. Changes do not remove rights you already have under applicable law.</p><p>For support or a concern about these terms, contact ${operator} at ${mail}. Your mandatory local legal protections continue to apply.</p>`]
        ]
      },
      notFound: { title: 'A little off the ice.', description: 'This page could not be found.', body: 'The page may have moved. Let’s get you back to Waddle Survival.', link: 'Back to the game website' }
    },
    ko: {
      nav: { home: '게임 소개', support: '고객지원', privacy: '개인정보처리방침', terms: '이용약관' },
      skip: '본문으로 바로 가기', language: '언어 선택', homeLabel: 'Waddle Survival 홈',
      footer: '작은 펭귄의 커다란 빙판 모험.', operatorLabel: '개발 및 운영',
      review: '게시 전 검토본입니다. 고객지원 정보의 보관 기준과 배포 지역별 개인정보 고지사항을 운영자가 확인 중입니다.',
      updated: '최종 수정일', effective: '검토를 마친 정책의 공개일부터 적용됩니다.', contents: '이 페이지의 내용', backTop: '맨 위로',
      home: {
        title: 'Waddle Survival — 펭귄 생존 게임 | ProjectUnknown',
        description: '눈덩이를 피하고 물고기를 모아 슬라이드하고 날아오르는 펭귄 생존 게임 Waddle Survival. 친구 대전, 모바일 다운로드 링크와 공식 고객지원을 확인하세요.',
        eyebrow: '손안에서 펼쳐지는 빙판 모험',
        headline: '작은 펭귄의<br><em>커다란</em> 도전.',
        intro: '사방에서 굴러오는 눈덩이, 놓치기 아까운 황금 물고기. 오늘도 작은 펭귄은 씩씩하게 달려요.',
        discover: '어떤 게임인가요?', help: '도움이 필요해요', availability: '모바일 출시를 준비하고 있어요.',
        artAlt: '빨간 목도리를 두르고 날개를 펼친 귀여운 Waddle Survival 펭귄',
        sticker: '뒤뚱뒤뚱,<br>준비 완료!',
        sectionLabel: '자꾸만 한 번 더 하고 싶은',
        sectionTitle: '뒤뚱뒤뚱, 쓱—<br>그리고 파닥!',
        sectionIntro: '눈덩이 사이를 요리조리 지나 나만의 최고 기록에 도전해요. 한 판마다 새로운 작은 모험이 기다려요.',
        features: [
          ['01', '아슬아슬해서 더 짜릿해요.', '사방에서 굴러오는 눈덩이를 피해 계속 움직여요. 위기의 순간에는 배를 깔고 쓱 미끄러져요.'],
          ['02', '물고기를 먹고, 날아올라요.', '황금 물고기는 점수와 비행 에너지가 돼요. 에너지를 채우고 날개를 파닥여 눈덩이 위로 잠깐 날아올라요.'],
          ['03', '나만의 귀여움을 모아요.', `포근한 목도리부터 작은 날개까지, ${slotCount}가지 부위의 소품을 해금해요. 외형만 바뀌며 충돌 크기와 이동 속도는 같아요.`],
          ['04', '친구와 같은 빙판에서 겨뤄요.', '숫자 여섯 자리 초대 코드로 친구를 불러요. 같은 눈덩이를 피하고 물고기를 먼저 먹으며, 서로 밀어내고 누가 더 오래 살아남는지 겨뤄보세요.']
        ],
        note: '세로 화면 플레이 · 게임 내 16개 언어 · 기기에 저장되는 기록',
        supportTitle: '도움이 필요할 땐, 여기로.', supportBody: '플레이 방법, 기록, 개인정보까지. 궁금한 점이 있다면 편하게 알려주세요.', supportLink: '고객지원 바로 가기',
        playStore: 'Google Play에서 다운로드', appStore: 'App Store에서 다운로드'
      },
      support: {
        title: '무엇을 도와드릴까요?', eyebrow: '고객지원',
        description: 'Waddle Survival의 조작, 기록, 광고, 개인정보에 관한 도움말과 ProjectUnknown 고객지원 연락처입니다.',
        intro: '궁금한 점은 아래에서 먼저 찾아보세요. 해결되지 않았다면 이메일로 알려주세요.',
        contact: '이메일로 문의하기', emailLabel: '지원 이메일',
        contactBody: '기기 모델, 운영체제 버전, 게임 버전, 선택 언어와 어떤 문제가 있었는지 알려주세요. 문제를 설명하는 스크린샷이 있으면 함께 보내주셔도 좋아요.',
        safety: '비밀번호, 광고 식별자, 결제 정보나 문제와 관계없는 개인정보는 보내지 마세요.',
        faqTitle: '자주 묻는 질문',
        questions: [
          ['어떻게 조작하나요?', '휴대폰을 세로로 들고 왼쪽을 누른 채 드래그하면 이동해요. 오른쪽 버튼으로 배를 깔고 슬라이드할 수 있지만, 슬라이드 중에도 눈덩이에 닿으면 게임이 끝나요. 황금 물고기로 에너지를 채우고 비행이 준비되면 비행 버튼을 눌러 잠시 눈덩이 위로 날아갈 수 있어요.'],
          ['기록과 의상은 어디에 저장되나요?', '게임 기록과 의상은 현재 기기에 저장돼요. 게임 계정, 기기 간 동기화, 운영자가 제공하는 클라우드 복원 기능은 없어요. 앱 데이터 삭제, 재설치, 기기 변경 시 기록을 잃을 수 있으며 OS 백업에 따른 동작은 별도예요. 문제가 생겼다면 데이터를 지우기 전에 문의해 주세요. 잃어버린 로컬 기록의 복구를 보장할 수는 없어요.'],
          ['광고는 언제 나오나요?', '한 판을 마친 뒤 직접 시작 또는 재도전을 누를 때 전면 광고가 나올 수 있어요. 플레이 도중이나 게임오버 직후에 자동으로 표시하지는 않아요. 앱을 다시 켜도 광고 차례는 유지돼요. 네트워크, 동의 요건, 광고 제공 상태에 따라 표시 여부가 달라지고 닫기 버튼은 광고 제공자가 관리해요.'],
          ['언어와 소리를 바꿀 수 있나요?', '설정에서 기기 언어를 따르거나 16개 언어 중 하나를 선택할 수 있어요. 배경음악과 효과음의 크기도 각각 조절할 수 있어요.'],
          ['광고 개인정보 선택을 바꾸려면 어떻게 하나요?', 'Google 동의 시스템에서 필요한 경우 설정에 개인정보 선택 버튼이 표시돼요. 여기서 선택을 다시 확인할 수 있어요. 기기 자체의 광고·개인정보 설정도 이용할 수 있으며 자세한 내용은 개인정보처리방침에서 확인해 주세요.'],
          ['데이터를 삭제하거나 개인정보 관련 요청을 하려면요?', `기기가 제공하는 앱 저장공간 설정에서 데이터를 지우거나 앱을 삭제해 로컬 기록을 제거할 수 있어요. 사용 가능한 백업이 없으면 되돌릴 수 없고, OS 백업은 별도로 관리해야 해요. 삭제할 게임 계정은 없어요. 문의 이메일의 열람·정정·삭제는 문의했던 주소에서 ${mail}로 요청해 주세요. 광고 데이터는 Google의 정책과 제어 기능에 따라 관리돼요.`]
        ]
      },
      privacy: {
        title: '개인정보처리방침', eyebrow: '개인정보 안내',
        description: 'Waddle Survival의 기기 내 게임 기록, Google AdMob 광고, 고객지원 문의 및 웹사이트 방문 정보 처리 안내입니다.',
        intro: `이 방침은 ${operator}이 Waddle Survival와 이 웹사이트에서 정보를 처리하는 방식을 설명합니다. Android 패키지명은 <span class="identifier">${packageName}</span>이며 개인정보 문의처는 ${mail}입니다.`,
        summaryTitle: '먼저 간단히 알려드려요',
        summary: '게임 기록은 기기에 저장됩니다. 모바일 광고에는 Google 서비스를 이용합니다. 이메일로 보내주신 정보는 문의를 해결하는 데 사용합니다. 아래에서 각각의 처리 방식을 확인할 수 있습니다.',
        sections: [
          ['local-data', '기기에 저장하는 게임 정보', '<p>게임은 최고 점수, 플레이 통계, 물고기 수집·의상 해금 기록, 장착한 소품, 언어·소리 설정, 안내 확인 여부와 광고 차례를 위한 완료 판 수를 기기에 저장합니다. 게임을 작동시키고 이용자의 진행 상황과 선택을 기억하기 위해 사용하는 정보입니다.</p><p>게임 계정, 공개 순위표, 채팅 및 운영자 자체 게임 서버는 없습니다. 이 저장 기록을 운영자의 서버로 업로드하지 않습니다. 기기나 운영체제의 별도 백업에는 포함될 수 있습니다. 기록은 삭제되거나 덮어쓰기 전까지 기기에 남으며, 앱 데이터 삭제 시 영구적으로 사라질 수 있습니다.</p>'],
          ['advertising', '광고와 동의', `<p>모바일 배포 버전은 Google AdMob과 동의 관리를 위한 UMP를 사용합니다. 플랫폼과 적용되는 선택에 따라 Google SDK가 IP 기반 대략적 위치, 기기·광고 식별자, 앱·광고 상호작용, 진단·성능 정보를 광고 제공·측정과 부정 이용 방지 등을 위해 처리할 수 있습니다.</p><p>앱은 동의 정보를 갱신하고 동의 SDK가 허용한 경우에 광고를 요청합니다. 필요한 경우 설정의 개인정보 선택에서 내용을 다시 확인할 수 있습니다. 기기의 광고·개인정보 설정도 이용할 수 있습니다. 맞춤 광고를 거부해도 광고와 관련된 모든 정보 처리가 중단되는 것은 아닙니다.</p><p>Google의 처리 목적, 선택 기능, 보관과 처리 방식은 ${googleKo} 및 ${partnersKo}에서 확인할 수 있습니다. 광고 서비스는 거주 국가 밖에서 정보를 처리할 수 있습니다. 별도의 게임 분석 서비스를 운영하지 않으며, 개발 빌드와 Mac 미리보기 버전은 AdMob을 초기화하지 않습니다.</p>`],
          ['support-data', '고객지원 문의 정보', `<p>${mail}로 문의하면 이메일 주소, 메일에 포함된 이름, 이용자가 작성한 내용과 첨부파일을 받습니다. 문의 답변, 제보한 문제의 확인, 필요한 후속 대응에 사용합니다. 문의를 받는 Gmail은 Google이 제공하며 관련 처리 방식은 ${googleKo}에서 확인할 수 있습니다.</p><p>문의를 보낼지와 어떤 정보를 포함할지는 이용자가 선택합니다. 비밀번호, 결제 정보, 신분증이나 문제와 관계없는 민감한 정보는 보내지 마세요.</p>`],
          ['website', '웹사이트 방문 정보', `<p>이 웹사이트에는 운영자가 추가한 광고, 방문 분석 스크립트, 외부 폰트, 영상 임베드, 쿠키 또는 로컬 저장소 추적 기능이 없습니다. 이메일 링크는 이용자의 메일 앱을 열며 웹 양식을 제출하지 않습니다.</p><p>GitHub Pages가 웹사이트를 호스팅합니다. GitHub는 서비스 제공과 보안을 위해 IP 주소, 요청·기기 정보 등을 처리할 수 있습니다. ${github}를 참고하세요. 외부 링크로 이동한 서비스에는 해당 서비스의 정책이 적용됩니다.</p>`],
          ['retention', '보관 및 삭제', `<p>${keep[1]}</p><p>기기 내 게임 정보는 기기에서 제공하는 앱 저장공간 설정이나 앱 제거를 통해 삭제할 수 있습니다. OS 백업까지 함께 삭제된다는 의미는 아니며 백업 제공자의 설정에서 별도로 관리해야 합니다.</p><p>광고 서비스에서 처리한 정보의 보관은 Google이 관리합니다. 운영자가 이용자의 기기나 존재하지 않는 게임 계정에서 해당 정보를 직접 지울 수는 없습니다. 위에 연결한 Google 정책과 개인정보 제어 기능을 이용하거나 적절한 요청 방법을 문의해 주세요.</p>`],
          ['sharing', '정보를 처리하는 서비스와 국외 처리', '<p>이 방침에 설명한 외부 서비스는 광고·동의·지원 이메일을 위한 Google과 웹 호스팅을 위한 GitHub입니다. 문의 내용은 이 사이트에 공개하지 않습니다. 법령에 따른 의무가 있거나 보안 문제 또는 법적 분쟁에 필요한 경우 정보를 제공할 수 있습니다. 문의 이메일이나 기기 내 저장 기록을 판매하지 않습니다.</p><p>서비스 제공자는 미국 등 사업을 운영하는 국가에서 정보를 처리할 수 있으며 처리 위치와 보호조치는 각 제공자의 정책에 안내되어 있습니다. 적용되는 지역별 고지사항은 실제 배포 국가에 따라 달라집니다. 앱에서 광고 선택을 했다는 사실만으로 국외 처리가 전혀 없다고 볼 수는 없습니다.</p>'],
          ['rights', '이용자의 선택과 권리', `<p>거주 지역에 따라 개인정보 열람·정정·삭제, 처리 제한·반대, 동의 철회 또는 정보 사본 제공을 요청할 권리가 있을 수 있습니다. 운영자가 처리하는 정보에 관한 요청은 ${mail}로 보내주세요. 요청이 본인에 관한 것인지 확인하는 데 필요한 최소한의 정보를 요청할 수 있습니다. 동의 철회 전에 적법하게 진행된 처리에는 소급하여 영향을 주지 않습니다.</p><p>관련 법에서 처리 근거를 요구하는 경우, 문의 대응은 이용자의 요청 처리와 고객지원을 제공할 정당한 이익 또는 법령상 의무 이행을 근거로 합니다. 동의가 필요한 선택적 처리는 해당 동의를 근거로 합니다. Google의 처리 근거는 Google 정책에서 설명합니다. 필요한 경우 거주 지역의 개인정보 감독기관에도 문의할 수 있습니다.</p>`],
          ['age', '아동과 청소년', '<p>Waddle Survival는 13세 이상을 대상으로 하며 13세 미만 아동을 대상으로 하지 않습니다. 이는 의도한 이용 연령으로, 실제 연령 확인 기능이나 스토어 콘텐츠 등급을 의미하지 않습니다. 지역 법률에 따라 청소년 이용자에게 부모 또는 법정대리인의 동의가 필요할 수 있습니다.</p><p>아동이 문의를 통해 개인정보를 보냈다고 생각되면 연락해 주세요. 확인 후 필요한 경우 삭제합니다. 지역별 개인정보 동의 연령과 미성년자 보호 요건은 별도로 적용됩니다.</p>'],
          ['security', '정보 보호', '<p>문의 처리에 필요한 사람만 지원 정보에 접근하도록 제한하고 적절한 계정 보호조치를 사용하고자 합니다. 다만 어떤 저장·전송 방식도 완전한 보안을 보장할 수는 없습니다. 기기 접근을 보호하고 불필요하게 민감한 정보를 보내지 않도록 주의해 주세요.</p>'],
          ['changes', '변경 및 연락처', `<p>정책이 변경되면 이 페이지의 수정일을 갱신합니다. 중요한 변경이 있을 때에는 법령이 요구하는 경우 적용 전에 이용 가능한 적절한 수단으로 알립니다.</p><p>개발 및 운영: ${operator}<br>개인정보 및 고객지원 문의: ${mail}</p>`]
        ]
      },
      terms: {
        title: '이용약관', eyebrow: '즐겁고 공정한 플레이',
        description: 'Waddle Survival의 이용, 로컬 기록과 외형 해금, 광고 및 고객지원에 관한 이용약관입니다.',
        intro: `이 약관은 ${operator}이 제공하는 Waddle Survival의 이용에 관해 설명합니다. 플레이 전에 읽어주시고 동의하지 않는 경우 이용하지 마세요. 문의는 ${mail}로 보내실 수 있습니다.`,
        sections: [
          ['eligibility', '이용 대상', '<p>게임은 13세 이상을 대상으로 합니다. 거주 국가에서 스스로 약관에 동의할 수 있는 나이 미만이라면 부모 또는 법정대리인과 함께 내용을 확인하고 동의를 받아주세요. 게임을 받은 스토어의 연령 등급과 요건도 따라야 합니다.</p>'],
          ['use', '게임 이용과 권리', '<p>이 약관과 해당 스토어의 규칙에 따라 정식으로 제공되는 게임을 내려받아 개인적·비상업적 목적으로 즐길 수 있습니다. 게임, 그림, 소리, 코드와 브랜드의 권리는 각 권리자에게 있으며, 플레이할 권한이 소유권의 이전을 뜻하지는 않습니다.</p><p>허가받지 않은 사본의 배포, 개발자 사칭, 타인에게 피해를 주는 이용이나 기술적 보호조치 우회를 하지 마세요. 다른 이용자를 속이기 위한 기록 조작도 금지됩니다. 관련 법이 명시적으로 허용하는 이용을 제한하지는 않습니다.</p>'],
          ['progress', '로컬 기록과 꾸미기 아이템', '<p>점수, 통계, 의상 해금은 기기에 저장됩니다. 게임 계정이나 운영자가 제공하는 기기 간 복원 서비스는 없습니다. 재설치, 데이터 삭제, 기기 분실 또는 일부 업데이트 과정에서 기록을 잃을 수 있습니다. 기기를 안전하게 관리하고 가능한 경우 OS 백업을 관리해 주세요. 기록 복구는 보장되지 않습니다.</p><p>의상은 외형만 바꿉니다. 해금과 점수는 게임 내 기능으로 현금 가치가 없으며 게임을 통해 현금으로 바꾸거나 거래할 수 없습니다. 현재 버전에는 인앱 구매와 구독이 없습니다.</p>'],
          ['ads', '광고와 외부 서비스', '<p>모바일 배포 버전에는 Google AdMob 광고가 포함됩니다. 한 판을 마친 후 다음 판을 시작하기 전에 전면 광고가 표시될 수 있습니다. 제공 여부와 형태는 광고 제공자, 네트워크와 개인정보 선택에 따라 달라지며 고정된 광고 재생 시간을 보장하지 않습니다.</p><p>광고 및 외부 웹사이트는 제3자가 운영합니다. 이용하거나 구매하기 전에 해당 서비스의 약관과 개인정보처리방침을 확인해 주세요. 통신 연결과 모바일 데이터 요금은 이용자가 관리합니다.</p>'],
          ['updates', '업데이트와 제공 범위', '<p>게임성, 밸런스, 외형, 호환성을 개선하거나 문제를 수정할 수 있습니다. 게임 규칙이 바뀌면 기록을 규칙별로 분리할 수 있습니다. 관련 법과 필요한 사전 고지에 따라 일부 기능이나 게임 제공을 종료할 수도 있습니다. 중단 없는 제공이나 모든 미래 기기·운영체제와의 호환성을 보장하지 않습니다.</p>'],
          ['fairness', '책임과 법정 권리', '<p>안전한 장소에서 플레이하고 적절히 쉬어주세요. 이용자는 기기와 이용 방식을 관리하며, 운영자는 관련 법이 정한 범위에서 게임에 대한 책임을 집니다. 이 약관은 강행규정에 따른 소비자 권리를 제한하거나 고의 등 법적으로 배제할 수 없는 책임을 제외하지 않습니다.</p>'],
          ['privacy', '개인정보', '<p>개인정보처리방침에서 기기 내 저장, 광고, 고객지원 이메일과 웹 호스팅에 관한 내용을 확인할 수 있습니다. 개인정보 선택과 법적으로 필요한 동의는 이 약관과 별도로 다루며, 약관 동의가 모든 개인정보 처리에 대한 포괄적인 동의를 뜻하지는 않습니다.</p>'],
          ['changes', '약관 변경, 이용 중단 및 문의', `<p>언제든 게임 이용을 중단하고 앱을 제거할 수 있습니다. 약관이 바뀌면 이 페이지의 수정일을 갱신하고 법에서 요구하는 고지 또는 동의 절차를 제공합니다. 변경으로 관련 법에 따라 이미 보장된 권리가 사라지지는 않습니다.</p><p>고객지원이나 약관에 관한 문의는 ${operator}의 ${mail}로 보내주세요. 이용자에게 적용되는 강행적인 현지 법적 보호는 계속 적용됩니다.</p>`]
        ]
      },
      notFound: { title: '빙판을 조금 벗어났네요.', description: '페이지를 찾을 수 없습니다.', body: '페이지가 옮겨졌을 수 있어요. Waddle Survival 홈에서 다시 시작해요.', link: '게임 홈페이지로 돌아가기' }
    }
  };
}
