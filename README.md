# ProjectUnknown — game website

Push Burst와 Waddle Rush의 게임 소개·고객지원·게임별 개인정보처리방침, 공통 이용약관입니다. 한국어/English 정적 HTML이며 앱·Unity·JavaScript 없이 동작합니다.

## 스토어에 사용할 URL

| 용도 | Push Burst | Waddle Rush |
|---|---|---|
| 소개/개발자 웹사이트 | https://projectunknownteam.github.io/push-burst/ | https://projectunknownteam.github.io/waddle-rush/ |
| 지원 | https://projectunknownteam.github.io/push-burst/support/ | https://projectunknownteam.github.io/waddle-rush/support/ |
| 개인정보 | https://projectunknownteam.github.io/push-burst/privacy/ | https://projectunknownteam.github.io/waddle-rush/privacy/ |

공통 약관: https://projectunknownteam.github.io/terms/ . 한국어는 도메인 다음에 `/ko/`를 붙입니다. `app-ads.txt`는 도메인 루트에 유지합니다.

기존 `/privacy.html`은 Push Burst 방침 전문을 계속 제공합니다. 자동 이동·JavaScript에 의존하지 않습니다. 이전 앱의 링크는 깨지지 않으며 다음 Push Burst 업데이트 때 새 URL을 사용할 수 있습니다. 루트 `/`는 두 게임의 허브입니다. 앱 식별자·연락처·데이터 처리 대상이 명확하도록 개인정보 페이지는 게임별로 구분하고 공통 처리 조항은 소스로 공유합니다.

## 수정과 검증

- 설정: `site/config.json` (다운로드 URL은 스토어 공개 후 입력, 현재 null).
- 콘텐츠: `site/content.mjs`, `site/waddle-content.mjs`, `site/platform-disclosures.mjs`.
- 스타일: `site/site.css`. 그림은 두 게임 저장소의 기존 정식 소개 이미지·아이콘입니다. 새 유료 자산이나 외부 폰트·스크립트는 사용하지 않습니다.
- `node scripts/build-site.mjs`
- `python3 scripts/validate-site.py`
- 선택적 headless 브라우저 검토: `PLAYWRIGHT_MODULE=/absolute/path/to/playwright-core/index.mjs node scripts/review-site.mjs` (로컬 Chrome 필요).
- 정적 결과는 각 경로의 `index.html`입니다. 이 파일만 열어도 주요 내용과 내부 이동이 동작합니다.

## GitHub Pages

기존 `main` 루트 Pages 설정을 그대로 사용하면 커밋을 원격에 푸시할 때 사이트도 갱신될 수 있습니다. 확인 전 무심코 푸시하지 마세요.

추가한 **Deploy reviewed Pages** Actions 워크플로는 수동 실행만 가능합니다. Settings → Pages → Source를 GitHub Actions로 지정한 뒤 실행하세요. `_site`에 공개 파일만 모아 배포하며 소스·검증 캡처·문서는 업로드하지 않습니다. 공개 후 위 URL, 이전 개인정보 URL, 루트 app-ads.txt를 직접 확인하고 두 스토어의 웹사이트/지원/개인정보 URL을 갱신합니다.

## 출시 전 확정 사항

현재 법률 페이지는 **게시 전 검토 초안**이며 noindex입니다. 기능 사실은 로컬 코드와 제공자 공식 문서를 기준으로 작성했습니다. `legalReviewComplete` 또는 `supportRetentionConfirmed`를 검사를 통과시키기 위해 임의로 켜지 마세요.

운영자는 실제 지원 이메일 삭제 절차(현재 제안: 문의·후속 대응에 필요한 기간만 보관), 배포 국가별 개인정보·미성년자·국외 이전 고지와 실제 스토어 신고를 확인해야 합니다. 두 게임의 Unity IAP 5.4, AdMob/UMP, Game Center/Play Games를 포함했습니다. Waddle Rush 상품/게임 서비스는 아직 콘솔 미등록이며 소개·정책은 해당 출시 후보 기능을 설명합니다. 실제 구매·복원·계정·SDK 네트워크 처리 검증은 등록 후 별도입니다. 13+는 목표 이용 연령이며 자동 나이 검증이나 스토어 등급이 아닙니다.

공식 근거:
- [Google Play User Data](https://support.google.com/googleplay/android-developer/answer/10144311?hl=en)
- [Apple App Review Guidelines §5.1.1](https://developer.apple.com/app-store/review/guidelines/)
- [Unity IAP 5.4 privacy](https://docs.unity.com/en-us/iap/privacy-and-consent/overview)
- [AdMob data disclosure](https://developers.google.com/admob/android/privacy/play-data-disclosure)
- [GitHub Pages deployment](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)

검증 결과: `verification/RESULTS.md`. 생성·테스트만으로 공개 배포가 완료됐다고 간주하지 않습니다.
