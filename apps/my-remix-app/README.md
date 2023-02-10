1. apps에 npx create-remix@latest
2. package.json에 name설정
3. pnpm --filter=name install, pnpm --filter=name dev, pnpm --filter=name add package
4. 공용으로 사용할 package를 packages에 폴더로 생성. 이후 pnpm init.
5. package의 package.json을 private로 설정한다.
6. 필요한 컴포넌트를 생성하며 index.tsx내 export 설정을 한다.
  - typescript 프로젝트 일 때 typescript 개별 설치 및 tsconfig 설정을 한다.
  - framework또한 따로 관리해야한다
  - package.json main을 dist/index.js로 변경한다
7. shared ui build하면 dist에 생성된다.
8. pnpm add shared-ui --filter my-remix-app --workspace 하면 app에 shared ui dependency가 생긴다
9. pnpm run (--parallel) -r build 하면 dependency기반으로 모든 project가 build된다.

